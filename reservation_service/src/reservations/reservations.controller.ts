import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
  ) {}
  
  @UseGuards(JwtGuard)
  @Post()
  createReservation(
    @Req() req,
    @Body() body: CreateReservationDto,
  ) {
    return this.reservationsService.createReservation(
      req.user.userId,
      body.seatId,
    );
  }
}
