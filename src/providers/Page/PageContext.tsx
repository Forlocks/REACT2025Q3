import { createContext } from "react";

interface PageContextValue {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const PageContext = createContext<PageContextValue>({
  currentPage: 1,
  setCurrentPage: () => {},
});
