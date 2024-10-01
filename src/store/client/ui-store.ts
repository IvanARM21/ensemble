import { create } from "zustand";

interface UiStore {
    isActive: boolean;

    closeMenu: () => void;
    showMenu: () => void;
}

const useUiStore = create<UiStore>((set) => ({
    isActive: false,
    closeMenu: () => set({isActive: false}),
    showMenu: () => set({isActive: true}),
}));

export { useUiStore };