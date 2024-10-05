import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface StoreState {
  name: string;
  setName: (test: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      name: "",
      setName: (name) => set({ name }),
    }),
    {
      name: "storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
