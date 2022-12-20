import { Model } from 'sequelize-typescript';
import { Comment } from "../comments/comments.entity";
import { Order } from "../orders/orders.entity";
interface UserCreationAttrs {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    isBlocked: boolean;
    comments: Comment[];
    orders: Order[];
}
export {};
