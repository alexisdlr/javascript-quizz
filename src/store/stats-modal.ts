import { create } from "zustand";
import { persist } from "zustand/middleware";
interface State {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useStatisticsStore = create<State>()(persist((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}), {name: 'modal-statistics'}));
