import { Reflector } from '@nestjs/core';
import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { PUBLIC_API } from '../decorators/public-api.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublicApi = this.reflector.getAllAndOverride<boolean>(PUBLIC_API, [context.getHandler(), context.getClass()]);
        if (isPublicApi) {
            return true;
        }

        return super.canActivate(context);
    }
}