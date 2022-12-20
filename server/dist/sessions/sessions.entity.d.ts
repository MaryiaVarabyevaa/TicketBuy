import { Model } from 'sequelize-typescript';
import { CreateSessionDto } from "./dto/create-session.dto";
import { Cinema } from "../cinema/cinema.entity";
import { Film } from "../films/films.entity";
import { Order } from "../orders/orders.entity";
export declare class Session extends Model<Session, CreateSessionDto> {
    id: number;
    date: string;
    time: string;
    price: string;
    seats: string;
    filmId: number;
    filmTitle: Film;
    cinemaId: number;
    cinemaName: Cinema;
    hallId: number;
    hallNumber: Cinema;
    orders: Order[];
}
