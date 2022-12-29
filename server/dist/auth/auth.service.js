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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findOne(email);
        if (!user.dataValues) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                error: 'User with this email does not exist',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        let comparedPassword = bcrypt.compareSync(pass, user.dataValues.password);
        if (!comparedPassword) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                error: 'Invalid email or password',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        if (user && comparedPassword) {
            const _a = user.dataValues, { password } = _a, result = __rest(_a, ["password"]);
            return result;
        }
        return null;
    }
    async updatePassword(email, password) {
        const user = await this.usersService.findOne(email);
        let comparedPassword = bcrypt.compareSync(password, user.dataValues.password);
        if (comparedPassword) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.OK,
                error: 'This password has already been used',
            }, common_1.HttpStatus.OK);
        }
        const hashPassword = await bcrypt.hash(password, 5);
        return await this.usersService.updatePassword(email, hashPassword);
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id };
        return {
            token: this.jwtService.sign(payload),
        };
    }
    async registration(newUser) {
        const { firstName, lastName, email, password } = newUser;
        const checkedUser = await this.usersService.checkUserInSystem(firstName, lastName, email);
        if (checkedUser) {
            let comparedPassword = bcrypt.compareSync(password, checkedUser.dataValues.password);
            if (comparedPassword) {
                const token = await this.login({
                    email: checkedUser.dataValues.email,
                    id: checkedUser.dataValues.id,
                });
                return token;
            }
        }
        const user = await this.usersService.findOne(email);
        if (user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.UNAUTHORIZED,
                error: 'User with such email already exists',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const savedUser = await this.usersService.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        });
        const token = await this.login(savedUser.dataValues);
        return token;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map