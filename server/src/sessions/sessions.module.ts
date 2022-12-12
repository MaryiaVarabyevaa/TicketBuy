import {Module} from '@nestjs/common';
import {SessionsService} from './sessions.service';
import {SessionsController} from './sessions.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Session} from "./sessions.entity";
import {Cinema} from "../cinema/cinema.entity";
import {Film} from "../films/films.entity";
import {Halls} from "../halls/halls.entity";

@Module({
  providers: [SessionsService],
  controllers: [SessionsController],
  imports: [
    SequelizeModule.forFeature([Session, Cinema, Film, Halls])
  ]
})
export class SessionsModule {}
