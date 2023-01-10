import React from "react";

export default function ModalContainer({
  containerId,
  visible,
  children,
  onClose,
  ignoreContainer
}) {
  const handleMouseDown = (e) => {
    if (e.target.id === containerId) onClose();
  };

  const renderChildren = () => {
    if (ignoreContainer) return children;
    return (
      <div className="dark:bg-primary bg-white rounded w-[50rem] h-[42rem] overflow-auto p-2 custom-scroll-bar">
        {children}
      </div>
    );
  };

  if (!visible) return null;
  return (
    <div
      id={containerId}
      onMouseDown={handleMouseDown}
      className="fixed inset-0 bg-white dark:bg-primary bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-10"
    >
      {renderChildren()}
    </div>
  );
}
