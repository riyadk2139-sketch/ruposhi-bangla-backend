import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    return { status: 'ok', app: 'ruposhi-bangla-api' };
  }

  @Get('health')
  health() {
    return { status: 'ok' };
  }
}
