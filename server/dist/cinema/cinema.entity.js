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
exports.Cinema = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sessions_entity_1 = require("../sessions/sessions.entity");
const halls_entity_1 = require("../halls/halls.entity");
let Cinema = class Cinema extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    }),
    __metadata("design:type", Number)
], Cinema.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false
    }),
    __metadata("design:type", String)
], Cinema.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false
    }),
    __metadata("design:type", String)
], Cinema.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false
    }),
    __metadata("design:type", String)
], Cinema.prototype, "street", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], Cinema.prototype, "buildingNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => sessions_entity_1.Session),
    __metadata("design:type", Array)
], Cinema.prototype, "session", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => halls_entity_1.Halls),
    __metadata("design:type", Array)
], Cinema.prototype, "halls", void 0);
Cinema = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'cinema',
        timestamps: true,
        paranoid: true,
    })
], Cinema);
exports.Cinema = Cinema;
//# sourceMappingURL=cinema.entity.js.map