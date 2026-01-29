import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useVisibility } from "../utils/animations";

type AnimationType = "fade" | "scale" | "slide-up" | "slide-down" | "slide-left" | "slide-right";

type PresetPosition =
  | "center"
  | "top-center"
  | "bottom-center"
  | "left-center"
  | "right-center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

interface PositionConfig {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
}

interface PopupProps {
  children: React.ReactNode;
  showAt?: number;
  hideAt?: number;
  position?: PositionConfig;
  preset?: PresetPosition;
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  shadow?: boolean;
  animation?: AnimationType;
  animationDuration?: number;
  className?: string;
}

const presetPositions: Record<PresetPosition, React.CSSProperties> = {
  center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  "top-center": { top: "10%", left: "50%", transform: "translateX(-50%)" },
  "bottom-center": { bottom: "10%", left: "50%", transform: "translateX(-50%)" },
  "left-center": { top: "50%", left: "5%", transform: "translateY(-50%)" },
  "right-center": { top: "50%", right: "5%", transform: "translateY(-50%)" },
  "top-left": { top: "10%", left: "5%" },
  "top-right": { top: "10%", right: "5%" },
  "bottom-left": { bottom: "10%", left: "5%" },
  "bottom-right": { bottom: "10%", right: "5%" },
};

export const Popup: React.FC<PopupProps> = ({
  children,
  showAt = 0,
  hideAt,
  position,
  preset = "center",
  width,
  height,
  maxWidth,
  backgroundColor = "rgba(15, 23, 42, 0.9)",
  borderRadius = 16,
  padding = 24,
  shadow = true,
  animation = "scale",
  animationDuration = 20,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Check visibility
  const isVisible = useVisibility(showAt, hideAt);
  if (!isVisible) return null;

  // Animation calculations
  const animFrame = frame - showAt;

  // Fade for exit if hideAt is set
  const exitOpacity =
    hideAt !== undefined
      ? interpolate(frame, [hideAt - animationDuration, hideAt], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  // Entry animation
  const entryProgress = interpolate(animFrame, [0, animationDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const springValue = spring({
    frame: animFrame,
    fps,
    config: { damping: 100, stiffness: 200, mass: 0.5 },
  });

  // Calculate animation transforms
  let opacity = entryProgress * exitOpacity;
  let scale = 1;
  let translateX = 0;
  let translateY = 0;

  switch (animation) {
    case "fade":
      // Just opacity, handled above
      break;
    case "scale":
      scale = springValue;
      opacity = entryProgress * exitOpacity;
      break;
    case "slide-up":
      translateY = (1 - springValue) * 50;
      break;
    case "slide-down":
      translateY = (1 - springValue) * -50;
      break;
    case "slide-left":
      translateX = (1 - springValue) * 50;
      break;
    case "slide-right":
      translateX = (1 - springValue) * -50;
      break;
  }

  // Resolve position
  const positionStyle = position
    ? { position: "absolute" as const, ...position }
    : { position: "absolute" as const, ...presetPositions[preset] };

  // Get the base transform from preset (for centering)
  const baseTransform = preset && !position ? presetPositions[preset].transform || "" : "";

  // Combine transforms
  const animTransform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  const fullTransform = baseTransform
    ? `${baseTransform} ${animTransform}`
    : animTransform;

  return (
    <div
      className={className}
      style={{
        ...positionStyle,
        transform: fullTransform,
        opacity,
        width,
        height,
        maxWidth,
        backgroundColor,
        borderRadius,
        padding,
        boxShadow: shadow ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : undefined,
      }}
    >
      {children}
    </div>
  );
};
