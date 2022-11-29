import {Body, Controller, Get, Post, Request} from '@nestjs/common';
import {CinemaService} from "./cinema.service";
import {CreateCinemaDto} from "./dto/create-cinema.dto";
import {UpdateUserDto} from "../users/dto/update-user.dto";
import {UpdateCinemaDto} from "./dto/update-cinema.dto";

@Controller('cinema')
export class CinemaController {
    constructor(private cinemaService: CinemaService) {}

    @Post('create')
    create(@Body() cinemaDto: CreateCinemaDto) {
        return this.cinemaService.addCinema(cinemaDto);
    }
    @Get()
    getAll() {
        return this.cinemaService.getAllCinema();
    }

    @Post('delete')
    deleteCinema(@Request() req) {
        return this.cinemaService.deleteCinema(req.body.id);
    }

    @Post('update')
    async updateUserInfo(@Body() cinemaDto: UpdateCinemaDto) {
        return this.cinemaService.updateCinemaInfo(cinemaDto);
    }
}
