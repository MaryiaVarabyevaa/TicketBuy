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
exports.Film = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sessions_entity_1 = require("../sessions/sessions.entity");
const comments_entity_1 = require("../comments/comments.entity");
let Film = class Film extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    }),
    __metadata("design:type", Number)
], Film.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false
    }),
    __metadata("design:type", String)
], Film.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(1000),
        allowNull: false
    }),
    __metadata("design:type", String)
], Film.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(5000),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Film.prototype, "url", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Film.prototype, "genre", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Film.prototype, "runtime", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Film.prototype, "country", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Film.prototype, "imdbRating", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: 0
    }),
    __metadata("design:type", Number)
], Film.prototype, "rating", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => sessions_entity_1.Session, { onDelete: 'CASCADE', hooks: true }),
    __metadata("design:type", Array)
], Film.prototype, "session", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => comments_entity_1.Comment),
    __metadata("design:type", Array)
], Film.prototype, "comments", void 0);
Film = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'films',
        timestamps: true,
        paranoid: true,
        hooks: {
            beforeBulkDestroy(options) {
                options.individualHooks = true;
                return options;
            },
            afterDestroy: function (instance, options) {
                const id = instance.dataValues.id;
                sessions_entity_1.Session.destroy({
                    where: {
                        filmId: id,
                    }
                }).then(r => console.log(r));
                console.log('after destroy');
            },
        }
    })
], Film);
exports.Film = Film;
//# sourceMappingURL=films.entity.js.map