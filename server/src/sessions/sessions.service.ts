import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Session} from "./sessions.entity";
import {CreateSessionDto} from "./dto/create-session.dto";
import {UpdateFilmDto} from "../films/dto/update-films.dto";
import {UpdateSessionDto} from "./dto/update-session.dto";
import sequelize from "sequelize";

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

    async findSessionsByCinemaId(cinemaId: number[]) {
        const sessions = await this.sessionRepository.findAll({
            where: {
                cinemaId
            },
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('filmId')), 'filmId']],
        });

        return sessions;
    }
    async updateSessionInfo(sessionDto: UpdateSessionDto) {
        const {id, ...others} = sessionDto;
        const updateCSessionInfo = await this.sessionRepository.update({...others}, {
            where: {
                id
            }
        });
       return updateCSessionInfo;
    }

    async deleteSession(id: number) {
        const session = await this.sessionRepository.findOne({where: {id}});
        if (session) {
            const deletedSession = await this.sessionRepository.destroy({
                where: {
                    id,
                }
            })
        } else {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'There is no such session',
                },
                HttpStatus.OK,
            );
        }
    }
}
