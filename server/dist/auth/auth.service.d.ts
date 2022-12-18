import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "../users/dto/create-user.dto";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    updatePassword(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        token: string;
    }>;
    registration(newUser: CreateUserDto): Promise<{
        token: string;
    }>;
}
