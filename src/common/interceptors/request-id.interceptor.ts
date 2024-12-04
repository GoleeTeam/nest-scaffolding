import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const response: Response = context.switchToHttp().getResponse();
        const request: Request = context.switchToHttp().getRequest();

        response.setHeader('x-request-id', request.id.toString());
        return next.handle();
    }
}
