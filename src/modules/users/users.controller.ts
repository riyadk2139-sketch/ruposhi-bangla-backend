import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getMe(@Request() req) {
    const { password, ...user } = req.user;
    return user;
  }

  @Patch('me')
  updateMe(@Request() req, @Body() body: { name?: string; phone?: string }) {
    return this.usersService.updateProfile(req.user.id, body);
  }
}
