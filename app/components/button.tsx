interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'filled' | 'ghost';
  size?: 'medium' | 'small';
}

const Button = ({
  children,
  onClick,
  disabled,
  type = 'button',
  variant = 'filled',
  size = 'medium'
}: ButtonProps) => {
  const baseClasses =
    "transition font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-primary";

  // Remove x padding for ghost variant
  const sizeClasses = {
    medium:
      variant === 'ghost'
        ? "h-[50px] text-[16px] leading-[28px]"
        : "h-[50px] px-8 text-[16px] leading-[28px]",
    small:
      variant === 'ghost'
        ? "h-10 text-sm leading-6"
        : "h-10 px-3 text-sm leading-6"
  };

  const variantClasses = {
    filled: disabled
      ? "bg-text-light/60 text-white cursor-not-allowed"
      : "bg-primary text-background hover:opacity-80 cursor-pointer",
    ghost: disabled
      ? "bg-transparent text-text/60 cursor-not-allowed"
      : "bg-transparent text-primary hover:underline cursor-pointer"
  };

  const className = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
