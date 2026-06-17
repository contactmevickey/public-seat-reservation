import { Module } from '@nestjs/common';
import { SeatsController } from './seats.controller';
import { SeatsService } from './seats.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ReservationsModule } from '../reservations/reservations.module';

@Module({
  imports: [PrismaModule, ReservationsModule],
  controllers: [SeatsController],
  providers: [SeatsService],
})
export class SeatsModule {}
