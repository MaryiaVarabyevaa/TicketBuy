import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Cinema} from "./cinema.entity";
import {CreateCinemaDto} from "./dto/create-cinema.dto";
import {UpdateCinemaDto} from "./dto/update-cinema.dto";

@Injectable()
export class CinemaService {
    constructor(@InjectModel(Cinema) private cinemaRepository: typeof Cinema) {}

    async addCinema(cinemaDto: CreateCinemaDto){
        const cinema = await this.cinemaRepository.findOne({
            where: {
                name: cinemaDto.name,
                city: cinemaDto.city,
                street: cinemaDto.street,
                buildingNumber: cinemaDto.buildingNumber
            }
        })

        if (cinema) {
            throw new HttpException(
                {
                    status: HttpStatus.OK,
                    error: 'Cinema with this name already exists',
                },
                HttpStatus.OK,
            );
        }


        const newCinema = await this.cinemaRepository.create(cinemaDto);
        return newCinema;
    }

    async getAllCinema() {
        const cinema = await this.cinemaRepository.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
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
