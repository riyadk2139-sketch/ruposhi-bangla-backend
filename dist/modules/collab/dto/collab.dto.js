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
exports.VoteDto = exports.CreatePollDto = exports.CreateCollabExpenseDto = exports.JoinGroupDto = exports.CreateCollabGroupDto = void 0;
const class_validator_1 = require("class-validator");
class CreateCollabGroupDto {
    title;
}
exports.CreateCollabGroupDto = CreateCollabGroupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCollabGroupDto.prototype, "title", void 0);
class JoinGroupDto {
    inviteCode;
}
exports.JoinGroupDto = JoinGroupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], JoinGroupDto.prototype, "inviteCode", void 0);
class CreateCollabExpenseDto {
    label;
    amount;
    category;
    splitWith;
    date;
}
exports.CreateCollabExpenseDto = CreateCollabExpenseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCollabExpenseDto.prototype, "label", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCollabExpenseDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCollabExpenseDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateCollabExpenseDto.prototype, "splitWith", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCollabExpenseDto.prototype, "date", void 0);
class CreatePollDto {
    question;
    options;
}
exports.CreatePollDto = CreatePollDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePollDto.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatePollDto.prototype, "options", void 0);
class VoteDto {
    option;
}
exports.VoteDto = VoteDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VoteDto.prototype, "option", void 0);
//# sourceMappingURL=collab.dto.js.map