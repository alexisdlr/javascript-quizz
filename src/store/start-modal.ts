import { create } from "zustand";
import { persist } from "zustand/middleware";
interface State {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useModalStore = create<State>()(persist((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}), {name: 'modal'}));
