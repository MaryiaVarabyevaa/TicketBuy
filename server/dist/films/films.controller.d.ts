import { FilmsService } from "./films.service";
import { CreateFilmsDto } from "./dto/create-films.dto";
import { UpdateFilmDto } from "./dto/update-films.dto";
export declare class FilmsController {
    private filmService;
    constructor(filmService: FilmsService);
    create(filmDto: CreateFilmsDto): Promise<import("./films.entity").Film>;
    deleteCinema(req: any): Promise<void>;
    updateUserInfo(cinemaDto: UpdateFilmDto): Promise<[affectedCount: number]>;
    getFilmsByGenre(req: any): Promise<import("./films.entity").Film[]>;
    getAll(): Promise<import("./films.entity").Film[]>;
    getAllFilmsByRatingDESC(): Promise<import("./films.entity").Film[]>;
    getAllFilmsByRatingASC(): Promise<import("./films.entity").Film[]>;
    getAllFilmsByCountryASC(): Promise<import("./films.entity").Film[]>;
    getAllFilmsByCountryDESC(): Promise<import("./films.entity").Film[]>;
    getAllFilmsByTitleASC(): Promise<import("./films.entity").Film[]>;
    getAllFilmsByTitleDESC(): Promise<import("./films.entity").Film[]>;
    getPostById(id: number): Promise<import("./films.entity").Film>;
}
