import {Body, Controller, Get, Post} from '@nestjs/common';
import {CinemaService} from "./cinema.service";
import {CreateCinemaDto} from "./dto/create-cinema.dto";

@Controller('cinema')
export class CinemaController {
    constructor(private cinemaService: CinemaService) {}

    @Post()
    create(@Body() cinemaDto: CreateCinemaDto) {
        return this.cinemaService.addCinema(cinemaDto);
    }
    @Get()
    getAll() {
        return this.cinemaService.getAllCinema();
    }
}
