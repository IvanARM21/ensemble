import { create } from "zustand";

interface ModalDeleteStore {
  id: string;
  title: string;
  message: string;
  modalState: boolean;
  callback: (id: string) => Promise<{
    error: boolean;
    message: string;
  }> | null;

  closeModal: () => void;
  showModal: (id: string, title: string, message: string, callback: (id: string) => Promise<{
    error: boolean;
    message: string;
  }>) => void;

  reset: () => void;
}

const initialModalDelete = {
  id: "",
  title: "",
  message: "",
  modalState: false
}

const useModalDeleteStore = create<ModalDeleteStore>((set) => ({
  ...initialModalDelete,

  callback: () => null,
  closeModal: () => set({ modalState: false, callback: () => null }),
  showModal: (id, title, message, callback) => set({ modalState: true, id, callback, message, title }),

  reset: () => set(initialModalDelete)
}));

export { useModalDeleteStore };
