import { LoginRequest, LoginResponse, Payload } from './../models/user';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Scrypt } from '../ultils/scrypt.ultil';
import { CartService } from './cart.service';

@Injectable()

export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly cartService: CartService
  ) { }

  async login(loginRequest: LoginRequest) {
    const [user] = await this.userRepository.find({
      where: { username: loginRequest.username }
    });

    if (!user) {
      throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
    }
    const isMatchPassword = await Scrypt.isMatchPassword(user.password, loginRequest.password);

    if (!isMatchPassword) {
      throw new HttpException('Invalid username/password!', HttpStatus.BAD_REQUEST);
    }
    const payload: Payload = {
      id: user.id,
      username: user.username,
      createdDate: user.createdDate,
      updatedDate: user.updatedDate,
      role: user.role,
      idCart: user.cart?.id
    }

    const loginResponse: LoginResponse = {
      id: user.id,
      username: user.username,
      createdDate: user.createdDate,
      updatedDate: user.updatedDate,
      role: user.role,
      accessToken: this.jwtService.sign(payload),
    }

    return loginResponse;
  }

  async register(userRequest: User) {
    const user = await this.userRepository.findOne({
      where: { username: userRequest.username }
    });
    if (user) {
      throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
    }

    userRequest.password = await Scrypt.generateEncodePassword(userRequest.password);

    const cart = await this.cartService.create();

    const createUser = this.userRepository.create(userRequest);
    // createUser.cart = cart;

    return await this.userRepository.save(createUser);
  }

  async validateJwtPayload(payload: User) {
    const user = await this.userRepository.findOne(payload.id);
    return user;
  }
}