import { Module } from '@nestjs/common';

import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { OllamaProvider } from './providers/ollama.provider';

import { DocumentsModule } from '../documents/documents.module';

@Module({
  imports: [DocumentsModule],
  controllers: [AiController],
  providers: [AiService, OllamaProvider],
})
export class AiModule {}