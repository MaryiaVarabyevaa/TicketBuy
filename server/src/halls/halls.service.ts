import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Halls} from "./halls.entity";
import {CreateHallsDto} from "./dto/create-halls.dto";
import {UpdateCinemaDto} from "../cinema/dto/update-cinema.dto";
import {UpdateHallDto} from "./dto/update-halls.dto";

@Injectable()
export class HallsService {
    constructor(@InjectModel(Halls) private hallsRepository: typeof Halls) {}

    async addHalls(hallsDto: CreateHallsDto) {
        const session = await this.hallsRepository.create(hallsDto);
        return session;
    }
    async getAllHalls() {
        const sessions = await this.hallsRepository.findAll();
        return sessions;
    }
    async updateHallInfo(hallDto: UpdateHallDto) {
        const {cinemaId, ...others} = hallDto;
        const updateHallsInfo = await this.hallsRepository.update({...others}, {
            where: {
                cinemaId
            }
        });
        return updateHallsInfo;
    }
}
