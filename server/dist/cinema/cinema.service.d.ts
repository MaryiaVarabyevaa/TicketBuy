import { Cinema } from "./cinema.entity";
import { CreateCinemaDto } from "./dto/create-cinema.dto";
import { UpdateCinemaDto } from "./dto/update-cinema.dto";
export declare class CinemaService {
    private cinemaRepository;
    constructor(cinemaRepository: typeof Cinema);
    addCinema(cinemaDto: CreateCinemaDto): Promise<Cinema>;
    getAllCinema(): Promise<Cinema[]>;
    getId(): Promise<number>;
    deleteCinema(id: number): Promise<void>;
    updateCinemaInfo(cinemaDto: UpdateCinemaDto): Promise<[affectedCount: number]>;
}
