"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollabModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const collab_group_entity_1 = require("../../entities/collab-group.entity");
const collab_member_entity_1 = require("../../entities/collab-member.entity");
const collab_expense_entity_1 = require("../../entities/collab-expense.entity");
const collab_poll_entity_1 = require("../../entities/collab-poll.entity");
const collab_service_1 = require("./collab.service");
const collab_controller_1 = require("./collab.controller");
let CollabModule = class CollabModule {
};
exports.CollabModule = CollabModule;
exports.CollabModule = CollabModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([collab_group_entity_1.CollabGroup, collab_member_entity_1.CollabMember, collab_expense_entity_1.CollabExpense, collab_poll_entity_1.CollabPoll])],
        providers: [collab_service_1.CollabService],
        controllers: [collab_controller_1.CollabController],
    })
], CollabModule);
//# sourceMappingURL=collab.module.js.map