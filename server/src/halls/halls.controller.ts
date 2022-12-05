import {Body, Controller, Get, Post} from '@nestjs/common';
import {HallsService} from "./halls.service";
import {CreateSessionDto} from "../sessions/dto/create-session.dto";
import {CreateHallsDto} from "./dto/create-halls.dto";

@Controller('halls')
export class HallsController {
    constructor(private hallsService: HallsService) {}

    @Post('create')
    create(@Body() hallsDto: CreateHallsDto) {
        return this.hallsService.addHalls(hallsDto);
    }

    @Get()
    getAll() {
        return this.hallsService.getAllHalls();
    }
}
