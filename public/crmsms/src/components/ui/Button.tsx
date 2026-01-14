import { ButtonHTMLAttributes, FunctionComponent, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "danger";
type Size = "sm" | "md";

interface UIButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-xl font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60 transition-all duration-200 ease-out";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 ring-offset-white",
  secondary:
    "bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow-md hover:scale-105 ring-offset-white",
  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 hover:shadow-md hover:scale-105 ring-offset-white",
  danger:
    "bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105 ring-offset-white",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
};

const UIButton: FunctionComponent<UIButtonProps> = ({
  variant = "primary",
  size = "md",
  leftIcon,
  children,
  className = "",
  ...rest
}) => {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {leftIcon && <span className="mr-2 inline-flex h-4 w-4 items-center justify-center">{leftIcon}</span>}
      {children}
    </button>
  );
};

export default UIButton;



