import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    create(userDto: CreateUserDto): Promise<import("./users.entity").User>;
    getAll(): Promise<import("./users.entity").User[]>;
}
