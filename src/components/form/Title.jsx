import React from 'react';

export default function Title({ children }) {
  return (
    <h1 className="text-xl text-secondary dark:text-white font-semibold text-center">
        { children }
    </h1>
  )
}
