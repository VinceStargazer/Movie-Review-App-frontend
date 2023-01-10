import React from "react";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center dark:bg-primary bg-white">
      <p className="text-light-subtle dark:text-dark-subtle animate-pulse text-2xl">
        Please wait...
      </p>
    </div>
  );
}
