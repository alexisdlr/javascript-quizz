import { create } from "zustand";
interface State {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useModalStore = create<State>()((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
