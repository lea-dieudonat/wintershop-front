import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface CardProps extends InputHTMLAttributes<HTMLDivElement> {
  title?: string;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, className = "", padding = "md", children, ...props }, ref) => {
    const baseStyles =
      "bg-white shadow-md rounded-lg p-6 border border-gray-200";
    const paddings = {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${paddings[padding]} ${className}`}
        {...props}
      >
        {title && (
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
