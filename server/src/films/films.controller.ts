import {Body, Controller, Get, Post} from '@nestjs/common';
import {FilmsService} from "./films.service";
import {CreateFilmsDto} from "./dto/create-films.dto";

@Controller('films')
export class FilmsController {
    constructor(private filmService: FilmsService) {}

    @Post()
    create(@Body() filmDto: CreateFilmsDto) {
        return this.filmService.addFilm(filmDto);
    }
    @Get()
    getAll() {
        return this.filmService.getAllFilms();
    }
}
