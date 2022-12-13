import {Body, Controller, Get, Post, Request} from '@nestjs/common';
import {HallsService} from "./halls.service";
import {CreateHallsDto} from "./dto/create-halls.dto";
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
    @Post('delete_hall')
    deleteHall(@Request() req) {
        return this.hallsService.deleteHall(req.body.cinemaId, req.body.hallNumber);
    }

    @Post('delete')
    deleteAllHalls(@Request() req) {
        return this.hallsService.deleteAllHalls(req.body.cinemaId);
    }

    @Post('get_by_id')
    getHallsById(@Request() req) {
        return this.hallsService.getHallsById(req.body.cinemaId);
    }
    @Get()
    getAll() {
        return this.hallsService.getAllHalls();
    }

}
