import {forwardRef, Module} from '@nestjs/common';
import {FilmsController} from './films.controller';
import {FilmsService} from './films.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Film} from "./films.entity";
import {Comment} from "../comments/comments.entity";
import {Session} from "../sessions/sessions.entity";
import {SessionsModule} from "../sessions/sessions.module";

@Module({
  controllers: [FilmsController],
  providers: [FilmsService],
  imports: [
    SequelizeModule.forFeature([Film, Comment, Session]),
    forwardRef(() => SessionsModule),
  ]
})
export class FilmsModule {}
