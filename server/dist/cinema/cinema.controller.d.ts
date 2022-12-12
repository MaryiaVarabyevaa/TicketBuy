import { CinemaService } from "./cinema.service";
import { CreateCinemaDto } from "./dto/create-cinema.dto";
import { UpdateCinemaDto } from "./dto/update-cinema.dto";
export declare class CinemaController {
    private cinemaService;
    constructor(cinemaService: CinemaService);
    create(cinemaDto: CreateCinemaDto): Promise<import("./cinema.entity").Cinema>;
    getAll(): Promise<import("./cinema.entity").Cinema[]>;
    getCinemaID(cinemaDto: CreateCinemaDto): Promise<number>;
    deleteCinema(req: any): Promise<void>;
    updateUserInfo(cinemaDto: UpdateCinemaDto): Promise<[affectedCount: number]>;
}
