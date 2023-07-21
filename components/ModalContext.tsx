// ModalContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isLoginModalOpen: boolean;
  isSignUpModalOpen: boolean;
  openLoginModal: () => void;
  openSignUpModal: () => void;
  closeModals: () => void;
}

interface Props {
    children: ReactNode;
  }

const ModalContext = createContext<ModalContextType>({
  isLoginModalOpen: false,
  isSignUpModalOpen: false,
  openLoginModal: () => {},
  openSignUpModal: () => {},
  closeModals: () => {},
});

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ isLoginModalOpen, isSignUpModalOpen, openLoginModal, openSignUpModal, closeModals }}
    >
      {children}
    </ModalContext.Provider>
  );
};
