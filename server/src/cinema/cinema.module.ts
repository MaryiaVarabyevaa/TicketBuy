import {Module} from '@nestjs/common';
import {CinemaService} from './cinema.service';
import {CinemaController} from './cinema.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Cinema} from "./cinema.entity";
import {Session} from "../sessions/sessions.entity";
import {Halls} from "../halls/halls.entity";

@Module({
  providers: [CinemaService],
  controllers: [CinemaController],
  imports: [
    SequelizeModule.forFeature([Cinema, Halls, Session])
  ]
})
export class CinemaModule {}
