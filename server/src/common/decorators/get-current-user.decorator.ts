import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    // TODO: null로 할 지 error로 할 지 고민
    const req: Request = context.switchToHttp().getRequest();
    if (data) return req.user?.[data];
    return req?.user;
  },
);

declare module 'Express' {
  interface Request {
    user: {
      id: string;
      email: string;
    } | null;
  }
}
