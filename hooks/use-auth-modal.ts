
import { create } from "zustand";

type ModalType = "login" | "signup" | null;

interface AuthModalState {
  type: ModalType;
  isOpen: boolean;
  open: (type: ModalType) => void;
  close: () => void;
}

export const useModal = create<AuthModalState>((set) => ({
  type: null,
  isOpen: false,
  open: (type) => set({ isOpen: true, type }),
  close: () => set({ isOpen: false, type: null }),
}));
