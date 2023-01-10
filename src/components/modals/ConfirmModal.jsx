import React from "react";
import ModalContainer from "./ModalContainer";
import { ImSpinner3 } from "react-icons/im";

export default function ConfirmModal({
  visible,
  busy,
  title,
  subtitle,
  onConfirm,
  onClose,
}) {
  const commonClass = "px-3 py-1 rounded drop-shadow transition ";
  
  return (
    <ModalContainer
      visible={visible}
      onClose={onClose}
      ignoreContainer
      containerId="confirm-modal"
    >
      <div className="relative dark:bg-secondary bg-zinc rounded p-4 space-y-2 h-1/5">
        <h1 className="dark:text-white text-primary font-semibold text-lg">{title}</h1>
        {subtitle && <p className="dark:text-light-fourth text-fourth text-sm">{subtitle}</p>}

        <div className="absolute flex items-center space-x-3 p-3 right-0 bottom-0">
          {busy ? (
            <p className="flex items-center space-x-2 text-primary dark:text-white">
              <ImSpinner3 className="animate-spin" />
              <span>Please wait</span>
            </p>
          ) : (
            <>
              <button
                onClick={onConfirm}
                type="button"
                className={commonClass + "dark:bg-highlight-dark bg-highlight-deep dark:text-secondary text-zinc dark:hover:bg-opacity-80 hover:bg-opacity-80"}
              >
                Yes
              </button>
              <button
                onClick={() => onClose()}
                type="button"
                className={commonClass + "dark:bg-tertiary bg-gray dark:text-white text-primary hover:dark:bg-fourth hover:bg-light-fourth dark:hover:bg-opacity-70 hover:bg-opacity-70"}
              >
                No
              </button>
            </>
          )}
        </div>
      </div>
    </ModalContainer>
  );
}
