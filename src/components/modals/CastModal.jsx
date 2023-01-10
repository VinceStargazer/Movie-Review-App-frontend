import React from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import ModalContainer from "./ModalContainer";

export default function CastModal({ cast = [], visible, onClose, onRemove }) {
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer containerId="cast-container">
      <div className="space-y-2 dark:bg-primary bg-white rounded max-w-[50rem] max-h-[40rem] overflow-auto p-2 custom-scroll-bar">
        {cast.map(({ profile, roleAs, leadActor }) => {
          const { id, name, avatar } = profile;
          return (
            <div key={id} className="flex space-x-3 dark:bg-secondary bg-zinc rounded drop-shadow-md">
              <img
                src={avatar}
                alt={name}
                className="w-24 h-24 rounded object-cover aspect-square"
              />

              <div className="flex flex-col w-full justify-between">
                <div>
                  <p className="dark:text-white text-primary font-semibold">
                    {name}
                  </p>
                  <p className="text-sm dark:text-dark-subtle text-light-subtle">
                    {roleAs}
                  </p>
                </div>

                {leadActor && (
                  <AiOutlineCheck className="dark:text-dark-subtle text-light-subtle" />
                )}
              </div>

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
