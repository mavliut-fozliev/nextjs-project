import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface StoreState {
  test: string;
  setTest: (test: string) => void;
}

export const usePageStore = create<StoreState>()(
  persist(
    (set) => ({
      test: "",
      setTest: (test) => set({ test }),
    }),
    {
      name: "storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
