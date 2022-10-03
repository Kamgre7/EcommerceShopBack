import { UserRole } from '../user';
import { IsString, Length } from 'class-validator';

export interface LoginFailedResponse {
  isSuccess: false;
  message: string;
}

export interface LoginSuccessfulResponse {
  isSuccess: true;
  userId: string;
  userFirstName: string;
  userLastName: string;
  userRole: UserRole;
}

export type LoginResponse = LoginFailedResponse | LoginSuccessfulResponse;

export interface CreateTokenResponse {
  accessToken: string;
  expiresIn: number;
}

export type LogoutFailedResponse = LoginFailedResponse;
export interface LogoutSuccessfulResponse {
  isSuccess: true;
}

export type LogoutResponse = LogoutFailedResponse | LogoutSuccessfulResponse;
