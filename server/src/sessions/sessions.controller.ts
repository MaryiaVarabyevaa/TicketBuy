import {Body, Controller, Get, Post, Request} from '@nestjs/common';
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
    deleteCinema(@Request() req) {
        return this.sessionService.deleteSession(req.body.id);
    }

    @Get()
    getAll() {
        return this.sessionService.getAllSessions();
    }

    @Post('get_by_cinemaId')
    findSessionsByCinemaId(@Request() req) {
        return this.sessionService.findSessionsByCinemaId(req.body.cinemaId);
    }
}
