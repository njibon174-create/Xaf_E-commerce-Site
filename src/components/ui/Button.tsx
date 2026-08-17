"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "motion/react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled = false,
  onClick,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium tracking-wide transition-colors duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2";

  const variants: Record<string, string> = {
    primary: "bg-gold text-obsidian hover:bg-gold/90",
    secondary: "border border-fog/30 text-cloud hover:border-fog/60 bg-transparent",
    ghost: "text-fog hover:text-cloud bg-transparent",
    destructive: "bg-error/10 text-error border border-error/20 hover:bg-error/15",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <motion.button
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`${base} ${variants[variant]} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
}
