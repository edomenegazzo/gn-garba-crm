import { type HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-cream-soft border border-graylight rounded-sm p-6 ${className}`}
      {...props}
    />
  );
}
