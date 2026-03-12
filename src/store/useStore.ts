import { create } from 'zustand';
import { DataStructure } from '../types/prayer';

interface AppState {
  currentPage: 'weekly' | 'novena';
  currentLibraryItemId: string;
  currentDayIndex: number;
  
  // Actions
  setCurrentPage: (page: 'weekly' | 'novena', data: DataStructure) => void;
  setCurrentLibraryItemId: (itemId: string, data: DataStructure) => void;
  setCurrentDayIndex: (dayIndex: number) => void;
  resetHome: () => void;
  resetToToday: (currentLibraryItemType?: 'weekly' | 'novena') => void;
}

export const useStore = create<AppState>((set) => ({
  currentPage: 'weekly',
  currentLibraryItemId: '',
  currentDayIndex: new Date().getDay(),

  setCurrentPage: (page, data) => {
    set({ currentPage: page });
    if (page === 'weekly') {
      const initialItems = data.library.filter(item => item.type === 'weekly') || [];
      if (initialItems.length > 0) {
        set({ 
          currentLibraryItemId: initialItems[0].id,
          currentDayIndex: new Date().getDay()
        });
      } else {
        set({ currentLibraryItemId: '' });
      }
    } else {
      set({ currentLibraryItemId: '' });
    }
  },

  setCurrentLibraryItemId: (itemId, data) => {
    if (!itemId) return;
    set({ currentLibraryItemId: itemId });
    const item = data.library.find(c => c.id === itemId);
    if (item?.type === 'novena') {
      set({ currentDayIndex: 1 });
    } else {
      set({ currentDayIndex: new Date().getDay() });
    }
  },

  setCurrentDayIndex: (dayIndex) => set({ currentDayIndex: dayIndex }),
  
  resetHome: () => set({ currentLibraryItemId: '' }),

  resetToToday: (currentLibraryItemType) => {
    if (currentLibraryItemType === 'novena') {
      set({ currentDayIndex: 1 });
    } else {
      set({ currentDayIndex: new Date().getDay() });
    }
  },
}));
