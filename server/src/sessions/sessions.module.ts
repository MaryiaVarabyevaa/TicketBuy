import {Module} from '@nestjs/common';
import {SessionsService} from './sessions.service';
import {SessionsController} from './sessions.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Session} from "./sessions.entity";

@Module({
  providers: [SessionsService],
  controllers: [SessionsController],
  imports: [
    SequelizeModule.forFeature([Session])
  ]
})
export class SessionsModule {}
