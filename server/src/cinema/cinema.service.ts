import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Cinema} from "./cinema.entity";
import {CreateCinemaDto} from "./dto/create-cinema.dto";

@Injectable()
export class CinemaService {
    constructor(@InjectModel(Cinema) private cinemaRepository: typeof Cinema) {}

    async addCinema(dto: CreateCinemaDto){
        const cinema = await this.cinemaRepository.create(dto);
        return cinema;
    }
    async getAllCinema() {
        const cinema = await this.cinemaRepository.findAll();
        return cinema;
    }
}
