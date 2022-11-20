import {Module} from '@nestjs/common';
import {CinemaService} from './cinema.service';
import {CinemaController} from './cinema.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Cinema} from "./cinema.entity";

@Module({
  providers: [CinemaService],
  controllers: [CinemaController],
  imports: [
    // forFeature используется для регистрации модуля
    SequelizeModule.forFeature([Cinema])
  ]
})
export class CinemaModule {}
