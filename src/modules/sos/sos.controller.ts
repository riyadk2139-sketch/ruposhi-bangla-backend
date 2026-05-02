import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { SosService } from './sos.service';

@Controller('sos')
@UseGuards(JwtGuard)
export class SosController {
  constructor(private sosService: SosService) {}

  @Get('contacts')
  list(@Request() req) {
    return this.sosService.getContacts(req.user.id);
  }

  @Post('contacts')
  add(@Request() req, @Body() body: { name: string; phone: string; relation?: string }) {
    return this.sosService.addContact(req.user.id, body);
  }

  @Delete('contacts/:id')
  remove(@Request() req, @Param('id') id: string) {
    return this.sosService.removeContact(id, req.user.id);
  }
}
