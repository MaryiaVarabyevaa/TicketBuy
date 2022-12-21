import {Body, Controller, Get, Param, ParseIntPipe, Post, Request} from '@nestjs/common';
import {SessionsService} from "./sessions.service";
import {CreateSessionDto} from "./dto/create-session.dto";
import {UpdateSessionDto} from "./dto/update-session.dto";

@Controller('sessions')
export class SessionsController {
    constructor(private sessionService: SessionsService) {}

    @Post('create')
    create(@Body() sessionDto: CreateSessionDto) {
        return this.sessionService.addSession(sessionDto);
    }

    @Post('update')
    async updateSessionInfo(@Body() sessionDto: UpdateSessionDto) {
        return this.sessionService.updateSessionInfo(sessionDto);
    }

    @Post('delete')
    deleteSession(@Request() req) {
        return this.sessionService.deleteSession(req.body.id);
    }

    @Post('get-seats')
    getSeats(@Request() req) {
        return this.sessionService.getSeats(req.body.id);
    }

    @Get()
    getAll() {
        return this.sessionService.getAllSessions();
    }

    @Post('get_by_cinemaId')
    findSessionsByCinemaId(@Request() req) {
        return this.sessionService.findSessionsByCinemaId(req.body.cinemaId);
    }

    @Post('get_cinemaId')
    findCinemaIdByFilmId(@Request() req) {
        return this.sessionService.findCinemaIdByFilmId(req.body.filmId);
    }

    @Post('get_info')
    getSessionsByCinemaId(@Request() req) {
        return this.sessionService.getSessionsByCinemaId(req.body.cinemaId);
    }

    @Post('get_by_date')
    getSessionsByDate(@Request() req) {
        return this.sessionService.getSessionsByDate(req.body.date);
    }

    @Post('take-seats')
    takeSeats(@Request() req) {
        return this.sessionService.takeSeats(req.body.id, req.body.seats);
    }

    @Post('get-info')
    getSessionById(@Request() req) {
        return this.sessionService.getSessionInfoById(req.body.id);
    }

    @Get(':id')
    getSessionsByFilmId(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.sessionService.getSessionsByFilmId(id);
    }
}
