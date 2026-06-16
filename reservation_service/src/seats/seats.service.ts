import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeatsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getSeats() {
    const seats = await this.prisma.seat.findMany({
      take: 3,
      where: {
        status: {
          in: ['AVAILABLE', 'HELD'],
        },
      },
      include: {
        reservations: true,
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
