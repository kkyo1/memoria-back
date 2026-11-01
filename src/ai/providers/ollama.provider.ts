import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OllamaProvider {
  private readonly baseUrl: string;
  private readonly model: string;
  private readonly embeddingModel: string;

  constructor(private config: ConfigService) {
    this.baseUrl = this.config.get<string>(
      'OLLAMA_URL',
      'http://localhost:11434',
    );

    this.model = this.config.get<string>(
      'OLLAMA_MODEL',
      'gemma4:e2b',
    );

    this.embeddingModel = this.config.get<string>(
      'OLLAMA_EMBEDDING_MODEL',
      'embeddinggemma',
    );
  }

  async generateEmbedding(text: string): Promise<number[]> {
    const response = await fetch(`${this.baseUrl}/api/embed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.embeddingModel,
        input: text,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate embedding');
    }

    const data = await response.json();

    return data.embeddings[0];
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        stream: false,
        messages: [
          {
            role: 'system',
            content: `You are MEMORIA AI, a historical heritage assistant.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate AI response');
    }

    const data = await response.json();

    return data.message.content;
  }
}