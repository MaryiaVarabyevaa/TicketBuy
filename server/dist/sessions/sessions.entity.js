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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const cinema_entity_1 = require("../cinema/cinema.entity");
const films_entity_1 = require("../films/films.entity");
const halls_entity_1 = require("../halls/halls.entity");
let Session = class Session extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    }),
    __metadata("design:type", Number)
], Session.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: false
    }),
    __metadata("design:type", String)
], Session.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TIME,
        allowNull: false
    }),
    __metadata("design:type", String)
], Session.prototype, "time", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], Session.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => films_entity_1.Film),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Session.prototype, "filmId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => films_entity_1.Film),
    __metadata("design:type", films_entity_1.Film)
], Session.prototype, "filmTitle", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => cinema_entity_1.Cinema),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Session.prototype, "cinemaId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => cinema_entity_1.Cinema),
    __metadata("design:type", cinema_entity_1.Cinema)
], Session.prototype, "cinemaName", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => halls_entity_1.Halls),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Session.prototype, "hallId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => halls_entity_1.Halls),
    __metadata("design:type", cinema_entity_1.Cinema)
], Session.prototype, "hallNumber", void 0);
Session = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'session',
        timestamps: true,
        paranoid: true,
    })
], Session);
exports.Session = Session;
//# sourceMappingURL=sessions.entity.js.map