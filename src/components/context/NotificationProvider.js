import React, { createContext, useState } from "react";

export const NotificationContext = createContext();
let timeOutId;

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState("");
  const [color, setColor] = useState("");

  const updateNotification = async (type, value) => {
    if (timeOutId) clearTimeout(timeOutId);
    switch (type) {
      case "error":
        setColor("bg-red-500");
        break;
      case "success":
        setColor("bg-green-500");
        break;
      case "warning":
        setColor("bg-yellow-500");
        break;
      default:
        setColor("bg-red-500");
    }
    setNotification(value);
    timeOutId = setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        <div className="fixed left-1/2 -translate-x-1/2 top-24">
          <div className="rounded gelatine shadow-md shadow-gray-400 dark:shadow-none">
            <p
              className={color + " rounded text-white px-4 py-2 font-semibold"}
            >
              {notification}
            </p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
