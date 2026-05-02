import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { TripsService } from './trips.service';
import { CreateTripDto, UpdateTripDto } from './dto/trip.dto';

@Controller('trips')
@UseGuards(JwtGuard)
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateTripDto) {
    return this.tripsService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Request() req) {
    return this.tripsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.tripsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateTripDto) {
    return this.tripsService.update(id, req.user.id, dto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.tripsService.remove(id, req.user.id);
  }
}
