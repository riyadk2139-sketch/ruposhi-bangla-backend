import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateTripDto {
  @IsString()
  title: string;

  @IsString()
  destination: string;

  @IsOptional() @IsString()
  division?: string;

  @IsOptional() @IsString()
  travelStyle?: string;

  @IsOptional() @IsNumber()
  @Min(1)
  days?: number;

  @IsOptional() @IsString()
  dateFrom?: string;

  @IsOptional() @IsString()
  dateTo?: string;

  @IsOptional() @IsNumber()
  estimatedBudget?: number;
}

export class UpdateTripDto {
  @IsOptional() @IsString()
  title?: string;

  @IsOptional() @IsString()
  status?: string;

  @IsOptional() @IsNumber()
  actualBudget?: number;

  @IsOptional()
  itinerary?: any;
}
