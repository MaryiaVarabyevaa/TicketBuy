"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmsModule = void 0;
const common_1 = require("@nestjs/common");
const films_controller_1 = require("./films.controller");
const films_service_1 = require("./films.service");
const sequelize_1 = require("@nestjs/sequelize");
const films_entity_1 = require("./films.entity");
let FilmsModule = class FilmsModule {
};
FilmsModule = __decorate([
    (0, common_1.Module)({
        controllers: [films_controller_1.FilmsController],
        providers: [films_service_1.FilmsService],
        imports: [
            sequelize_1.SequelizeModule.forFeature([films_entity_1.Film])
        ]
    })
], FilmsModule);
exports.FilmsModule = FilmsModule;
//# sourceMappingURL=films.module.js.map