import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const baseClasses =
    "font-bold rounded-full transition-colors focus:outline-none focus:ring-2 font-primary transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  const variantClasses = {
    primary: "bg-[#1ed760] hover:bg-green-600 text-black focus:ring-green-400",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-400",
  };

  const sizeClasses = {
    sm: "py-2 px-6 text-sm",
    md: "py-3 px-8 text-base",
    lg: "py-4 px-10 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
