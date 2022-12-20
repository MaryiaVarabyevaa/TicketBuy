import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Session} from "../sessions/sessions.entity";
import {Cinema} from "../cinema/cinema.entity";
import {Film} from "../films/films.entity";
import {Halls} from "../halls/halls.entity";
import {Order} from "./orders.entity";
import {User} from "../users/users.entity";

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
    SequelizeModule.forFeature([Order, User, Session])
  ]
})
export class OrdersModule {}
