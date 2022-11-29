import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Cinema} from "./cinema.entity";
import {CreateCinemaDto} from "./dto/create-cinema.dto";
import {UpdateCinemaDto} from "./dto/update-cinema.dto";

@Injectable()
export class CinemaService {
    constructor(@InjectModel(Cinema) private cinemaRepository: typeof Cinema) {}

    async addCinema(cinemaDto: CreateCinemaDto){
        const cinema = await this.cinemaRepository.create(cinemaDto);
        return cinema;
    }

    async getAllCinema() {
        const cinema = await this.cinemaRepository.findAll({
            attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] }
        });
        return cinema;
    }

    async deleteCinema(id: number) {
        const cinema = await this.cinemaRepository.findOne({where: {id}});
        if (cinema) {
            const deletedCinema = await this.cinemaRepository.destroy({
                where: {
                   id,
                }
            })
        } else {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'There is no cinema with this name in the system',
                },
                HttpStatus.OK,
            );
        }
    }

    async updateCinemaInfo(cinemaDto: UpdateCinemaDto) {
        const {id, ...others} = cinemaDto;
        const updateCinemaInfo = await this.cinemaRepository.update({...others}, {
            where: {
               id
            }
        });
        return updateCinemaInfo;
    }
}
