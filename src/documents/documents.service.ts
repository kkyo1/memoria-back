import { Injectable } from '@nestjs/common';
import { DocumentContext } from './interfaces/document-context.interface';

@Injectable()
export class DocumentsService {
  async searchSimilar(
    question: string,
    entityId?: string,
    limit = 5,
  ): Promise<DocumentContext[]> {
    return [];
  }
}