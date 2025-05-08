"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  type: "login" | "signup" | null;
  openModal: (type: "login" | "signup") => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"login" | "signup" | null>(null);

  const openModal = (modalType: "login" | "signup") => {
    setIsOpen(true);
    setType(modalType);
  };

  const closeModal = () => {
    setIsOpen(false);
    setType(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, type, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
