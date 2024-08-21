// src/components/Button.js
import React from 'react';

const Button = ({ label }) => {
  return (
    <button className="relative px-4 py-2 mb-5 text-sm font-bold uppercase text-[#0f1923] border-none bg-none cursor-pointer transition-all duration-150 ease-in-out group">
      <span className="relative block px-5 py-2.5 text-white bg-[#0f1923] overflow-hidden shadow-inner">
        <span className="relative z-10">{label}</span>
        <span className="absolute top-0 left-[-8px] bottom-[-1px] w-0 bg-[#ff4655] transform skew-x-[-15deg] transition-all duration-200 ease-in-out group-hover:w-[calc(100%+15px)]" />
      </span>
    </button>
  );
};

export default Button;
