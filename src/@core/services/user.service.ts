import { Scrypt } from './../ultils/scrypt.ultil';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()

export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        }

        return user;
    }

    async findOneUserByUsername(username: string) {
        const user = await this.userRepository.findOne({
            where: { username: username}
        });

        if (user) {
            throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
        }

        return user;
    }

    async changePassword(id: string, oldPassword: string, newPassword: string) {
        const user = await this.findById(id);

        if (!Scrypt.isMatchPassword(user.password, oldPassword)) {
            throw new HttpException('Old password is correct', HttpStatus.BAD_REQUEST);
        }

        const generatePasswordEncode = await Scrypt.generateEncodePassword(newPassword);

        return this.userRepository.createQueryBuilder().update(User).set({ password: generatePasswordEncode }).where("id = :id", { id: id }).execute();
    }

    async remove(id: string) {
        await this.userRepository.delete(id);
    }

}