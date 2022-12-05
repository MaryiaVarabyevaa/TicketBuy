import { Model } from 'sequelize-typescript';
import { CreateSessionDto } from "./dto/create-session.dto";
import { Cinema } from "../cinema/cinema.entity";
import { Film } from "../films/films.entity";
export declare class Session extends Model<Session, CreateSessionDto> {
    id: number;
    date: string;
    time: string;
    price: string;
    filmId: number;
    filmTitle: Film;
    cinemaId: number;
    cinemaName: Cinema;
}
