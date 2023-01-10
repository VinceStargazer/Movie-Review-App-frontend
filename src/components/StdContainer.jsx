import React from "react";

export default function StdContainer({ children }) {
  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      {children}
    </div>
  );
}
