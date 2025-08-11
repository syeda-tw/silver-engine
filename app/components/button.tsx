import { forwardRef } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "filled" | "ghost";
  size?: "medium" | "small";
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      disabled,
      type = "button",
      variant = "filled",
      size = "medium",
      className = "",
    },
    ref
  ) => {
    const baseClasses = "transition font-bold rounded-lg focus:outline-none";

    // Remove x padding for ghost variant
    const sizeClasses = {
      medium:
        variant === "ghost"
          ? "h-[50px] text-[16px] leading-[28px]"
          : "h-[50px] px-8 text-[16px] leading-[28px]",
      small:
        variant === "ghost"
          ? "h-10 text-sm leading-6"
          : "h-10 px-3 text-sm leading-6",
    };

    const variantClasses = {
      filled: disabled
        ? "bg-text-light/60 text-white cursor-not-allowed"
        : "bg-primary text-background hover:opacity-80 cursor-pointer",
      ghost: disabled
        ? "bg-transparent text-text/60 cursor-not-allowed"
        : "bg-transparent text-primary cursor-pointer",
    };

    const combinedClassName =
      `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim();

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={combinedClassName}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
