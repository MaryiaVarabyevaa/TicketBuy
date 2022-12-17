import { CinemaService } from "./cinema.service";
import { CreateCinemaDto } from "./dto/create-cinema.dto";
import { UpdateCinemaDto } from "./dto/update-cinema.dto";
export declare class CinemaController {
    private cinemaService;
    constructor(cinemaService: CinemaService);
    create(cinemaDto: CreateCinemaDto): Promise<import("./cinema.entity").Cinema>;
    getAll(): Promise<import("./cinema.entity").Cinema[]>;
    getCinemaI(cinemaDto: CreateCinemaDto): Promise<number>;
    getCinemaById(req: any): Promise<import("./cinema.entity").Cinema[]>;
    deleteCinema(req: any): Promise<void>;
    updateUserInfo(cinemaDto: UpdateCinemaDto): Promise<[affectedCount: number]>;
}
