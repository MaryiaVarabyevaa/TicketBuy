import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Halls} from "./halls.entity";
import {CreateHallsDto} from "./dto/create-halls.dto";
import {UpdateHallDto} from "./dto/update-halls.dto";

@Injectable()
export class HallsService {
    constructor(@InjectModel(Halls) private hallsRepository: typeof Halls) {}

    async addHalls(hallsDto: CreateHallsDto) {
        const {number, ...others} = hallsDto;
        for (let i = 1; i <= number; i++) {
            const hall = await this.hallsRepository.create({...others})
        }
    }
    async getAllHalls() {
        const halls = await this.hallsRepository.findAll();
        return halls;
    }
    async updateHallInfo(hallDto: UpdateHallDto) {
        const {number, cinemaId} = hallDto;
        const cinema = await this.hallsRepository.findAll({
            where: {
                cinemaId,
            }
        })
        if (cinema.length < number) {
            const num = number - cinema.length;
            return this.addHalls({
                number: num,
                type: 'square',
                cinemaId
            })
        }
        if (cinema.length > number) {
            console.log('more')
        }
        if (cinema.length === number) {
            console.log('equal')
        }
        // const {cinemaId, ...others} = hallDto;
        // const updateHallsInfo = await this.hallsRepository.update({...others}, {
        //     where: {
        //         cinemaId
        //     }
        // });
        // return updateHallsInfo;
    }

    async deleteHall(id: number) {
        // const cinema = await this.hallsRepository.findOne({where: {id}});
        // if (cinema) {
        //     const deletedHall = await this.hallsRepository.destroy({
        //         where: {
        //             cinemaId: id,
        //         }
        //     })
        // } else {
        //     throw new HttpException(
        //         {
        //             status: HttpStatus.OK,
        //             error: 'There is no hall with this cinemaId in the system',
        //         },
        //         HttpStatus.OK,
        //     );
        // }
    }
}
