import React, { useState } from "react";
import { createActor } from "../../api/person";
import { useNotification } from "../../hooks";
import ModalContainer from "../modals/ModalContainer";
import ActorForm from "./ActorForm";

export default function ActorUpload({ visible, onClose }) {
  const [busy, setBusy] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error } = await createActor(data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", "Actor created");
    onClose();
  };

  return (
    <ModalContainer
      visible={visible}
      onClose={onClose}
      ignoreContainer
      containerId="actor-container"
    >
      <ActorForm
        title="Create new actor"
        btnTitle="Create"
        busy={busy}
        onSubmit={busy ? null : handleSubmit}
      />
    </ModalContainer>
  );
}
