import { create } from "zustand";

interface MenuStore {
    menuWomenState: boolean;
    menuMenState: boolean;
    closeMenuWomen: () => void;
    showMenuWomen: () => void;
    closeMenuMen: () => void;
    showMenuMen: () => void;
}

const useMenuStore = create<MenuStore>((set) => ({
    menuWomenState: false,
    menuMenState: false,
    closeMenuWomen: () => set({menuWomenState: false}),
    showMenuWomen: () => set({menuWomenState: true}),
    closeMenuMen: () => set({menuMenState: false}),
    showMenuMen: () => set({menuMenState: true}),
}));

export { useMenuStore };