interface SubtitleProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  color?: string;
  weight?: "normal" | "medium" | "semibold";
  className?: string;
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const weightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
};

export const Subtitle: React.FC<SubtitleProps> = ({
  children,
  size = "md",
  color = "#94a3b8",
  weight = "normal",
  className = "",
}) => {
  return (
    <p
      className={`${sizeClasses[size]} ${weightClasses[weight]} ${className}`}
      style={{ color }}
    >
      {children}
    </p>
  );
};
