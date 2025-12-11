import { createContext, type ReactNode } from "react";

export type ModalContextType = {
  openPopup: (content: ReactNode) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);
