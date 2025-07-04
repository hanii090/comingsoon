"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "gradient" | "outline" | "ghost" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", loading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            // Default variant
            "bg-primary text-white shadow hover:bg-primary/90": variant === "default",
            
            // Gradient variant
            "bg-gradient-primary text-white shadow-lg hover:shadow-xl transform hover:scale-105": variant === "gradient",
            
            // Outline variant
            "border border-glass text-white bg-transparent hover:bg-glass": variant === "outline",
            
            // Ghost variant
            "text-white hover:bg-glass hover:text-white": variant === "ghost",
            
            // Destructive variant
            "bg-red-500 text-white shadow hover:bg-red-600": variant === "destructive",
            
            // Small size
            "h-8 px-3 text-xs": size === "sm",
            
            // Default size
            "h-10 px-4 py-2": size === "default",
            
            // Large size
            "h-12 px-8 text-base": size === "lg",
            
            // Icon size
            "h-10 w-10": size === "icon",
          },
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }