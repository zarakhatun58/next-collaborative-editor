export interface CreateDocumentInput {
  title: string;
  content?: unknown;
}

export interface UpdateDocumentInput {
  title?: string;
  content?: unknown;
  status?: "ACTIVE" | "ARCHIVED" | "DELETED";
}