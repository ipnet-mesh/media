import { useCurrentFrame, interpolate, staticFile, Img } from "remotion";

type HorizontalAlign = "left" | "center" | "right";
type AnimationEffect = "slide" | "fade" | "scale" | "slideUp";

interface OverlayProps {
  /** Icon source - path to image file */
  iconSrc?: string;
  /** Icon as React node (alternative to iconSrc) */
  icon?: React.ReactNode;
  /** Icon size in pixels */
  iconSize?: number;
  /** Main text content */
  text: string;
  /** Optional secondary/subtitle text */
  subtext?: string;
  /** Horizontal alignment */
  align?: HorizontalAlign;
  /** Distance from bottom edge */
  bottom?: number;
  /** Distance from left/right edge (for left/right alignment) */
  margin?: number;
  /** Frame to show the overlay */
  showAt?: number;
  /** Frame to hide the overlay */
  hideAt?: number;
  /** Animation effect for entrance */
  animationIn?: AnimationEffect;
  /** Animation effect for exit */
  animationOut?: AnimationEffect;
  /** Animation duration in frames */
  animationDuration?: number;
  /** Background color */
  backgroundColor?: string;
  /** Border color */
  borderColor?: string;
  /** Text color */
  textColor?: string;
  /** Subtext color */
  subtextColor?: string;
  /** Main text font size */
  fontSize?: number;
  /** Subtext font size */
  subtextSize?: number;
  /** Border radius */
  borderRadius?: number;
  /** Padding inside the overlay */
  padding?: number;
  /** Gap between icon and text */
  gap?: number;
  /** Additional class names */
  className?: string;
}

export const Overlay: React.FC<OverlayProps> = ({
  iconSrc,
  icon,
  iconSize = 48,
  text,
  subtext,
  align = "center",
  bottom = 60,
  margin = 60,
  showAt = 0,
  hideAt,
  animationIn = "slideUp",
  animationOut = "fade",
  animationDuration = 20,
  backgroundColor = "rgba(0, 0, 0, 0.85)",
  borderColor = "rgba(255, 255, 255, 0.15)",
  textColor = "#ffffff",
  subtextColor = "#94a3b8",
  fontSize = 32,
  subtextSize = 24,
  borderRadius = 16,
  padding = 24,
  gap = 20,
  className = "",
}) => {
  const frame = useCurrentFrame();

  // Determine visibility
  const isVisible = frame >= showAt && (hideAt === undefined || frame <= hideAt);
  if (!isVisible && (hideAt === undefined || frame < showAt)) {
    return null;
  }

  // Calculate animation progress for entrance
  const entranceProgress = interpolate(
    frame,
    [showAt, showAt + animationDuration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Calculate animation progress for exit
  const exitProgress = hideAt !== undefined
    ? interpolate(
        frame,
        [hideAt - animationDuration, hideAt],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 1;

  // Calculate animation values based on effect
  const getAnimationStyle = (effect: AnimationEffect, prog: number): React.CSSProperties => {
    switch (effect) {
      case "slide":
        const slideX = align === "left" ? -100 : align === "right" ? 100 : 0;
        return {
          transform: `translateX(${(1 - prog) * slideX}px)`,
          opacity: prog,
        };
      case "slideUp":
        return {
          transform: `translateY(${(1 - prog) * 50}px)`,
          opacity: prog,
        };
      case "scale":
        return {
          transform: `scale(${0.8 + prog * 0.2})`,
          opacity: prog,
        };
      case "fade":
      default:
        return {
          opacity: prog,
        };
    }
  };

  // Determine which animation to use based on progress phase
  const isExiting = hideAt !== undefined && frame > hideAt - animationDuration;

  const animationStyle = isExiting
    ? getAnimationStyle(animationOut, exitProgress)
    : getAnimationStyle(animationIn, entranceProgress);

  // Horizontal positioning
  const getHorizontalPosition = (): React.CSSProperties => {
    switch (align) {
      case "left":
        return { left: margin };
      case "right":
        return { right: margin };
      case "center":
      default:
        return { left: "50%", transform: `translateX(-50%) ${animationStyle.transform || ""}`.trim() };
    }
  };

  const positionStyle = getHorizontalPosition();

  // Merge transform if not center-aligned
  const finalTransform = align === "center"
    ? positionStyle.transform
    : animationStyle.transform;

  // Resolve icon source
  const resolvedIconSrc = iconSrc
    ? (iconSrc.startsWith("/") || iconSrc.startsWith("http") ? iconSrc : staticFile(iconSrc))
    : undefined;

  return (
    <div
      className={`absolute flex items-center ${className}`}
      style={{
        bottom,
        ...positionStyle,
        transform: finalTransform,
        opacity: animationStyle.opacity,
        backgroundColor,
        border: `2px solid ${borderColor}`,
        borderRadius,
        padding,
        gap,
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Icon */}
      {(resolvedIconSrc || icon) && (
        <div
          style={{
            width: iconSize,
            height: iconSize,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {resolvedIconSrc ? (
            <Img
              src={resolvedIconSrc}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : (
            icon
          )}
        </div>
      )}

      {/* Text content */}
      <div className="flex flex-col justify-center" style={{ gap: 4 }}>
        <span
          className="font-semibold whitespace-nowrap"
          style={{ fontSize, color: textColor, lineHeight: 1.2 }}
        >
          {text}
        </span>
        {subtext && (
          <span
            className="whitespace-nowrap"
            style={{ fontSize: subtextSize, color: subtextColor, lineHeight: 1.3 }}
          >
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};
