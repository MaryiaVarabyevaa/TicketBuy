import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Session} from "./sessions.entity";
import {CreateSessionDto} from "./dto/create-session.dto";
import {UpdateSessionDto} from "./dto/update-session.dto";
import sequelize, {Op} from "sequelize";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const fullDate = `${year}-${month + 1}-${day}`;

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

    async getCurrentFilmsFromSessions() {
        const sessions = await this.sessionRepository.findAll({
            where: {
                date: {
                    [Op.gte]: fullDate
                }
            },
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('filmId')), 'filmId']],
        });

        const filmsId = [];
        sessions.map(({filmId}) => {
            filmsId.push(filmId);
        })
        return filmsId;
    }

    async getSessionsByDate(date: string) {
        const sessions = await this.sessionRepository.findAll({
            where: {
                date
            },
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('filmId')), 'filmId']],
        });
        return sessions;
    }

    async getSessionsByCinemaId(cinemaId: number) {
        const sessions = await this.sessionRepository.findAll({
            where: {
                cinemaId,
                date: {
                    [Op.gte]: fullDate
                }
            },
            attributes: { exclude: ['seats' , 'deletedAt', 'createdAt', 'updatedAt'] }
        });
        return sessions;
    }

    async getSessionsByHallId(hallId: number) {
        const sessions = await this.sessionRepository.findAll({
            where: {
                hallId,
                date: {
                    [Op.gte]: fullDate
                }
            },
            attributes: { exclude: ['seats' , 'deletedAt', 'createdAt', 'updatedAt'] }
        });
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
        const session = await this.sessionRepository.findAll({
            where: {
                filmId,
                date: {
                    [Op.gte]: fullDate
                }

            },
            order: [
                ['date', 'ASC']
            ],
        });
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

    async takeSeats(id: number, place: {seat: number, row: number}) {
        const allSeats = await this.sessionRepository.findOne({
            attributes: ['id' ,'seats'],
            where: {
                id,
            }
        });
        const {seat, row} = place;

        // @ts-ignore
        allSeats.dataValues.seats[row - 1][seat - 1] = true;
        allSeats.changed('seats', true);
        await allSeats.save();

        return allSeats.dataValues.seats;
    }
}
