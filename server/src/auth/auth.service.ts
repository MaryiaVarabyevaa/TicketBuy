import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (!user.dataValues) {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'User with this email does not exist',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
        let comparedPassword = bcrypt.compareSync(pass, user.dataValues.password);
        if (!comparedPassword) {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'Invalid email or password',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
        if (user && comparedPassword) {
            const { password, ...result } = user.dataValues;
            return result;
        }
        return null;
    }

    async updatePassword(email: string, password: string): Promise<any> {
        const hashPassword = await bcrypt.hash(password, 5);
        return await this.usersService.updatePassword(email, hashPassword);

    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    async registration(newUser: CreateUserDto) {
        const {firstName, lastName ,email, password } = newUser;
        const user = await this.usersService.findOne(email);
        if (user) {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'User with such email already exists',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const savedUser = await this.usersService.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        });

        const token = await this.login(savedUser.dataValues);
        return token;
    }
}
