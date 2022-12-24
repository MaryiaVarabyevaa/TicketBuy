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
exports.SessionsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sessions_entity_1 = require("./sessions.entity");
const sequelize_2 = require("sequelize");
let SessionsService = class SessionsService {
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }
    async addSession(dto) {
        const session = await this.sessionRepository.create(dto);
        return session;
    }
    async getAllSessions() {
        const sessions = await this.sessionRepository.findAll();
        return sessions;
    }
    async getSessionsByDate(date) {
        const sessions = await this.sessionRepository.findAll({
            where: {
                date
            },
            attributes: [[sequelize_2.default.fn('DISTINCT', sequelize_2.default.col('filmId')), 'filmId']],
        });
        return sessions;
    }
    async findSessionsByCinemaId(cinemaId) {
        const sessions = await this.sessionRepository.findAll({
            where: {
                cinemaId
            },
            attributes: [[sequelize_2.default.fn('DISTINCT', sequelize_2.default.col('filmId')), 'filmId']],
        });
        return sessions;
    }
    async getSessionsByCinemaId(cinemaId) {
        const sessions = await this.sessionRepository.findAll({
            where: {
                cinemaId
            },
            attributes: {
                include: [
                    [
                        sequelize_2.default.literal(`(
                    SELECT COUNT(*)
                    FROM session
                    GROUP BY date
                )`),
                        'laughReactionsCount'
                    ]
                ]
            }
        });
        return sessions;
    }
    async getSessionInfoById(id) {
        const session = await this.sessionRepository.findOne({
            where: {
                id
            },
            attributes: { exclude: ['seats', 'deletedAt', 'createdAt', 'updatedAt'] }
        });
        if (!session) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.OK,
                error: 'There is no such session',
            }, common_1.HttpStatus.OK);
        }
        return session;
    }
    async findCinemaIdByFilmId(filmId) {
        const sessions = await this.sessionRepository.findAll({
            where: {
                filmId
            },
            attributes: [[sequelize_2.default.fn('DISTINCT', sequelize_2.default.col('cinemaId')), 'cinemaId']],
        });
        let id = [];
        sessions.map(({ cinemaId }) => {
            id.push(cinemaId);
        });
        return id;
    }
    async updateSessionInfo(sessionDto) {
        const { id } = sessionDto, others = __rest(sessionDto, ["id"]);
        const updateCSessionInfo = await this.sessionRepository.update(Object.assign({}, others), {
            where: {
                id
            }
        });
        return updateCSessionInfo;
    }
    async deleteSession(id) {
        const session = await this.sessionRepository.findOne({ where: { id } });
        if (session) {
            const deletedSession = await this.sessionRepository.destroy({
                where: {
                    id,
                }
            });
        }
        else {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.OK,
                error: 'There is no such session',
            }, common_1.HttpStatus.OK);
        }
    }
    async getSessionsByFilmId(filmId) {
        const session = await this.sessionRepository.findAll({ where: { filmId } });
        return session;
    }
    async getSeats(id) {
        const session = await this.sessionRepository.findOne({
            attributes: ['seats'],
            where: {
                id
            }
        });
        if (!session) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.OK,
                error: 'There is no such session',
            }, common_1.HttpStatus.OK);
        }
        return session;
    }
};
SessionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(sessions_entity_1.Session)),
    __metadata("design:paramtypes", [Object])
], SessionsService);
exports.SessionsService = SessionsService;
//# sourceMappingURL=sessions.service.js.map