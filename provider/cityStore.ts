import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CityStoreState = {
    cities: string[];
    addCity: (city: string) => void;
    removeCity: (city: string) => void;
    clearCity: () => void;
}

export const useCityStore = create(persist<CityStoreState>((set) => ({
    cities: ['Kuala Lumpur'],
    addCity: (city: string) => set((state) => ({ cities: [...new Set([city, ...state.cities])] })),
    removeCity: (city: string) => set((state) => ({ cities: state.cities.filter((c) => c !== city) })),
    clearCity: () => set({ cities: [] }),
}), {
    name: 'cities-storage',
    storage: createJSONStorage(() => AsyncStorage),
}))
