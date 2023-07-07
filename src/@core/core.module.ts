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
import { CategoryService } from './services/brand.service';
import { CartService } from './services/cart.service';

const INJECTABLES = [
    // Service
    UserService,
    AuthService,
    CategoryService,
    CartService
]

const firebaseConfig = {
    apiKey: "AIzaSyA9oLNnToKdqCZ9k--Y2gt1kEe3GLWUw3E",
    authDomain: "sale-watch-nestjs.firebaseapp.com",
    projectId: "sale-watch-nestjs",
    storageBucket: "sale-watch-nestjs.appspot.com",
    messagingSenderId: "684492362003",
    appId: "1:684492362003:web:9cfe463f315969f48e0ae6",
    measurementId: "G-EPN8WYWWP6"
};

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