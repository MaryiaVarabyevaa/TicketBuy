import * as bcrypt from 'bcrypt';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.entity";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async create(userDto: CreateUserDto) {
        const user = await this.userRepository.create(userDto);
        return user;
    }

    async findOne(email: string, password: string)  {
        const user = await this.userRepository.findOne({where: {email}});
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }
}
