"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CinemaModule = void 0;
const common_1 = require("@nestjs/common");
const cinema_service_1 = require("./cinema.service");
const cinema_controller_1 = require("./cinema.controller");
const sequelize_1 = require("@nestjs/sequelize");
const cinema_entity_1 = require("./cinema.entity");
let CinemaModule = class CinemaModule {
};
CinemaModule = __decorate([
    (0, common_1.Module)({
        providers: [cinema_service_1.CinemaService],
        controllers: [cinema_controller_1.CinemaController],
        imports: [
            sequelize_1.SequelizeModule.forFeature([cinema_entity_1.Cinema])
        ]
    })
], CinemaModule);
exports.CinemaModule = CinemaModule;
//# sourceMappingURL=cinema.module.js.map