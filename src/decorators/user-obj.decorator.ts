import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserObj = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  },
);
