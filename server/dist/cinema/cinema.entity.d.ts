import { Model } from 'sequelize-typescript';
interface CinemaCreationAttrs {
    email: string;
    password: string;
    name: string;
    surname: string;
}
export declare class Cinema extends Model<Cinema, CinemaCreationAttrs> {
    id: number;
    name: string;
    hallsNumber: number;
    hallsType: string;
}
export {};
