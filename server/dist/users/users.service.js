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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_entity_1 = require("./users.entity");
const sequelize_1 = require("@nestjs/sequelize");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(userDto) {
        const user = await this.userRepository.create(userDto);
        return user;
    }
    async findOne(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll({
            attributes: ['email', 'id', "firstName", "lastName", "role", "isBlocked"]
        });
        const arrOfUsers = [];
        users.map(user => {
            const { dataValues } = user;
            arrOfUsers.push(dataValues);
        });
        return arrOfUsers;
    }
    async getUser(email) {
        const user = await this.userRepository.findOne({
            attributes: ['email', "firstName", "lastName", "role"],
            where: {
                email
            }
        });
        return user;
    }
    async blockUser(id) {
        const { isBlocked } = await this.userRepository.findOne({
            where: { id },
            attributes: ['isBlocked']
        });
        const blockedUser = await this.userRepository.update({ isBlocked: isBlocked ? false : true }, {
            where: {
                id
            }
        });
        return isBlocked;
    }
    async changeRole(id) {
        const { role } = await this.userRepository.findOne({
            where: { id },
            attributes: ['role']
        });
        const blockedUser = await this.userRepository.update({ role: role === 'user' ? 'moderator' : 'user' }, {
            where: {
                id
            }
        });
    }
    async updateUserInfo(userDto) {
        const { id, firstName, lastName, email } = userDto;
        const updateUserInfo = await this.userRepository.update({ firstName, lastName, email }, {
            where: {
                id
            }
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_entity_1.User)),
    __metadata("design:paramtypes", [Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map