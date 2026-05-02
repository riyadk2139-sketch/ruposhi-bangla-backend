import { IsString, IsNumber, IsOptional, IsArray, Min } from 'class-validator';

export class CreateCollabGroupDto {
  @IsString()
  title: string;
}

export class JoinGroupDto {
  @IsString()
  inviteCode: string;
}

export class CreateCollabExpenseDto {
  @IsString()
  label: string;

  @IsNumber() @Min(0)
  amount: number;

  @IsOptional() @IsString()
  category?: string;

  @IsOptional() @IsArray()
  splitWith?: string[];

  @IsOptional() @IsString()
  date?: string;
}

export class CreatePollDto {
  @IsString()
  question: string;

  @IsArray()
  options: string[];
}

export class VoteDto {
  @IsString()
  option: string;
}
