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
exports.SosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const emergency_contact_entity_1 = require("../../entities/emergency-contact.entity");
let SosService = class SosService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    getContacts(userId) {
        return this.repo.find({ where: { userId } });
    }
    addContact(userId, data) {
        const contact = this.repo.create({ ...data, userId });
        return this.repo.save(contact);
    }
    async removeContact(id, userId) {
        await this.repo.delete({ id, userId });
        return { deleted: true };
    }
};
exports.SosService = SosService;
exports.SosService = SosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(emergency_contact_entity_1.EmergencyContact)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SosService);
//# sourceMappingURL=sos.service.js.map