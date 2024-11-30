import { Content } from "@google/generative-ai";

const STORAGE_KEY = "interview_history";

export const getInterviewHistory = (): Content[] => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveInterviewHistory = (history: Content[]) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const clearInterviewHistory = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
};
