import {Body, Controller, Get, Post} from '@nestjs/common';
import {HallsService} from "./halls.service";
import {CreateSessionDto} from "../sessions/dto/create-session.dto";
import {CreateHallsDto} from "./dto/create-halls.dto";
import {UpdateCinemaDto} from "../cinema/dto/update-cinema.dto";
import {UpdateHallDto} from "./dto/update-halls.dto";

@Controller('halls')
export class HallsController {
    constructor(private hallsService: HallsService) {}

    @Post('create')
    create(@Body() hallsDto: CreateHallsDto) {
        return this.hallsService.addHalls(hallsDto);
    }

    @Post('update')
    async updateUserInfo(@Body() hallDto: UpdateHallDto) {
        return this.hallsService.updateHallInfo(hallDto);
    }

    @Get()
    getAll() {
        return this.hallsService.getAllHalls();
    }
}
