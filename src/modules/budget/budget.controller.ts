import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { BudgetService } from './budget.service';
import { CreateExpenseDto } from './dto/expense.dto';

@Controller('trips/:tripId/expenses')
@UseGuards(JwtGuard)
export class BudgetController {
  constructor(private budgetService: BudgetService) {}

  @Post()
  add(@Request() req, @Param('tripId') tripId: string, @Body() dto: CreateExpenseDto) {
    return this.budgetService.addExpense(tripId, req.user.id, dto);
  }

  @Get()
  list(@Request() req, @Param('tripId') tripId: string) {
    return this.budgetService.getExpenses(tripId, req.user.id);
  }

  @Get('summary')
  summary(@Request() req, @Param('tripId') tripId: string) {
    return this.budgetService.getSummary(tripId, req.user.id);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.budgetService.deleteExpense(id, req.user.id);
  }
}
