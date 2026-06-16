import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { SeatsModule } from './seats/seats.module';
import { ReservationsModule } from './reservations/reservations.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, SeatsModule, ReservationsModule, PaymentsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
