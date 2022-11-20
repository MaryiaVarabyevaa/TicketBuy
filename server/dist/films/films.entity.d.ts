import { Model } from 'sequelize-typescript';
interface FilmCreationAttrs {
    email: string;
    password: string;
    name: string;
    surname: string;
}
export declare class Film extends Model<Film, FilmCreationAttrs> {
    id: number;
    title: string;
    description: string;
    url: string;
    rating: number;
    reviews: string;
}
export {};
