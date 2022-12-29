import { User } from "./users.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersService {
    private userRepository;
    constructor(userRepository: typeof User);
    create(userDto: CreateUserDto): Promise<User>;
    findOne(email: string): Promise<User>;
    getAllUsers(): Promise<any[]>;
    getUser(email: string): Promise<false | User>;
    getUserById(id: number): Promise<User>;
    blockUser(id: number): Promise<boolean>;
    updatePassword(email: string, password: string): Promise<[affectedCount: number]>;
    changeRole(id: number): Promise<void>;
    updateUserInfo(userDto: UpdateUserDto): Promise<void>;
    checkUserInSystem(firstName: string, lastName: string, email: string): Promise<User>;
}
