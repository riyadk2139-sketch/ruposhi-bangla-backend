import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  label: string;

  @IsString()
  category: string;

  @IsNumber() @Min(0)
  amount: number;

  @IsOptional() @IsString()
  type?: string;

  @IsOptional() @IsString()
  date?: string;
}
