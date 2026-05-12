import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "dark" | "outline";
type Size = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-red text-cream border-2 border-red hover:bg-redhover hover:border-redhover",
  dark:
    "bg-ink text-cream border-[1.5px] border-ink hover:bg-red hover:border-red",
  outline:
    "bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-cream",
};

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-4 text-[17px]",
  sm: "px-4 h-10 text-[13px]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`font-display font-extrabold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
