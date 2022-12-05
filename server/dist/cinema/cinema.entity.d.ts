import { Model } from 'sequelize-typescript';
import { Session } from "../sessions/sessions.entity";
import { Halls } from "../halls/halls.entity";
interface CinemaCreationAttrs {
    name: string;
    hallsNumber: number;
    hallsType: string;
    city: string;
    street: string;
    buildingNumber: number;
}
export declare class Cinema extends Model<Cinema, CinemaCreationAttrs> {
    id: number;
    name: string;
    city: string;
    street: string;
    buildingNumber: number;
    hallsNumber: number;
    hallsType: string;
    session: Session[];
    halls: Halls[];
}
export {};
