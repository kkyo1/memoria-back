import { IsOptional, IsString, MaxLength } from 'class-validator';

export class QueryAiDto {
  @IsString()
  @MaxLength(2000)
  question: string;

  @IsOptional()
  @IsString()
  entityId?: string;

  @IsOptional()
  @IsString()
  language?: string;
}