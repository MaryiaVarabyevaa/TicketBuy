import {Module} from '@nestjs/common';
import {CommentsService} from './comments.service';
import {CommentsController} from './comments.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Comment} from "./comments.entity";
import {Film} from "../films/films.entity";
import {User} from "../users/users.entity";

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [
    SequelizeModule.forFeature([Comment, Film, User])
  ]
})
export class CommentsModule {}
