import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'white' | 'gray' | 'purple';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({ children, variant = 'primary', onClick, className = '', type = 'button' }: ButtonProps) {
  const baseStyles = "px-6 py-2.5 rounded-full font-medium transition-all";
  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "bg-purple-100 text-purple-600 hover:bg-purple-200",
    white: "bg-white text-purple-600 hover:bg-green-300",
    gray: "bg-gray-700 text-white hover:bg-gray-800",
    purple: "bg-[#5e00d7] text-white hover:bg-[#5e00d7]/80"

  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}