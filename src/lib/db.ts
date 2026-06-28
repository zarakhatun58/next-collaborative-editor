import Dexie, { Table } from "dexie";

export interface LocalDocument {
  id: string;
  title: string;
  content: any;
  updatedAt: number;
}

export interface SyncQueueItem {
  id?: number;

  documentId: string;

  operation:
    | "CREATE"
    | "UPDATE"
    | "DELETE";

  payload: any;

  createdAt: number;

  synced: boolean;
}

class LocalDatabase extends Dexie {
  documents!: Table<LocalDocument, string>;

  syncQueue!: Table<SyncQueueItem, number>;

  constructor() {
    super("CollaborativeEditorDB");

    this.version(1).stores({
      documents: "id,updatedAt",
      syncQueue:
        "++id,documentId,synced,createdAt",
    });
  }
}

export const db = new LocalDatabase();