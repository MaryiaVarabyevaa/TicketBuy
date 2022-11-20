import { FilmsService } from "./films.service";
import { CreateFilmsDto } from "./dto/create-films.dto";
export declare class FilmsController {
    private filmService;
    constructor(filmService: FilmsService);
    create(filmDto: CreateFilmsDto): Promise<import("./films.entity").Film>;
    getAll(): Promise<import("./films.entity").Film[]>;
}
