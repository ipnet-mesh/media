import { useAnimations } from "../utils/animations";

type Side = "left" | "right";

interface ContentPanelProps {
  /** Which side of the screen the content appears on */
  side: Side;
  /** Panel title */
  title?: string;
  /** Panel content/description */
  content?: string;
  /** Or use children for custom content */
  children?: React.ReactNode;
  /** Title font size in pixels */
  titleSize?: number;
  /** Content font size in pixels */
  contentSize?: number;
  /** Title color */
  titleColor?: string;
  /** Content color */
  contentColor?: string;
  /** Vertical offset to match MediaFrame */
  offsetY?: number;
  /** Width as percentage */
  width?: string;
  /** Animation delay in frames */
  delay?: number;
  /** Additional class names */
  className?: string;
}

export const ContentPanel: React.FC<ContentPanelProps> = ({
  side,
  title,
  content,
  children,
  titleSize = 72,
  contentSize = 36,
  titleColor = "#ffffff",
  contentColor = "#d1d5db",
  offsetY = 100,
  width = "35%",
  delay = 0,
  className = "",
}) => {
  const { fadeIn, frame } = useAnimations(delay);

  const opacity = fadeIn(30);

  // Subtle slide animation from the side
  const slideProgress = Math.min(1, frame / 30);
  const eased = 1 - Math.pow(1 - slideProgress, 3); // Ease out cubic
  const slideOffset = (1 - eased) * 50; // Start 50px offset

  // Position based on side
  const horizontalPosition = side === "left" ? "7%" : "58%";
  const slideDirection = side === "left" ? -slideOffset : slideOffset;

  return (
    <div
      className={`absolute top-1/2 text-center ${className}`}
      style={{
        left: horizontalPosition,
        width,
        transform: `translateY(calc(-50% + ${offsetY}px)) translateX(${slideDirection}px)`,
        opacity,
      }}
    >
      {title && (
        <h2
          className="font-bold mb-6"
          style={{ fontSize: titleSize, color: titleColor }}
        >
          {title}
        </h2>
      )}
      {content && (
        <p
          className="leading-relaxed"
          style={{ fontSize: contentSize, color: contentColor }}
        >
          {content}
        </p>
      )}
      {children}
    </div>
  );
};
