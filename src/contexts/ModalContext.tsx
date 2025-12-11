import { createContext, type ReactNode } from "react";

export type ModalContextType = {
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
  setContent: React.Dispatch<React.SetStateAction<ReactNode>>;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);
