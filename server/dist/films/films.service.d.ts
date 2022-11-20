import { Film } from "./films.entity";
import { CreateFilmsDto } from "./dto/create-films.dto";
export declare class FilmsService {
    private filmRepository;
    constructor(filmRepository: typeof Film);
    addFilm(dto: CreateFilmsDto): Promise<Film>;
    getAllFilms(): Promise<Film[]>;
}
