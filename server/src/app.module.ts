import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.entity";
import {CinemaModule} from './cinema/cinema.module';
import { FilmsModule } from './films/films.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [User],
            autoLoadModels: true
        }),
        UsersModule,
        CinemaModule,
        FilmsModule,
        SessionsModule,
    ],
})
export class AppModule {}
