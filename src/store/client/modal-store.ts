import { create } from "zustand"

export type ProfileAction = "edit" | "add" | "default";
export type Field = "name" | "role" | "email" | "emailVerified" | "phone" | "createdAt" | "changePassword" | "";

interface ModalStore {
    profileAction: ProfileAction
    modalProfileState: boolean;
    profileField: Field
    showModalProfile: (action : ProfileAction, field: Field) => void;
    hiddenModalProfile: () => void;

    modalError: boolean;
    showError: () => void;
    hiddenError: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
    profileAction: "default",
    modalProfileState: false,
    profileField: "",
    modalError: false,

    showModalProfile: (action, field) => set({profileAction: action, modalProfileState: true, profileField: field}),
    hiddenModalProfile: () => set({modalProfileState: false}),

    showError: () => set({modalError: true}),
    hiddenError: () => set({modalError: false})
}));

export { useModalStore };