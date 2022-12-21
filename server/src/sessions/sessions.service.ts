import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Session} from "./sessions.entity";
import {CreateSessionDto} from "./dto/create-session.dto";
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


    async getSessionsByDate(date: string) {
        const sessions = await this.sessionRepository.findAll({
            where: {
                date
            },
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('filmId')), 'filmId']],
        })
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

    async getSessionsByCinemaId(cinemaId: number) {
        const sessions = await this.sessionRepository.findAll({
            where: {
                cinemaId
            },
            attributes: {
                include: [
                    [
                        sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM session
                    GROUP BY date
                )`),
                        'laughReactionsCount'
                    ]
                ]
            }
        });
        return sessions;
        // const [result] = await this.sessionRepository.sequelize.query(
        //     `SELECT * FROM session WHERE cinemaId=${cinemaId}`
        // );

        // return result;
    }

    async getSessionInfoById(id: number) {
        const session = await this.sessionRepository.findOne({
            where: {
                id
            },
            attributes: { exclude: ['seats' , 'deletedAt', 'createdAt', 'updatedAt'] }
        });
        if (!session) {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'There is no such session',
                },
                HttpStatus.OK,
            );
        }

        return session;
    }


    async findCinemaIdByFilmId(filmId: number) {
        const sessions = await this.sessionRepository.findAll({
            where: {
                filmId
            },
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('cinemaId')), 'cinemaId']],
        });
        let id = [];
        sessions.map(({cinemaId}) => {
            id.push(cinemaId);
        })
        return id;
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

    async getSessionsByFilmId(filmId: number) {
        const session = await this.sessionRepository.findAll({where: {filmId}});
        return session
    }


    async getSeats(id: number) {
        const session = await this.sessionRepository.findOne({
            attributes: ['seats'],
            where: {
                id
            }
        });
        if (!session) {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'There is no such session',
                },
                HttpStatus.OK,
            );
        }

        return session;
    }

    async takeSeats(id: number,seats) {
        const takenSeats = await this.sessionRepository.update({seats}, {
            where: {
                id
            }
        });

        return takenSeats;
    }
}
