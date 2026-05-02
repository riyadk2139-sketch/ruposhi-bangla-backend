"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const trips_module_1 = require("./modules/trips/trips.module");
const budget_module_1 = require("./modules/budget/budget.module");
const sos_module_1 = require("./modules/sos/sos.module");
const collab_module_1 = require("./modules/collab/collab.module");
const user_entity_1 = require("./entities/user.entity");
const trip_entity_1 = require("./entities/trip.entity");
const expense_entity_1 = require("./entities/expense.entity");
const emergency_contact_entity_1 = require("./entities/emergency-contact.entity");
const collab_group_entity_1 = require("./entities/collab-group.entity");
const collab_member_entity_1 = require("./entities/collab-member.entity");
const collab_expense_entity_1 = require("./entities/collab-expense.entity");
const collab_poll_entity_1 = require("./entities/collab-poll.entity");
const ENTITIES = [
    user_entity_1.User, trip_entity_1.Trip, expense_entity_1.Expense, emergency_contact_entity_1.EmergencyContact,
    collab_group_entity_1.CollabGroup, collab_member_entity_1.CollabMember, collab_expense_entity_1.CollabExpense, collab_poll_entity_1.CollabPoll,
];
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (cfg) => {
                    const isProd = cfg.get('NODE_ENV') === 'production';
                    if (isProd) {
                        return {
                            type: 'postgres',
                            url: cfg.get('DATABASE_URL'),
                            entities: ENTITIES,
                            synchronize: false,
                            migrationsRun: cfg.get('RUN_MIGRATIONS') === 'true',
                            migrations: ['dist/migrations/*.js'],
                            ssl: cfg.get('DB_SSL') === 'true'
                                ? { rejectUnauthorized: false }
                                : false,
                        };
                    }
                    return {
                        type: 'better-sqlite3',
                        database: cfg.get('DB_PATH') || 'ruposhi.sqlite',
                        entities: ENTITIES,
                        synchronize: true,
                    };
                },
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            trips_module_1.TripsModule,
            budget_module_1.BudgetModule,
            sos_module_1.SosModule,
            collab_module_1.CollabModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map