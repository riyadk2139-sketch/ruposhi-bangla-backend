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
exports.CollabGroup = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const collab_member_entity_1 = require("./collab-member.entity");
const collab_expense_entity_1 = require("./collab-expense.entity");
const collab_poll_entity_1 = require("./collab-poll.entity");
let CollabGroup = class CollabGroup {
    id;
    title;
    inviteCode;
    createdById;
    createdBy;
    members;
    expenses;
    polls;
    createdAt;
};
exports.CollabGroup = CollabGroup;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CollabGroup.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CollabGroup.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], CollabGroup.prototype, "inviteCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CollabGroup.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'createdById' }),
    __metadata("design:type", user_entity_1.User)
], CollabGroup.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => collab_member_entity_1.CollabMember, (m) => m.group, { cascade: true }),
    __metadata("design:type", Array)
], CollabGroup.prototype, "members", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => collab_expense_entity_1.CollabExpense, (e) => e.group, { cascade: true }),
    __metadata("design:type", Array)
], CollabGroup.prototype, "expenses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => collab_poll_entity_1.CollabPoll, (p) => p.group, { cascade: true }),
    __metadata("design:type", Array)
], CollabGroup.prototype, "polls", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CollabGroup.prototype, "createdAt", void 0);
exports.CollabGroup = CollabGroup = __decorate([
    (0, typeorm_1.Entity)('collab_groups')
], CollabGroup);
//# sourceMappingURL=collab-group.entity.js.map