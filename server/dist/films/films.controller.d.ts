import { FilmsService } from "./films.service";
import { CreateFilmsDto } from "./dto/create-films.dto";
import { UpdateFilmDto } from "./dto/update-films.dto";
export declare class FilmsController {
    private filmService;
    constructor(filmService: FilmsService);
    create(filmDto: CreateFilmsDto): Promise<import("./films.entity").Film>;
    deleteCinema(req: any): Promise<void>;
    updateUserInfo(cinemaDto: UpdateFilmDto): Promise<[affectedCount: number]>;
    getFilmsById(req: any): Promise<import("./films.entity").Film[]>;
    getSortedFilms(req: any): Promise<import("./films.entity").Film[]>;
    getAll(): Promise<import("./films.entity").Film[]>;
    getPostById(id: number): Promise<import("./films.entity").Film>;
}
