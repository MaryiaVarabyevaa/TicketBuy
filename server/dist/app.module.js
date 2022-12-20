"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const users_entity_1 = require("./users/users.entity");
const cinema_module_1 = require("./cinema/cinema.module");
const films_module_1 = require("./films/films.module");
const sessions_module_1 = require("./sessions/sessions.module");
const sessions_entity_1 = require("./sessions/sessions.entity");
const films_entity_1 = require("./films/films.entity");
const cinema_entity_1 = require("./cinema/cinema.entity");
const auth_module_1 = require("./auth/auth.module");
const halls_module_1 = require("./halls/halls.module");
const halls_entity_1 = require("./halls/halls.entity");
const comments_module_1 = require("./comments/comments.module");
const comments_entity_1 = require("./comments/comments.entity");
const orders_module_1 = require("./orders/orders.module");
const orders_entity_1 = require("./orders/orders.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env'
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                models: [users_entity_1.User, cinema_entity_1.Cinema, films_entity_1.Film, sessions_entity_1.Session, halls_entity_1.Halls, comments_entity_1.Comment, orders_entity_1.Order],
                autoLoadModels: true,
                synchronize: true,
                sync: ({ alter: true }),
            }),
            users_module_1.UsersModule,
            cinema_module_1.CinemaModule,
            films_module_1.FilmsModule,
            sessions_module_1.SessionsModule,
            auth_module_1.AuthModule,
            halls_module_1.HallsModule,
            comments_module_1.CommentsModule,
            orders_module_1.OrdersModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map