"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const isProd = process.env.NODE_ENV === 'production';
    if (isProd) {
        const missing = [];
        if (!process.env.DATABASE_URL)
            missing.push('DATABASE_URL');
        if (!process.env.JWT_SECRET)
            missing.push('JWT_SECRET');
        if (missing.length)
            throw new Error(`Missing required env vars: ${missing.join(', ')}`);
        if (process.env.JWT_SECRET === 'ruposhi_bangla_jwt_secret_2026') {
            throw new Error('JWT_SECRET must be changed from the default value before deploying to production.');
        }
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: process.env.ALLOWED_ORIGINS
            ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
            : '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Ruposhi Bangla API → http://localhost:${port}/api  [${isProd ? 'production' : 'development'}]`);
}
bootstrap();
//# sourceMappingURL=main.js.map