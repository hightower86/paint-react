//Modal.tsx
import React from "react";
import cn from "classnames";

type Props = {
  children: React.ReactNode;
  open: boolean;
};

const Modal = ({ children, open }: Props) => {
  const modalClass = cn({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": open,
  });
  return (
    // we add modal-bottom and modal-middle classes to make it responsive
    //add modal-open for now to test the modal
    <div className={modalClass}>
      {/* we want any content for this modal layout so we just pass the children */}
      <div className="modal-box bg-gray-100">{children}</div>
    </div>
  );
};

export default Modal;
