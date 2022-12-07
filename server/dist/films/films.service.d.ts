import { Film } from "./films.entity";
import { CreateFilmsDto } from "./dto/create-films.dto";
import { UpdateFilmDto } from "./dto/update-films.dto";
export declare class FilmsService {
    private filmRepository;
    constructor(filmRepository: typeof Film);
    addFilm(filmDto: CreateFilmsDto): Promise<Film>;
    getAllFilms(): Promise<Film[]>;
    getOneFilm(id: number): Promise<Film>;
    deleteFilm(id: number): Promise<void>;
    updateFilmInfo(filmDto: UpdateFilmDto): Promise<[affectedCount: number]>;
}
