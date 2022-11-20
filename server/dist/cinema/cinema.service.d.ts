import { Cinema } from "./cinema.entity";
import { CreateCinemaDto } from "./dto/create-cinema.dto";
export declare class CinemaService {
    private cinemaRepository;
    constructor(cinemaRepository: typeof Cinema);
    addCinema(dto: CreateCinemaDto): Promise<Cinema>;
    getAllCinema(): Promise<Cinema[]>;
}
