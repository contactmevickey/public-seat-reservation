import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';

import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('payments')
export class PaymentsController {

  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}
  
  @UseGuards(JwtGuard)
  @Post()
  processPayment(
    @Body() body: CreatePaymentDto,
  ) {
    return this.paymentsService.processPayment(
      body.reservationId,
    );
  }
}
