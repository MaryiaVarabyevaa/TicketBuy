import {ICinema} from "./cinema";

export interface IFilm {
    id?: number;
    title: string;
    description: string;
    url: string;
}

// export interface IUpdateFilmInfo {
//     id: number;
//     title: string;
//     description: string;
//     url: string;
// }

export interface INewFilm extends ICinema{
    isNew?: string;
}