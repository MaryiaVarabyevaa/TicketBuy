import {Module} from '@nestjs/common';
import {HallsController} from './halls.controller';
import {HallsService} from './halls.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Halls} from "./halls.entity";
import {Cinema} from "../cinema/cinema.entity";

@Module({
  controllers: [HallsController],
  providers: [HallsService],
  imports: [
    SequelizeModule.forFeature([Halls, Cinema])
  ]
})
export class HallsModule {}
