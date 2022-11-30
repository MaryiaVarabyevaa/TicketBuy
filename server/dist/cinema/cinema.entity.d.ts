import { Model } from 'sequelize-typescript';
interface CinemaCreationAttrs {
    name: string;
    hallsNumber: number;
    hallsType: string;
}
export declare class Cinema extends Model<Cinema, CinemaCreationAttrs> {
    id: number;
    name: string;
    hallsNumber: number;
    hallsType: string;
}
export {};
