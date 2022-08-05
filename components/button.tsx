import React, { ButtonHTMLAttributes, ReactNode } from 'react';

const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) => {
  return (
    <button
      className="rounded-full bg-blue-500 px-4 py-2 text-white disabled:opacity-30"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
