import { JwtAuthGuard } from './../../@core/guards/jwt-auth.guard';
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { CoreModule } from "src/@core/core.module";
import { RolesGuard } from 'src/@core/guards/roles.guard';
import { AuthController } from './auth.controller';
import { CategoryController } from './category.controller';
import { CartController } from './cart.controller';
import { UploadFileController } from './upload-file.controller';

@Module({
    imports: [CoreModule],
    controllers: [
        AuthController,
        CategoryController,
        CartController,
        UploadFileController
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