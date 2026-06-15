import React, { type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "destructive" | "ghost";
};

const variantStyles = {
  primary:
    "bg-kick-brand text-black hover:bg-kick-brand-hover focus-visible:ring-2 focus-visible:ring-white",
  secondary:
    "bg-gray-200 text-gray-800 hover:bg-gray-300 focus-visible:ring-2 focus-visible:ring-white",
  destructive:
    "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-white",
  ghost:
    "bg-transparent text-white hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-white",
};

const sizeStyles = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button = ({
  children,
  disabled = false,
  isLoading = false,
  size = "md",
  variant = "primary",
  type = "button",
  icon,
  ...props
}: ButtonProps) => {
  return (
    <button
      aria-busy={isLoading}
      disabled={disabled || isLoading}
      type={type}
      className={`
        rounded font-medium transition-colors 
        ${variantStyles[variant]} 
        ${sizeStyles[size]}
        ${isLoading || disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      {...props}
    >
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          {icon && <span>{icon}</span>} {/* this could be an icon component */}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
