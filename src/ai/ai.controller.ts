import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AiService } from './ai.service';
import { QueryAiDto } from './dto/query-ai.dto';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('query')
  @ApiOperation({
    summary: 'Ask MEMORIA AI about historical heritage',
  })
  async query(@Body() dto: QueryAiDto) {
    return this.aiService.query(
      dto.question,
      dto.entityId,
      dto.language,
    );
  }
}