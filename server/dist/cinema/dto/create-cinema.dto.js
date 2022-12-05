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
exports.CreateCinemaDto = void 0;
const class_validator_1 = require("class-validator");
class CreateCinemaDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Required to fill in'
    }),
    (0, class_validator_1.IsString)({
        message: 'Cinema name must be a string'
    }),
    (0, class_validator_1.Matches)(/^[a-zA-Z ]+$/, {
        message: 'Cinema name can contain only latin alphabet'
    }),
    __metadata("design:type", String)
], CreateCinemaDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Required to fill in'
    }),
    (0, class_validator_1.IsString)({
        message: 'City field must be a string'
    }),
    (0, class_validator_1.Matches)(/^[a-zA-Z ]+$/, {
        message: 'City field can contain only latin alphabet'
    }),
    __metadata("design:type", String)
], CreateCinemaDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Required to fill in'
    }),
    (0, class_validator_1.IsString)({
        message: 'Street field must be a string'
    }),
    (0, class_validator_1.Matches)(/^[a-zA-Z .,]+$/, {
        message: 'Street field can contain only latin alphabet'
    }),
    __metadata("design:type", String)
], CreateCinemaDto.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'Required to fill in'
    }),
    (0, class_validator_1.IsNumber)({}, {
        message: 'Number of building must be a string'
    }),
    __metadata("design:type", Number)
], CreateCinemaDto.prototype, "buildingNumber", void 0);
exports.CreateCinemaDto = CreateCinemaDto;
//# sourceMappingURL=create-cinema.dto.js.map