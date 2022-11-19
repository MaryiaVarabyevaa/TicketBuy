import { User } from "./users.entity";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersService {
    private userRepository;
    constructor(userRepository: typeof User);
    createUser(dto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
}
