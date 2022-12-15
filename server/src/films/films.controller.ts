import {Body, Controller, Get, Param, ParseIntPipe, Post, Request} from '@nestjs/common';
import {FilmsService} from "./films.service";
import {CreateFilmsDto} from "./dto/create-films.dto";
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

    @Post('filter_by_genre')
    async getFilmsByGenre(@Request() req) {
        return this.filmService.getFilmsByGenre(req.body.genre);
    }

    @Post('filter_by_id')
    async getFilmsById(@Request() req) {
        return this.filmService.getFilmsById(
            req.body.id,
        );
    }

    @Post('sort')
    async getSortedFilms(@Request() req) {
        return this.filmService.sortedFilms(
            req.body.genre,
            req.body.id,
            req.body.value
        );
    }

    @Get()
    getAll() {
        return this.filmService.getAllFilms();
    }

    @Get('get_by_rating_desc')
    getAllFilmsByRatingDESC() {
        return this.filmService.getAllFilmsByRatingDESC();
    }
    @Get('get_by_rating_asc')
    getAllFilmsByRatingASC() {
        return this.filmService.getAllFilmsByRatingASC();
    }

    @Get(':id')
    getPostById(
        @Param('id', ParseIntPipe) id: number
    ) {
       return this.filmService.getOneFilm(id);
    }

}
