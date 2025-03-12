import React from "react";

function ButtonSuccess({ children, className, onClick = () => {}, ...props }) {
  return (
    <>
      <button
        className={`inline-block px-4 py-2 rounded-lg shadow shadow-gray-400 text-white bg-green-600 scale-100 active:scale-95 transall cursor-pointer select-none ${className}`}
        {...props}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}

export default ButtonSuccess;
