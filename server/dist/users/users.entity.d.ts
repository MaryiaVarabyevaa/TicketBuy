import { Model } from 'sequelize-typescript';
interface UserCreationAttrs {
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
}
export {};
