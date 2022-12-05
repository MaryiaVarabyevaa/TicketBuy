import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Halls} from "./halls.entity";
import {CreateHallsDto} from "./dto/create-halls.dto";

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
}
