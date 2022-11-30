import {Body, Controller, Get, Post, Request} from '@nestjs/common';
import {FilmsService} from "./films.service";
import {CreateFilmsDto} from "./dto/create-films.dto";
import {UpdateCinemaDto} from "../cinema/dto/update-cinema.dto";
import {UpdateFilmDto} from "./dto/update-films.dto";

@Controller('film')
export class FilmsController {
    constructor(private filmService: FilmsService) {}

    @Post('create')
    create(@Body() filmDto: CreateFilmsDto) {
        return this.filmService.addFilm(filmDto);
    }

    @Post('delete')
    deleteCinema(@Request() req) {
        return this.filmService.deleteFilm(req.body.id);
    }
    @Post('update')
    async updateUserInfo(@Body() cinemaDto: UpdateFilmDto) {
        return this.filmService.updateFilmInfo(cinemaDto);
    }

    @Get()
    getAll() {
        return this.filmService.getAllFilms();
    }
}
