import {Body, Controller, Get, Post} from '@nestjs/common';
import {SessionsService} from "./sessions.service";
import {CreateSessionDto} from "./dto/create-session.dto";

@Controller('sessions')
export class SessionsController {
    constructor(private sessionService: SessionsService) {}

    @Post()
    create(@Body() sessionDto: CreateSessionDto) {
        return this.sessionService.addSession(sessionDto);
    }

    @Get()
    getAll() {
        return this.sessionService.getAllSessions();
    }
}
