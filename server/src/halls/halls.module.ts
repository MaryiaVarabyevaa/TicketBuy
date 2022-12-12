import {Module} from '@nestjs/common';
import {HallsController} from './halls.controller';
import {HallsService} from './halls.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Halls} from "./halls.entity";
import {Cinema} from "../cinema/cinema.entity";
import {Session} from "../sessions/sessions.entity";

@Module({
  controllers: [HallsController],
  providers: [HallsService],
  imports: [
    SequelizeModule.forFeature([Halls, Cinema, Session])
  ]
})
export class HallsModule {}
