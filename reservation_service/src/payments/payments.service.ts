import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async processPayment(
    reservationId: number,
  ) {

    const reservation =
      await this.prisma.reservation.findUnique({
        where: {
          id: reservationId,
        },
      });

    if (!reservation) {
      throw new NotFoundException(
        'Reservation not found',
      );
    }

    if (reservation.status !== 'PENDING') {
      throw new BadRequestException(
        'Reservation is not pending',
      );
    }

    if (
      reservation.expiresAt &&
      reservation.expiresAt < new Date()
    ) {
      throw new BadRequestException(
        'Reservation expired'
      );
    }

    const payment =
      await this.prisma.payment.create({
        data: {
          reservationId,
          transactionId: randomUUID(),
          status: 'SUCCESS',
        },
      });

    await this.prisma.reservation.update({
      where: { id: reservationId },
      data: {
        status: 'COMPLETED',
      },
    });

    await this.prisma.seat.update({
      where: {
        id: reservation.seatId,
      },
      data: {
        status: 'RESERVED',
      },
    });

    return payment;
  }
}
