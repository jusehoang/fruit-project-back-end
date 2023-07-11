import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Constant } from './constants/constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { ENTITY_MODEL } from './providers/database.provider';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { BrandService } from './services/brand.service';
import { CartService } from './services/cart.service';
import { CategoryService } from './services/category.service';

const INJECTABLES = [
    // Service
    UserService,
    AuthService,
    CategoryService,
    CartService,
    BrandService
]

const CORE_MODULES = [
    JwtModule.register({
        secret: Constant.jwtSecrectKey,
        signOptions: { expiresIn: '10h' }
    }),
    ConfigModule
];
const PROVIDERS = [JwtStrategy, JwtAuthGuard];

@Module({
    imports: [TypeOrmModule.forFeature(ENTITY_MODEL), ...CORE_MODULES],
    exports: [...CORE_MODULES, ...INJECTABLES, ...PROVIDERS],
    providers: [...INJECTABLES, ...PROVIDERS]
})
export class CoreModule {}