import { JwtAuthGuard } from './../../@core/guards/jwt-auth.guard';
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { CoreModule } from "src/@core/core.module";
import { RolesGuard } from 'src/@core/guards/roles.guard';
import { AuthController } from './auth.controller';
import { BrandController } from './brand.controller';
import { CartController } from './cart.controller';
import { UploadFileController } from './upload-file.controller';
import { CategoryController } from './category.controller';

@Module({
    imports: [CoreModule],
    controllers: [
        AuthController,
        CategoryController,
        CartController,
        UploadFileController,
        BrandController
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