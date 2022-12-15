import { Film } from "./films.entity";
import { CreateFilmsDto } from "./dto/create-films.dto";
import { UpdateFilmDto } from "./dto/update-films.dto";
export declare class FilmsService {
    private filmRepository;
    constructor(filmRepository: typeof Film);
    addFilm(filmDto: CreateFilmsDto): Promise<Film>;
    getAllFilms(): Promise<Film[]>;
    getAllFilmsByRatingDESC(): Promise<Film[]>;
    getAllFilmsByRatingASC(): Promise<Film[]>;
    getFilmsByGenre(genre: string[]): Promise<Film[]>;
    sortedFilms(genre: string[], id: number[], value: string): Promise<Film[]>;
    getFilmsById(id: number[]): Promise<Film[]>;
    getOneFilm(id: number): Promise<Film>;
    deleteFilm(id: number): Promise<void>;
    updateFilmInfo(filmDto: UpdateFilmDto): Promise<[affectedCount: number]>;
}
