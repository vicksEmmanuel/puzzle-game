import create from "zustand";
import { combine } from "zustand/middleware";
import { persist } from ".";

const defaultState = {
  gameIds: [],
};

export const useGeneralState = create(
  persist(
    {
      key: "general",
    },
    combine(defaultState, (set) => ({
      setGameIds: (id: string) =>
        set((state: any) => {
          const temp = state.gameIds;

          temp.push(id);

          return {
            ...state,
            gameIds: [...temp],
          };
        }),

      removeGameId: (id: string) =>
        set((state: any) => {
          const temp = state.gameIds;
          const newTemp = temp.filter((i: string) => i !== id);
          return {
            ...state,
            gameIds: [...newTemp],
          };
        }),
    }))
  )
);
