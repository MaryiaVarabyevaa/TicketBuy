import { Model } from 'sequelize-typescript';
import { Cinema } from "../cinema/cinema.entity";
import { Film } from "../films/films.entity";
import { Order } from "../orders/orders.entity";
interface sessionCreationAttrs {
    date: string;
    time: string;
    price: string;
    currency: string;
    filmId: number;
    hallId: number;
    cinemaId: number;
}
export declare class Session extends Model<Session, sessionCreationAttrs> {
    id: number;
    date: string;
    time: string;
    price: string;
    currency: string;
    seats: string;
    filmId: number;
    filmTitle: Film;
    cinemaId: number;
    cinemaName: Cinema;
    hallId: number;
    hallNumber: Cinema;
    orders: Order[];
}
export {};
