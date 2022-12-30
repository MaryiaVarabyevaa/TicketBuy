import { Film } from "./films.entity";
import { CreateFilmsDto } from "./dto/create-films.dto";
import { UpdateFilmDto } from "./dto/update-films.dto";
import { SessionsService } from "../sessions/sessions.service";
export declare class FilmsService {
    private filmRepository;
    private sessionsService;
    constructor(filmRepository: typeof Film, sessionsService: SessionsService);
    addFilm(filmDto: CreateFilmsDto): Promise<Film>;
    getAllFilms(): Promise<Film[]>;
    sortFilms(genre: string[], id: number[], value: string): Promise<Film[]>;
    getFilmsById(id: number[]): Promise<Film[]>;
    getOneFilm(id: number): Promise<Film>;
    deleteFilm(id: number): Promise<void>;
    updateFilmInfo(filmDto: UpdateFilmDto): Promise<[affectedCount: number]>;
}
