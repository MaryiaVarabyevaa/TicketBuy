import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      // forFeature используется для регистрации модуля
      SequelizeModule.forFeature([User]),
    forwardRef(() => AuthModule)
  ],
  exports: [UsersService],
})
export class UsersModule {}
