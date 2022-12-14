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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmsController = void 0;
const common_1 = require("@nestjs/common");
const films_service_1 = require("./films.service");
const create_films_dto_1 = require("./dto/create-films.dto");
const update_films_dto_1 = require("./dto/update-films.dto");
let FilmsController = class FilmsController {
    constructor(filmService) {
        this.filmService = filmService;
    }
    create(filmDto) {
        return this.filmService.addFilm(filmDto);
    }
    deleteCinema(req) {
        return this.filmService.deleteFilm(req.body.id);
    }
    async updateUserInfo(cinemaDto) {
        return this.filmService.updateFilmInfo(cinemaDto);
    }
    async getFilmsByGenre(req) {
        return this.filmService.getFilmsByGenre(req.body.genre, req.body.title, req.body.value);
    }
    async getFilmsById(req) {
        return this.filmService.getFilmsById(req.body.id);
    }
    getAll() {
        return this.filmService.getAllFilms();
    }
    getAllFilmsByRatingDESC() {
        return this.filmService.getAllFilmsByRatingDESC();
    }
    getAllFilmsByRatingASC() {
        return this.filmService.getAllFilmsByRatingASC();
    }
    getAllFilmsByCountryASC() {
        return this.filmService.getAllFilmsByCountryASC();
    }
    getAllFilmsByCountryDESC() {
        return this.filmService.getAllFilmsByCountryDESC();
    }
    getAllFilmsByTitleASC() {
        return this.filmService.getAllFilmsByTitleASC();
    }
    getAllFilmsByTitleDESC() {
        return this.filmService.getAllFilmsByTitleDESC();
    }
    getPostById(id) {
        return this.filmService.getOneFilm(id);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_films_dto_1.CreateFilmsDto]),
    __metadata("design:returntype", void 0)
], FilmsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FilmsController.prototype, "deleteCinema", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_films_dto_1.UpdateFilmDto]),
    __metadata("design:returntype", Promise)
], FilmsController.prototype, "updateUserInfo", null);
__decorate([
    (0, common_1.Post)('filter_by_genre'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilmsController.prototype, "getFilmsByGenre", null);
__decorate([
    (0, common_1.Post)('filter_by_id'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilmsController.prototype, "getFilmsById", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FilmsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('get_by_rating_desc'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FilmsController.prototype, "getAllFilmsByRatingDESC", null);
__decorate([
    (0, common_1.Get)('get_by_rating_asc'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FilmsController.prototype, "getAllFilmsByRatingASC", null);
__decorate([
    (0, common_1.Get)('get_by_country_asc'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FilmsController.prototype, "getAllFilmsByCountryASC", null);
__decorate([
    (0, common_1.Get)('get_by_country_desc'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FilmsController.prototype, "getAllFilmsByCountryDESC", null);
__decorate([
    (0, common_1.Get)('get_by_title_asc'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FilmsController.prototype, "getAllFilmsByTitleASC", null);
__decorate([
    (0, common_1.Get)('get_by_title_desc'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FilmsController.prototype, "getAllFilmsByTitleDESC", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FilmsController.prototype, "getPostById", null);
FilmsController = __decorate([
    (0, common_1.Controller)('film'),
    __metadata("design:paramtypes", [films_service_1.FilmsService])
], FilmsController);
exports.FilmsController = FilmsController;
//# sourceMappingURL=films.controller.js.map