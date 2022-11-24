import { User } from "./users.entity";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersService {
    private userRepository;
    constructor(userRepository: typeof User);
    create(userDto: CreateUserDto): Promise<User>;
    findOne(email: string, password: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
}
