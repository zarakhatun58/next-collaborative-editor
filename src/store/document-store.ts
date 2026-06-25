import { create } from "zustand";

interface DocumentState {
  currentDocumentId: string | null;
  setCurrentDocument: (id: string) => void;
}

export const useDocumentStore =
  create<DocumentState>((set) => ({
    currentDocumentId: null,

    setCurrentDocument: (id) =>
      set({
        currentDocumentId: id,
      }),
  }));