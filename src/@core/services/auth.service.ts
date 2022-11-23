import { LoginRequest, LoginResponse, Payload } from './../models/user';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../decorators/roles.decorator';

@Injectable()

export class AuthService {
    constructor(
        private readonly userService: UserService,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async login(loginRequest: LoginRequest) {
        const user: User = await this.userRepository.findOne({
            select: ['id', 'username', 'createdDate', 'updatedDate', 'role'],
            where: {username: loginRequest.username}
        });

        if (!user) {
            throw new HttpException('Invalid username/password', HttpStatus.NOT_FOUND);
        }
        const payload: Payload = {
            id: user.id,
            username: user.username,
            createdDate: user.createdDate,
            updatedDate: user.updatedDate,
            role: user.role,
        }

        const loginResponse: LoginResponse = {
            id: user.id,
            username: user.username,
            createdDate: user.createdDate,
            updatedDate: user.updatedDate,
            role: user.role,
            accessToken: this.jwtService.sign(payload)
        }

        return loginResponse;
    }

    async register(userRequest: User) {
        const user = await this.userRepository.findOne({
            where: { username: userRequest.username }
        });
        console.log(user);
        if (user) {
            throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
        }

        const createUser = this.userRepository.create(userRequest);

        return await this.userRepository.save(createUser);
    }

    async validateJwtPayload(payload: User) {
        const user = await this.userRepository.findOne(payload.id);
        return user;
    }
}