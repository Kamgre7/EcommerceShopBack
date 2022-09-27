import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../types';

export const Roles = (roles: UserRole[]) =>
  SetMetadata(process.env.ROLES_KEY, roles);
