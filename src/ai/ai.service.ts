import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OllamaProvider } from './providers/ollama.provider';
import { MEMORIA_SYSTEM_PROMPT } from './prompts/memoria-system.prompt';

@Injectable()
export class AiService {
  constructor(
    private readonly ollama: OllamaProvider,
    private readonly prisma: PrismaService,
  ) {}

  async query(question: string, entityId?: string, language = 'en') {
    const entities = await this.prisma.historicalEntity.findMany({
      where: entityId ? { id: entityId } : {},
    });

    if (!entities.length) {
      return {
        sender: 'ai',
        text: 'No historical information found.',
        citations: [],
        relatedIds: [],
        isUnverified: true,
      };
    }

    const historicalContext = entities.map(item => `
      Name: ${item.name}
      Category: ${item.category}
      Years: ${item.years ?? ''}
      Biography: ${item.fullBio ?? item.shortBio ?? ''}
      Artistic details: ${item.artisticDetails ?? ''}
      Importance: ${item.importance ?? ''}
      Sources: ${JSON.stringify(item.sources)}
    `).join('\n');

    const prompt = `
      ${MEMORIA_SYSTEM_PROMPT}

      LANGUAGE: ${language}

      HISTORICAL CONTEXT:
      ${historicalContext}

      USER QUESTION:
      ${question}

      Answer using only the historical context provided.
      Do not invent historical facts or citations.
    `;

    const answer = await this.ollama.generateResponse(prompt);

    return {
      sender: 'ai',
      text: answer,
      citations: entities.flatMap(item =>
        Array.isArray(item.sources) ? item.sources : [],
      ),
      relatedIds: entities.map(item => item.id),
      isUnverified: false,
    };
  }
}