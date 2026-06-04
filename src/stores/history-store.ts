"use client";

import { create } from "zustand";

export interface HistoryEntry {
  id: number;
  studentName: string;
  gradeLevel: string;
  grade: string;
  subject: string;
  teachingContent: string;
  errorAnalysis: string;
  keywords: string[];
  assessments: Record<string, string>;
  result: string;
  createdAt: string;
}

interface HistoryStore {
  entries: HistoryEntry[];
  setEntries: (entries: HistoryEntry[]) => void;
  addEntry: (entry: HistoryEntry) => void;
  removeEntry: (id: number) => void;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  entries: [],
  setEntries: (entries) => set({ entries }),
  addEntry: (entry) =>
    set((state) => ({ entries: [entry, ...state.entries] })),
  removeEntry: (id) =>
    set((state) => ({
      entries: state.entries.filter((e) => e.id !== id),
    })),
}));
