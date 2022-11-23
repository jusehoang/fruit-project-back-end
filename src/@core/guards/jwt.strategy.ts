import { Constant } from './../constants/constant';
import { AuthService } from './../services/auth.service';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Constant.jwtSecrectKey
        })
    }

    async validate(payload: User) {
        return await this.authService.validateJwtPayload(payload);
    }
}