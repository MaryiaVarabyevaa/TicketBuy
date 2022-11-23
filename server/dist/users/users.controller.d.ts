import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { AuthService } from "../auth/auth.service";
export declare class UsersController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    create(userDto: CreateUserDto): Promise<import("./users.entity").User>;
    login(req: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
