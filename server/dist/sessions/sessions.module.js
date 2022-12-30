"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsModule = void 0;
const common_1 = require("@nestjs/common");
const sessions_service_1 = require("./sessions.service");
const sessions_controller_1 = require("./sessions.controller");
const sequelize_1 = require("@nestjs/sequelize");
const sessions_entity_1 = require("./sessions.entity");
const cinema_entity_1 = require("../cinema/cinema.entity");
const films_entity_1 = require("../films/films.entity");
const halls_entity_1 = require("../halls/halls.entity");
const orders_entity_1 = require("../orders/orders.entity");
let SessionsModule = class SessionsModule {
};
SessionsModule = __decorate([
    (0, common_1.Module)({
        providers: [sessions_service_1.SessionsService],
        controllers: [sessions_controller_1.SessionsController],
        imports: [
            sequelize_1.SequelizeModule.forFeature([sessions_entity_1.Session, cinema_entity_1.Cinema, films_entity_1.Film, halls_entity_1.Halls, orders_entity_1.Order])
        ],
        exports: [sessions_service_1.SessionsService]
    })
], SessionsModule);
exports.SessionsModule = SessionsModule;
//# sourceMappingURL=sessions.module.js.map