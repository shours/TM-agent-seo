import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
    const baseStyles = "h-12 px-4 rounded-lg font-medium transition-colors disabled:cursor-not-allowed";
    const variants = {
      primary: "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400",
      secondary: "text-indigo-600 hover:bg-indigo-50"
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? "Chargement..." : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;