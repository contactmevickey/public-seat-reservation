import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReservationsService } from '../reservations/reservations.service';

@Injectable()
export class SeatsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reservationsService: ReservationsService,
  ) {}

  async getSeats() {
    await this.reservationsService.releaseExpiredReservations();

    const seats = await this.prisma.seat.findMany({
      take: 3,
      where: {
        status: {
          in: ['AVAILABLE', 'HELD'],
        },
      },
      include: {
        reservations: {
          where: {
            status: 'PENDING',
          },
          orderBy: {
            id: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        seatNumber: 'asc',
      },
    });

    return seats.map((seat) => ({
      id: seat.id,
      seatNumber: seat.seatNumber,
      status: seat.status,
      heldBy: seat.reservations[0]?.userId ?? null,
      reservationId: seat.reservations[0]?.id ?? null,
      holdExpiresAt: seat.reservations[0]?.expiresAt ?? null,
    }));
  }
}
