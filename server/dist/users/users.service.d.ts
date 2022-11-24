import { User } from "./users.entity";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersService {
    private userRepository;
    constructor(userRepository: typeof User);
    createUser({ firstName, lastName, email, password }: CreateUserDto): Promise<User>;
    findOne(email: string): Promise<User | undefined>;
    getAllUsers(): Promise<User[]>;
}
