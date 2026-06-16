import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {

    const hash = await bcrypt.hash(
      dto.password,
      10,
    );

    return this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash: hash,
      },
    });
  }

  private async generateTokens(
    userId: number,
    email: string,
  ) {

    const accessToken =
      await this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: '15m',
        },
      );

    const refreshToken =
      await this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: '90d',
        },
      );

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(dto: LoginDto) {

    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const valid = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!valid) {
      throw new UnauthorizedException();
    }

    const tokens = await this.generateTokens(
      user.id,
      user.email,
    );

    const refreshTokenHash =
      await bcrypt.hash(
        tokens.refreshToken,
        10,
      );

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          refreshTokenHash,
        },
      });

    return tokens;
  }
}
