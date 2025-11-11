import { create } from 'zustand';

export const useLanguageStore = create((set) => ({
  language: localStorage.getItem('language') || 'en', // Initialize from localStorage
  setLanguage: (newLanguage) => {
    set({ language: newLanguage });
    localStorage.setItem('language', newLanguage); // Persist language preference
  },
}));