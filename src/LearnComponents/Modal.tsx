import { useEffect, useId } from "react";

type ModalProps = {
  isOpen: boolean;
  onModalClose: () => void;
  modalTitle?: string;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onModalClose, children, modalTitle }: ModalProps) => {
  const autoId = useId();
  const titleId = `${autoId}-title`;
  const descriptionId = `${autoId}-description`;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onModalClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onModalClose]);

  return (
    <div
      onClick={onModalClose}
      className={`fixed inset-0 flex justify-center items-center ${isOpen ? "visible bg-gray-700/50" : "invisible"}`}
    >
      {/* Modal itself */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        inert={!isOpen}
        onClick={(e) => e.stopPropagation()}
        className={`w-100 h-auto border p-8 bg-black transition-all duration-400 ${isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        {/* Modal header */}
        <div className="flex justify-between items-center">
          <div>BRAND LOGO</div>
          <button
            onClick={onModalClose}
            aria-label="close modal"
            className="hover:bg-gray-700/50 p-2"
          >
            &times;
          </button>
        </div>
        {/* Modal content */}
        <div>
          {modalTitle && <h2 id={titleId}>{modalTitle}</h2>}
          <div id={descriptionId}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
