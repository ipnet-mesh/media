import { levelColors, LevelName } from "../utils/palettes";
import { useAnimations } from "../utils/animations";

interface HeaderProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  level?: LevelName;
  position?: "top" | "bottom";
  height?: number;
  padding?: number;
  animateIn?: boolean;
  animateInDelay?: number;
  backgroundColor?: string;
  borderColor?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  icon,
  title,
  subtitle,
  level = "default",
  position = "top",
  height = 200,
  padding = 24,
  animateIn = true,
  animateInDelay = 0,
  backgroundColor,
  borderColor,
  className = "",
}) => {
  const { fadeIn, slideIn } = useAnimations(animateInDelay);

  // Get level colors
  const colors = levelColors[level];
  const bgColor = backgroundColor ?? colors.background;
  const bdColor = borderColor ?? colors.border;

  // Animation values
  const opacity = animateIn ? fadeIn(25) : 1;
  const slide = animateIn ? slideIn(position === "top" ? "down" : "up", 40) : { x: 0, y: 0 };

  // Calculate title size based on whether subtitle exists
  // If no subtitle, title should be larger to fill vertical space
  const titleSize = subtitle ? "text-7xl" : "text-8xl";
  const titleLineHeight = subtitle ? "leading-tight" : "leading-none";

  // Calculate content height (height minus padding)
  const contentHeight = height - padding * 2;

  const positionStyle: React.CSSProperties =
    position === "top"
      ? { top: 0, borderBottom: `2px solid ${bdColor}` }
      : { bottom: 0, borderTop: `2px solid ${bdColor}` };

  return (
    <div
      className={`absolute left-0 right-0 ${className}`}
      style={{
        height,
        padding,
        backgroundColor: bgColor,
        opacity,
        transform: `translate(${slide.x}px, ${slide.y}px)`,
        display: "flex",
        alignItems: "center",
        gap: padding,
        ...positionStyle,
      }}
    >
      {/* Icon */}
      {icon && (
        <div
          style={{
            height: contentHeight,
            width: contentHeight,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
      )}

      {/* Title and Subtitle */}
      <div
        className="flex flex-col justify-center"
        style={{
          height: contentHeight,
          flex: 1,
          overflow: "hidden",
        }}
      >
        <h1
          className={`${titleSize} ${titleLineHeight} font-bold`}
          style={{
            color: colors.text,
            margin: 0,
            ...(subtitle ? {} : { display: "flex", alignItems: "center", height: "100%" }),
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-4xl mt-1"
            style={{ color: colors.accent, margin: 0 }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
