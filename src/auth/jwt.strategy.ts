import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import 'dotenv/config';
import { UserEntity } from '../user/entities/user.entity';

export interface JwtPayload {
  id: string;
}

function cookieExtractor(req: Request): null | string {
  return req && req.cookies ? req.cookies?.jwt ?? null : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(
    payload: JwtPayload,
    done: (error, user) => void,
  ): Promise<void> {
    if (!payload || !payload.id) {
      return done(new UnauthorizedException(), false);
    }

    const user = await UserEntity.findOne({
      where: {
        currentTokenId: payload.id,
      },
    });

    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    done(null, user);
  }
}
