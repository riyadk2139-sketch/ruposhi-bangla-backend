import {
  Controller, Get, Post, Put, Param, Body, UseGuards, Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CollabService } from './collab.service';
import {
  CreateCollabGroupDto, JoinGroupDto,
  CreateCollabExpenseDto, CreatePollDto, VoteDto, UpdateItineraryDto,
} from './dto/collab.dto';

@Controller('collab')
@UseGuards(AuthGuard('jwt'))
export class CollabController {
  constructor(private collabService: CollabService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateCollabGroupDto) {
    return this.collabService.create(req.user.sub, dto);
  }

  @Get()
  findAll(@Request() req) {
    return this.collabService.findAllForUser(req.user.sub);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.collabService.findOne(id, req.user.sub);
  }

  @Post('join')
  join(@Request() req, @Body() dto: JoinGroupDto) {
    return this.collabService.join(req.user.sub, dto);
  }

  @Post(':id/expenses')
  addExpense(@Request() req, @Param('id') id: string, @Body() dto: CreateCollabExpenseDto) {
    return this.collabService.addExpense(id, req.user.sub, dto);
  }

  @Post(':id/polls')
  createPoll(@Request() req, @Param('id') id: string, @Body() dto: CreatePollDto) {
    return this.collabService.createPoll(id, req.user.sub, dto);
  }

  @Post(':id/polls/:pollId/vote')
  vote(@Request() req, @Param('id') id: string, @Param('pollId') pollId: string, @Body() dto: VoteDto) {
    return this.collabService.vote(id, pollId, req.user.sub, dto);
  }

  @Put(':id/itinerary')
  updateItinerary(@Request() req, @Param('id') id: string, @Body() dto: UpdateItineraryDto) {
    return this.collabService.updateItinerary(id, req.user.sub, dto);
  }
}
