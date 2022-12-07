import { Model } from 'sequelize-typescript';
import { Session } from "../sessions/sessions.entity";
import { Comment } from "../comments/comments.entity";
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
    genre: string;
    runtime: string;
    country: string;
    imdbRating: string;
    rating: number;
    session: Session[];
    comments: Comment[];
}
export {};
