import {Module} from '@nestjs/common';
import {SessionsService} from './sessions.service';
import {SessionsController} from './sessions.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Session} from "./sessions.entity";
import {Cinema} from "../cinema/cinema.entity";

@Module({
  providers: [SessionsService],
  controllers: [SessionsController],
  imports: [
    SequelizeModule.forFeature([Session, Cinema])
  ]
})
export class SessionsModule {}
