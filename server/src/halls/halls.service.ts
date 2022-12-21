import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Halls} from "./halls.entity";
import {CreateHallsDto} from "./dto/create-halls.dto";
import {UpdateHallDto} from "./dto/update-halls.dto";

@Injectable()
export class HallsService {
    constructor(@InjectModel(Halls) private hallsRepository: typeof Halls) {}

    async addHalls(hallsDto: CreateHallsDto) {
        let index = 0;
        const halls = await this.hallsRepository.findAll({
            where: {
                cinemaId: hallsDto.cinemaId
            }
        });
        if (halls) {
            index = halls.length;
        }
        const {type, cinemaId} = hallsDto;
        for (let i = 0; i < type.length; i++) {
            const hall = await this.hallsRepository.create({
                type: type[i],
                cinemaId,
                hallNumber: i + 1 + index,
            })
        }
    }
    async getAllHalls() {
        const halls = await this.hallsRepository.findAll();
        return halls;
    }

    async getHallsById(cinemaId: number) {
        const halls = await this.hallsRepository.findAll({
            where: {
                cinemaId
            }
        })
        return halls;
    }

    async getHallNumberById(id: number) {
        const hall = await this.hallsRepository.findOne({
            attributes: ['hallNumber'],
            where: {
                id
            },
        })
        return hall;
    }

    async deleteHall(cinemaId: number, hallNumber: number) {
        const hall = await this.hallsRepository.findOne({where: {
                cinemaId,
                hallNumber
        }});
        if (hall) {
            const deletedHall = await this.hallsRepository.destroy({
                where: {
                    cinemaId,
                    hallNumber
                }
            })
            await this.updateHallNumber(cinemaId);
        } else {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'There is no hall with this cinemaId in the system',
                },
                HttpStatus.OK,
            );
        }
    }

    async deleteAllHalls(cinemaId: number) {
        const halls = await this.hallsRepository.findAll({
            where: {
                cinemaId,
            }
        });
        if (halls) {
            const deletedHalls = await this.hallsRepository.destroy({
                where: {
                    cinemaId
                }
            })
            await this.updateHallNumber(cinemaId);
        } else {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'There are no halls with this cinemaId in the system',
                },
                HttpStatus.OK,
            );
        }
    }

    async updateHallNumber(cinemaId: number) {
        const halls = await this.hallsRepository.findAll({
            where: {
                cinemaId,
            }
        })

        halls.map(async (hall, index) => {
            const id = hall.id;
            const updateHallsInfo = await this.hallsRepository.update({
                hallNumber: index + 1
            }, {
                where: {
                    id
                }
            });
        })
    }

    async updateHallInfo(hallDto: UpdateHallDto) {
        const {cinemaId, hallNumber, type} = hallDto;
        const hall = await this.hallsRepository.findOne({
            where: {
                cinemaId,
                hallNumber
            }
        })

        if (hall) {
            const updateHall = await this.hallsRepository.update({
                type
            }, {
               where: {
                   cinemaId,
                   hallNumber
               }
            });
            return updateHall;
        } else {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'There is no hall with this cinemaId and number of hall in the system',
                },
                HttpStatus.OK,
            );
        }
    }

}
