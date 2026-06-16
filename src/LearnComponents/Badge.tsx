import React from "react";

type Variant = "default" | "success" | "warning" | "danger" | "info";
type Appearance = "solid" | "subtle" | "outline";
type Size = "sm" | "md";

type BadgeProps = {
  variant?: Variant;
  appearance?: Appearance;
  size?: Size;
  dot?: boolean;
  children: React.ReactNode;
};

// 2D style map: [appearance][variant]
// Covers every combination — TypeScript makes invalid combos impossible
const styleMap: Record<Appearance, Record<Variant, string>> = {
  solid: {
    default: "bg-gray-600 text-gray-100",
    success: "bg-green-600 text-white",
    warning: "bg-amber-500 text-black",
    danger: "bg-red-600 text-white",
    info: "bg-blue-600 text-white",
  },
  subtle: {
    default: "bg-gray-800 text-gray-300",
    success: "bg-green-950 text-green-400",
    warning: "bg-amber-950 text-amber-400",
    danger: "bg-red-950 text-red-400",
    info: "bg-blue-950 text-blue-400",
  },
  outline: {
    default: "border border-gray-500 text-gray-300",
    success: "border border-green-500 text-green-400",
    warning: "border border-amber-500 text-amber-400",
    danger: "border border-red-500 text-red-400",
    info: "border border-blue-500 text-blue-400",
  },
};

// Dot colour follows variant — not hardcoded green
const dotColourMap: Record<Variant, string> = {
  default: "bg-gray-400",
  success: "bg-green-400",
  warning: "bg-amber-400",
  danger: "bg-red-400",
  info: "bg-blue-400",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-2.5 py-1 text-sm gap-1.5",
};

const Badge = ({
  variant = "default",
  appearance = "solid",
  size = "md",
  dot = false,
  children,
}: BadgeProps) => {
  return (
    <span
      // ACCESSIBILITY: inline-flex keeps it semantic — span, not div.
      // div implies a block container; badges are inline content.
      className={`
        inline-flex items-center font-medium rounded-full
        ${styleMap[appearance][variant]}
        ${sizeStyles[size]}
      `}
    >
      {dot && (
        // ACCESSIBILITY: aria-hidden — the dot is decorative.
        // The text label already communicates the meaning.
        <span
          aria-hidden="true"
          className={`rounded-full shrink-0 ${dotColourMap[variant]} ${
            size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2"
          }`}
        />
      )}
      {children}
    </span>
  );
};

export default Badge;
