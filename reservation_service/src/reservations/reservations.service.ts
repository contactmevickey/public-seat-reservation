import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createReservation(
    userId: number,
    seatId: number,
  ) {

    const seat = await this.prisma.seat.findUnique({
      where: { id: seatId },
    });

    if (!seat) {
      throw new BadRequestException('Seat not found');
    }

    // Release expired reservations before checking seat availability
    // We can also make this as cron job to run every 3 minutes to cleanup before user tries to reserve a seat.
    await this.releaseExpiredReservations();

    if (seat.status !== 'AVAILABLE') {
      throw new BadRequestException(
      'Seat not available',
      );
    }

    const expiresAt = new Date(
      Date.now() + 5 * 60 * 1000,
    );

    return this.prisma.$transaction(async (tx) => {
      const updatedSeat =
        await tx.seat.updateMany({
          where: {
            id: seatId,
            status: 'AVAILABLE',
          },
          data: {
            status: 'HELD',
          },
        });

      if (updatedSeat.count === 0) {
        throw new BadRequestException(
          'Seat not available'
        );
      }

      return tx.reservation.create({
        data: {
          userId,
          seatId,
          status: 'PENDING',
          expiresAt,
        },
      });
    });
  }

  // Cleanup function to release expired reservations and make seats available again
  private async releaseExpiredReservations() {
    const expiredReservations =
      await this.prisma.reservation.findMany({
        where: {
          status: 'PENDING',
          expiresAt: {
            lt: new Date(),
          },
        },
      });

    for (const reservation of expiredReservations) {
      await this.prisma.$transaction([
        this.prisma.reservation.update({
          where: {
            id: reservation.id,
          },
          data: {
            status: 'CANCELLED',
          },
        }),

        this.prisma.seat.update({
          where: {
            id: reservation.seatId,
          },
          data: {
            status: 'AVAILABLE',
          },
        }),
      ]);
    }
  }
}
