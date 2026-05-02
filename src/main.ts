import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const isProd = process.env.NODE_ENV === 'production';

  // Fail fast if required production env vars are missing or still default
  if (isProd) {
    const missing: string[] = [];
    if (!process.env.DATABASE_URL) missing.push('DATABASE_URL');
    if (!process.env.JWT_SECRET)   missing.push('JWT_SECRET');
    if (missing.length) throw new Error(`Missing required env vars: ${missing.join(', ')}`);

    if (process.env.JWT_SECRET === 'ruposhi_bangla_jwt_secret_2026') {
      throw new Error('JWT_SECRET must be changed from the default value before deploying to production.');
    }
  }

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
      : '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Ruposhi Bangla API → http://localhost:${port}/api  [${isProd ? 'production' : 'development'}]`);
}

bootstrap();
