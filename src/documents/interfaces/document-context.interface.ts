export interface DocumentContext {
  id: string;
  documentTitle: string;
  author: string | null;
  page: number | null;
  content: string;
  entityId: string | null;
  similarity?: number;
}