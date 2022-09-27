import create from 'zustand' // create로 zustand를 불러옵니다.
import { persist } from "zustand/middleware";

export const useSelectContentStore = create(
    persist(
      (set) => ({
        style: [],
        setStyle: (select) => {
          set((state) => ({ ...state, style: select }));
        },
  
        background: [],
        setBackground: (select) => {
          set((state) => ({ ...state, background: select }));
        },
      }),
      { name: "SelectContent-store" }
    )
  );