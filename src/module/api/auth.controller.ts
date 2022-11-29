import { LoginRequest } from './../../@core/models/user';
import { AuthService } from './../../@core/services/auth.service';
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { PublicApi } from "src/@core/decorators/public-api.decorator";
import { User } from "src/@core/entities/user.entity";

@Controller()
@PublicApi()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @HttpCode(200)
    register(@Body() user: User) {
        return this.authService.register(user);
    }

    @Post('login')
    @HttpCode(200)
    login(@Body() loginRequest: LoginRequest) {
        return this.authService.login(loginRequest);
    }
}