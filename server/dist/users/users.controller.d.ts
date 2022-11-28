import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { AuthService } from "../auth/auth.service";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    create(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    login(req: any): Promise<{
        token: string;
    }>;
    block(req: any): Promise<boolean>;
    changeRole(req: any): Promise<void>;
    updateUserInfo(userDto: UpdateUserDto): Promise<void>;
    getProfile(req: any): any;
    getAll(): Promise<any[]>;
}
