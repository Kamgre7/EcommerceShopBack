import { UserRole } from '../user';

export interface LoginFailedResponse {
  isSuccess: false;
  message: string;
}

export interface LoginSuccessfulResponse {
  isSuccess: true;
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
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
