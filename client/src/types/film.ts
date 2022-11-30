import {ICinema} from "./cinema";

export interface IFilm {
    id: number;
    title: string;
    description: string;
    url: string;
    number?: number;
}

export interface INewFilm extends ICinema{
    isNew?: string;
}

export interface IUpdateFilmInfo {
    title: string;
    description: string;
    url: string;
}