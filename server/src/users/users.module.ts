import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.entity";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      // forFeature используется для регистрации модуля
      SequelizeModule.forFeature([User])
  ]
})
export class UsersModule {}
