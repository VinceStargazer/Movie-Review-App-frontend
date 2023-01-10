import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import ModalContainer from "./ModalContainer";

export default function WritersModal({
  profiles = [],
  visible,
  onClose,
  onRemove,
}) {
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer containerId="writers-container">
      <div className="space-y-2 dark:bg-primary bg-white rounded max-w-[50rem] max-h-[40rem] overflow-auto p-2 custom-scroll-bar">
        {profiles.map(({ id, name, avatar }) => {
          return (
            <div key={id} className="flex space-x-3 dark:bg-secondary bg-zinc rounded drop-shadow-md">
              <img
                src={avatar}
                alt={name}
                className="w-24 h-24 rounded object-cover aspect-square"
              />
              <p className="dark:text-white text-primary font-semibold w-full">
                {name}
              </p>
              <button
                onClick={() => onRemove(id)}
                className="dark:text-white text-primary hover:opacity-80 transition p-2"
              >
                <AiOutlineClose />
              </button>
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
}
