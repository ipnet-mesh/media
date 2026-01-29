interface TitleProps {
  children: React.ReactNode;
  /** Size: auto fills available space, or fixed sizes */
  size?: "auto" | "sm" | "md" | "lg" | "xl";
  color?: string;
  weight?: "normal" | "medium" | "semibold" | "bold";
  className?: string;
}

const sizeClasses = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

const weightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export const Title: React.FC<TitleProps> = ({
  children,
  size = "lg",
  color = "#ffffff",
  weight = "bold",
  className = "",
}) => {
  // Auto size is handled by parent (Header) via CSS
  const sizeClass = size === "auto" ? "" : sizeClasses[size];

  return (
    <h1
      className={`leading-tight ${sizeClass} ${weightClasses[weight]} ${className}`}
      style={{ color }}
    >
      {children}
    </h1>
  );
};

/** Highlighted text span for use within titles */
export const Highlight: React.FC<{
  children: React.ReactNode;
  color?: "cyan" | "purple" | "orange" | "green" | "blue" | "red" | "yellow";
  gradient?: boolean;
}> = ({ children, color = "cyan", gradient = false }) => {
  const colorClasses: Record<string, string> = {
    cyan: gradient
      ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
      : "text-cyan-400",
    purple: gradient
      ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400"
      : "text-purple-400",
    orange: gradient
      ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400"
      : "text-orange-400",
    green: gradient
      ? "text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400"
      : "text-green-400",
    blue: gradient
      ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"
      : "text-blue-400",
    red: gradient
      ? "text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400"
      : "text-red-400",
    yellow: gradient
      ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400"
      : "text-yellow-400",
  };

  return <span className={colorClasses[color]}>{children}</span>;
};
