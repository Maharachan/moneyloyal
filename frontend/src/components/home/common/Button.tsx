import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'white' | 'gray' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', className = '', type = 'button', ...props }, ref) => {
    const baseStyles = "px-6 py-2.5 rounded-full font-medium transition-all";
    const variants = {
      primary: "bg-purple-600 text-white hover:bg-purple-700",
      secondary: "bg-purple-100 text-purple-600 hover:bg-purple-200",
      white: "bg-white text-purple-600 hover:bg-green-300",
      gray: "bg-gray-700 text-white hover:bg-gray-800",
      purple: "bg-[#5e00d7] text-white hover:bg-[#5e00d7]/80"
    };

    return (
      <button
        ref={ref}
        type={type}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;