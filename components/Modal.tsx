import React, { ReactNode } from "react";
import { Close } from "@mui/icons-material";




interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
}

function Modal({ onClose, isOpen, children }: ModalProps) {
  return (
    <div>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-90 z-40 backdrop-blur-sm " ></div>}
      <div
        className={`fixed top-0 right-0 md:right-0 h-full w-[320px] md:w-[450px] bg-white text-white transition duration-700 ease-in-out transform z-50 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <aside className="h-full overflow-y-auto">
          <main className="bg-white p-4 text-black">
            <button
              className="absolute top-0 right-0 m-4 p-2 rounded-lg text-black font-bold bg-white hover:text-red-800"
              onClick={onClose}
            >
              <Close/>
            </button>
            {children}
          </main>
        </aside>
      </div>
    </div>
  );
}

export default Modal;