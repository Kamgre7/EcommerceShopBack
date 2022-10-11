import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import { AuthLoginDto } from './dto/auth-login.dto';
import { hashPassword } from '../utils/hash-password';
import { UserEntity } from '../user/entities/user.entity';
import { JwtPayload } from './jwt.strategy';
import { CreateTokenResponse, LoginResponse, LogoutResponse } from '../types';

@Injectable()
export class AuthService {
  private createToken(currentTokenId: string): CreateTokenResponse {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, process.env.JWT_KEY, { expiresIn });
    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: UserEntity): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await UserEntity.findOne({
        where: {
          currentTokenId: token,
        },
      });
    } while (!!userWithThisToken);

    user.currentTokenId = token;
    await user.save();

    return token;
  }

  async login(
    authLoginDto: AuthLoginDto,
    res: Response,
  ): Promise<Response<LoginResponse>> {
    try {
      const user = await UserEntity.findOne({
        where: {
          email: authLoginDto.email,
        },
      });

      if (!user) {
        return res.json({
          isSuccess: false,
          message: 'Invalid email address!',
        });
      }

      const password = hashPassword(authLoginDto.password, user.pwdSalt);

      if (user.pwdHash !== password) {
        return res.json({
          isSuccess: false,
          message: 'Invalid password!',
        });
      }

      const token = this.createToken(await this.generateToken(user));

      res
        .cookie('jwt', token.accessToken, {
          secure: false, //if https - true, local - false
          domain: 'localhost',
          httpOnly: true,
        })
        .json({
          isSuccess: true,
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id,
          role: user.role,
        });
    } catch (e) {
      return res.json({
        isSuccess: false,
        message: e.message,
      });
    }
  }

  async logout(
    user: UserEntity,
    res: Response,
  ): Promise<Response<LogoutResponse>> {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('jwt', {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      });

      return res.json({
        isSuccess: true,
      });
    } catch (e) {
      return res.json({
        isSuccess: false,
        message: e.message,
      });
    }
  }
}
