import { Model } from 'sequelize-typescript';
import { Session } from "../sessions/sessions.entity";
interface FilmCreationAttrs {
    title: string;
    description: string;
    url: string;
}
export declare class Film extends Model<Film, FilmCreationAttrs> {
    id: number;
    title: string;
    description: string;
    url: string;
    rating: number;
    reviews: string;
    session: Session[];
}
export {};
