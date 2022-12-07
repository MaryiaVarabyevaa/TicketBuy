import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.entity";
import {CinemaModule} from './cinema/cinema.module';
import {FilmsModule} from './films/films.module';
import {SessionsModule} from './sessions/sessions.module';
import {Session} from "./sessions/sessions.entity";
import {Film} from "./films/films.entity";
import {Cinema} from "./cinema/cinema.entity";
import {AuthModule} from "./auth/auth.module";
import {HallsModule} from './halls/halls.module';
import {Halls} from "./halls/halls.entity";
import {CommentsModule} from './comments/comments.module';
import {Comment} from "./comments/comments.entity";

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
            models: [User, Cinema, Film, Session, Halls, Comment],
            autoLoadModels: true,
            synchronize: true,
        }),
        UsersModule,
        CinemaModule,
        FilmsModule,
        SessionsModule,
        AuthModule,
        HallsModule,
        CommentsModule
    ],
})
export class AppModule {}
