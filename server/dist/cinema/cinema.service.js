"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CinemaService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const cinema_entity_1 = require("./cinema.entity");
let CinemaService = class CinemaService {
    constructor(cinemaRepository) {
        this.cinemaRepository = cinemaRepository;
    }
    async addCinema(cinemaDto) {
        const cinema = await this.cinemaRepository.findOne({
            where: {
                name: cinemaDto.name,
                city: cinemaDto.city,
                street: cinemaDto.street,
                buildingNumber: cinemaDto.buildingNumber
            }
        });
        if (cinema) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.OK,
                error: 'Cinema with this name already exists',
            }, common_1.HttpStatus.OK);
        }
        const newCinema = await this.cinemaRepository.create(cinemaDto);
        return newCinema;
    }
    async getAllCinema() {
        const cinema = await this.cinemaRepository.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        });
        return cinema;
    }
    async getCinemaId(cinemaDto) {
        const cinema = await this.cinemaRepository.findOne({
            where: Object.assign({}, cinemaDto)
        });
        return cinema.id;
    }
    async deleteCinema(id) {
        const cinema = await this.cinemaRepository.findOne({ where: { id } });
        if (cinema) {
            const deletedCinema = await this.cinemaRepository.destroy({
                where: {
                    id,
                }
            });
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.OK,
                error: 'There is no cinema with this name in the system',
            }, common_1.HttpStatus.OK);
        }
    }
    async updateCinemaInfo(cinemaDto) {
        const { id } = cinemaDto, others = __rest(cinemaDto, ["id"]);
        const updateCinemaInfo = await this.cinemaRepository.update(Object.assign({}, others), {
            where: {
                id
            }
        });
        return updateCinemaInfo;
    }
};
CinemaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(cinema_entity_1.Cinema)),
    __metadata("design:paramtypes", [Object])
], CinemaService);
exports.CinemaService = CinemaService;
//# sourceMappingURL=cinema.service.js.map