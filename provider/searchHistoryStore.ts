import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SearchHistoryState = {
    searchHistory: string[];
    addSearchHistory: (city: string) => void;
}

export const useSearchHistoryStore = create(persist<SearchHistoryState>((set) => ({
    searchHistory: [],
    addSearchHistory: (city: string) => set((state) => ({ searchHistory: [...new Set([city, ...state.searchHistory])].slice(0, 5) }))
}), {
    name: 'search-history-storage',
    storage: createJSONStorage(() => AsyncStorage),
}))