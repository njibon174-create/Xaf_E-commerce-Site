"use client";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "rect" | "circle";
}

export default function Skeleton({ className = "", variant = "rect" }: SkeletonProps) {
  const base = "animate-shimmer bg-gradient-to-r from-slate via-slate/60 to-slate bg-[length:200%_100%]";

  const shapes: Record<string, string> = {
    text: `${base} h-3 w-3/4 rounded`,
    rect: `${base} rounded-2xl`,
    circle: `${base} rounded-full`,
  };

  return <div className={`${shapes[variant]} ${className}`} />;
}
