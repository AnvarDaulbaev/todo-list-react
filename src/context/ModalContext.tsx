'use client';

import React from "react";
import { TodoListProps } from "@/components/TodoList";

type ModalState =
  | { type: "create" }
  | { type: "view"; todo: TodoListProps }
  | { type: "edit"; todo: TodoListProps }
  | { type: "delete"; todo: TodoListProps; onDelete: () => void }
  | null;

interface ModalContextType {
  openModal: (modal: ModalState) => void;
  closeModal: () => void;
  modal: ModalState;
};

const ModalContext = React.createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [modal, setModal] = React.useState<ModalState>(null);

  const openModal = (modal: ModalState) => setModal(modal);
  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const contex = React.useContext(ModalContext);
  if (!contex) {
    throw new Error("useModal must be used within ModalProvider");
  };

  return contex;
}
