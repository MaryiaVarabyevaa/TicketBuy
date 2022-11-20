import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../users/users.entity";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {Session} from "./sessions.entity";
import {CreateSessionDto} from "./dto/create-session.dto";

@Injectable()
export class SessionsService {
    constructor(@InjectModel(Session) private sessionRepository: typeof Session) {}

    async addSession(dto: CreateSessionDto) {
        const session = await this.sessionRepository.create(dto);
        return session;
    }
    async getAllSessions() {
        const sessions = await this.sessionRepository.findAll();
        return sessions;
    }
}
