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
exports.CollabPoll = void 0;
const typeorm_1 = require("typeorm");
const collab_group_entity_1 = require("./collab-group.entity");
let CollabPoll = class CollabPoll {
    id;
    groupId;
    group;
    question;
    options;
    votes;
    createdById;
    createdAt;
};
exports.CollabPoll = CollabPoll;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CollabPoll.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CollabPoll.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => collab_group_entity_1.CollabGroup, (g) => g.polls, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'groupId' }),
    __metadata("design:type", collab_group_entity_1.CollabGroup)
], CollabPoll.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CollabPoll.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json' }),
    __metadata("design:type", Array)
], CollabPoll.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', default: '{}' }),
    __metadata("design:type", Object)
], CollabPoll.prototype, "votes", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CollabPoll.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CollabPoll.prototype, "createdAt", void 0);
exports.CollabPoll = CollabPoll = __decorate([
    (0, typeorm_1.Entity)('collab_polls')
], CollabPoll);
//# sourceMappingURL=collab-poll.entity.js.map