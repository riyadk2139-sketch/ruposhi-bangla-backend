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
exports.CollabController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const collab_service_1 = require("./collab.service");
const collab_dto_1 = require("./dto/collab.dto");
let CollabController = class CollabController {
    collabService;
    constructor(collabService) {
        this.collabService = collabService;
    }
    create(req, dto) {
        return this.collabService.create(req.user.sub, dto);
    }
    findAll(req) {
        return this.collabService.findAllForUser(req.user.sub);
    }
    findOne(req, id) {
        return this.collabService.findOne(id, req.user.sub);
    }
    join(req, dto) {
        return this.collabService.join(req.user.sub, dto);
    }
    addExpense(req, id, dto) {
        return this.collabService.addExpense(id, req.user.sub, dto);
    }
    createPoll(req, id, dto) {
        return this.collabService.createPoll(id, req.user.sub, dto);
    }
    vote(req, id, pollId, dto) {
        return this.collabService.vote(id, pollId, req.user.sub, dto);
    }
};
exports.CollabController = CollabController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, collab_dto_1.CreateCollabGroupDto]),
    __metadata("design:returntype", void 0)
], CollabController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CollabController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CollabController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('join'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, collab_dto_1.JoinGroupDto]),
    __metadata("design:returntype", void 0)
], CollabController.prototype, "join", null);
__decorate([
    (0, common_1.Post)(':id/expenses'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, collab_dto_1.CreateCollabExpenseDto]),
    __metadata("design:returntype", void 0)
], CollabController.prototype, "addExpense", null);
__decorate([
    (0, common_1.Post)(':id/polls'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, collab_dto_1.CreatePollDto]),
    __metadata("design:returntype", void 0)
], CollabController.prototype, "createPoll", null);
__decorate([
    (0, common_1.Post)(':id/polls/:pollId/vote'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Param)('pollId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, collab_dto_1.VoteDto]),
    __metadata("design:returntype", void 0)
], CollabController.prototype, "vote", null);
exports.CollabController = CollabController = __decorate([
    (0, common_1.Controller)('collab'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [collab_service_1.CollabService])
], CollabController);
//# sourceMappingURL=collab.controller.js.map