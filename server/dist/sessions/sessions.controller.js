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
exports.SessionsController = void 0;
const common_1 = require("@nestjs/common");
const sessions_service_1 = require("./sessions.service");
const create_session_dto_1 = require("./dto/create-session.dto");
const update_session_dto_1 = require("./dto/update-session.dto");
let SessionsController = class SessionsController {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    create(sessionDto) {
        return this.sessionService.addSession(sessionDto);
    }
    async updateSessionInfo(sessionDto) {
        return this.sessionService.updateSessionInfo(sessionDto);
    }
    deleteCinema(req) {
        return this.sessionService.deleteSession(req.body.id);
    }
    getAll() {
        return this.sessionService.getAllSessions();
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_session_dto_1.CreateSessionDto]),
    __metadata("design:returntype", void 0)
], SessionsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_session_dto_1.UpdateSessionDto]),
    __metadata("design:returntype", Promise)
], SessionsController.prototype, "updateSessionInfo", null);
__decorate([
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SessionsController.prototype, "deleteCinema", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SessionsController.prototype, "getAll", null);
SessionsController = __decorate([
    (0, common_1.Controller)('sessions'),
    __metadata("design:paramtypes", [sessions_service_1.SessionsService])
], SessionsController);
exports.SessionsController = SessionsController;
//# sourceMappingURL=sessions.controller.js.map