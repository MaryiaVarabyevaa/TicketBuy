import * as bcrypt from 'bcrypt';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.entity";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {AuthService} from "../auth/auth.service";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async create(userDto: CreateUserDto) {
        const user = await this.userRepository.create(userDto);
        return user;
    }

    async findOne(email: string)  {
        const user = await this.userRepository.findOne({where: {email}});
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({
            attributes: ['email', 'id', "firstName", "lastName", "role", "isBlocked"]
        });
        const arrOfUsers = [];

        users.map(user => {
            const {dataValues} = user;
            arrOfUsers.push(dataValues);
        })

        return arrOfUsers;
    }

    async getUser(email: string) {
        const user = await this.userRepository.findOne({
            attributes: ['email', "firstName", "lastName", "role", "id"],
            where: {
                email
            }
        })
        if (!user) {
            return false;
        }
        return user;
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({
            attributes: ["firstName", "lastName", "email"],
            where: {
                id
            }
        })
        return user;
    }

    async blockUser(id: number) {
        const { isBlocked } =  await this.userRepository.findOne({
            where: {id},
            attributes: ['isBlocked']
        });
        const blockedUser = await this.userRepository.update({isBlocked: isBlocked ? false : true}, {
            where: {
                id
            }
        });
        return isBlocked;
    }

    async updatePassword(email: string, password: string) {
        const changedPassword = await this.userRepository.update({password}, {
            where: {
                email
            }
        });
        return changedPassword;
    }

    async changeRole(id: number) {
        const { role } =  await this.userRepository.findOne({
            where: {id},
            attributes: ['role']
        });

        const blockedUser = await this.userRepository.update({role: role === 'user' ? 'moderator': 'user'}, {
            where: {
                id
            }
        });
    }

    async updateUserInfo(userDto: UpdateUserDto) {
        const { id, firstName, lastName, email} = userDto;
        const updateUserInfo = await this.userRepository.update({firstName, lastName, email}, {
            where: {
               id
            }
        });
    }

    // async checkUserEmail (email: string) {
    //     const user = await this.userRepository.findOne({
    //         attributes: ['email', "firstName", "lastName", "role", "id"],
    //         where: {
    //             email
    //         }
    //     })
    // }
}
