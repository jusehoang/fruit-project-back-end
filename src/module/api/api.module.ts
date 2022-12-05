import { JwtAuthGuard } from './../../@core/guards/jwt-auth.guard';
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { CoreModule } from "src/@core/core.module";
import { RolesGuard } from 'src/@core/guards/roles.guard';
import { AuthController } from './auth.controller';
import { CategoryController } from './category.controller';
import { CartController } from './cart.controller';

@Module({
    imports: [CoreModule],
    controllers: [
        AuthController,
        CategoryController,
        CartController
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        }
    ]
})
export class ApiModule {}