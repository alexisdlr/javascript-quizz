import { create } from "zustand";
interface State {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useStatisticsStore = create<State>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
