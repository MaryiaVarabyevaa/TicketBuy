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
exports.FilmsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const films_entity_1 = require("./films.entity");
let FilmsService = class FilmsService {
    constructor(filmRepository) {
        this.filmRepository = filmRepository;
    }
    async addFilm(filmDto) {
        const film = await this.filmRepository.findOne({ where: { title: filmDto.title } });
        if (film) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.OK,
                error: 'The film with this name already exists',
            }, common_1.HttpStatus.OK);
        }
        const newFilm = await this.filmRepository.create(filmDto);
        return newFilm;
    }
    async getAllFilms() {
        const films = await this.filmRepository.findAll({
            attributes: ['title', 'id', 'description', 'url', 'rating', 'genre', 'runtime', 'country', 'imdbRating']
        });
        return films;
    }
    async getOneFilm(id) {
        const film = await this.filmRepository.findOne({
            attributes: ['title', 'id', 'description', 'url', 'rating', 'genre', 'runtime', 'country', 'imdbRating'],
            where: {
                id
            }
        });
        if (!film) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.OK,
                error: 'There is no film with this id in the system',
            }, common_1.HttpStatus.OK);
        }
        return film.dataValues;
    }
    async deleteFilm(id) {
        const film = await this.filmRepository.findOne({ where: { id } });
        if (film) {
            const deletedFilm = await this.filmRepository.destroy({
                where: {
                    id,
                }
            });
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.OK,
                error: 'There is no film with this name in the system',
            }, common_1.HttpStatus.OK);
        }
    }
    async updateFilmInfo(filmDto) {
        const { id } = filmDto, others = __rest(filmDto, ["id"]);
        const updateFilmInfo = await this.filmRepository.update(Object.assign({}, others), {
            where: {
                id
            }
        });
        return updateFilmInfo;
    }
};
FilmsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(films_entity_1.Film)),
    __metadata("design:paramtypes", [Object])
], FilmsService);
exports.FilmsService = FilmsService;
//# sourceMappingURL=films.service.js.map