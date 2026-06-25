import Dexie, { Table } from "dexie";

export interface LocalDocument {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
  synced: boolean;
}

export interface SyncOperation {
  id?: number;
  documentId: string;
  type: "CREATE" | "UPDATE" | "DELETE";
  payload: any;
  timestamp: number;
}


class EditorDatabase extends Dexie {
  documents!: Table<LocalDocument, string>;
  syncQueue!: Table<SyncOperation, number>;

  constructor() {
    super("CollaborativeEditorDB");

    this.version(1).stores({
      documents: "id, updatedAt",
      syncQueue: "++id, documentId, timestamp",
    });
  }
}
export const db = new EditorDatabase();