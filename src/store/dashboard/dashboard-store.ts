import { create } from "zustand";

interface DashboardStore {
    isActive: boolean;

    closeMenu: () => void;
    showMenu: () => void;
}

const useDashboardStore = create<DashboardStore>((set) => ({
    isActive: false,
    closeMenu: () => set({isActive: false}),
    showMenu: () => set({isActive: true}),
}));

export { useDashboardStore };