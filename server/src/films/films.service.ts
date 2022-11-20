import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Film} from "./films.entity";
import {CreateFilmsDto} from "./dto/create-films.dto";

@Injectable()
export class FilmsService {
    constructor(@InjectModel(Film) private filmRepository: typeof Film) {}

    async addFilm(dto: CreateFilmsDto) {
        const film = await this.filmRepository.create(dto);
        return film;
    }
    async getAllFilms() {
        const films = await this.filmRepository.findAll();
        return films;
    }
}
