import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import {User} from "./users.entity";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser({firstName, lastName, email, password}: CreateUserDto) {
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await this.userRepository.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        });
        return user;
    }
    async findOne(email: string): Promise<User | undefined>  {
        const users = await this.userRepository.findAll();
        const user = users.find(user => user.email === email);
        return user;
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }
}
