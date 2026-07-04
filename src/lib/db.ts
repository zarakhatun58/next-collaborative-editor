import Dexie, { Table } from "dexie";

export interface LocalDocument {
  id: string;
  title: string;
  content: any;
  version: number;
  updatedAt: number;
  synced: boolean;
}

export interface QueueItem {
  id?: number;
  documentId: string;
  operation:
  | "CREATE"
  | "UPDATE"
  | "DELETE";
  payload: {
    title: string;
    content: string;
  };
  baseVersion: number;
  clientVersion: number;
  retryCount: number;
  synced: boolean;
  createdAt: number;
}

class LocalDatabase extends Dexie {
  documents!: Table<LocalDocument, string>;
  syncQueue!: Table<QueueItem, number>;
  constructor() {
    super("CollaborativeEditorDB");
    this.version(2).stores({
      documents: "id,version,updatedAt,synced",
      syncQueue:
        "++id,documentId,synced,createdAt,retryCount",
    });
  }
}

export const db = new LocalDatabase();