import { create } from "zustand";

interface AppState {
  isDrawerOpen: boolean;
  drawerContent: React.ReactNode | null;
  openDrawer: (content?: React.ReactNode) => void;
  closeDrawer: () => void;

  activeView: string;
  setActiveView: (view: string) => void;
}

export const useDemoAppStore = create<AppState>((set) => ({
  isDrawerOpen: false,
  drawerContent: null,
  openDrawer: (content = null) =>
    set({ isDrawerOpen: true, drawerContent: content }),
  closeDrawer: () => set({ isDrawerOpen: false, drawerContent: null }),

  activeView: "datagrid",
  setActiveView: (view: string) => set({ activeView: view }),
}));
