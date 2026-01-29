import { Img, staticFile } from "remotion";
import { useAnimations } from "../utils/animations";

type PresetPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface PositionConfig {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
}

interface IconProps {
  src?: string;
  children?: React.ReactNode;
  positioning?: "absolute" | "relative";
  position?: PositionConfig;
  preset?: PresetPosition;
  size?: number;
  opacity?: number;
  backgroundColor?: string;
  borderRadius?: number;
  animateIn?: boolean;
  animateInDelay?: number;
  pulse?: boolean;
  className?: string;
}

const presetPositions: Record<PresetPosition, PositionConfig> = {
  "top-left": { top: 24, left: 24 },
  "top-right": { top: 24, right: 24 },
  "bottom-left": { bottom: 24, left: 24 },
  "bottom-right": { bottom: 24, right: 24 },
};

export const Icon: React.FC<IconProps> = ({
  src,
  children,
  positioning = "absolute",
  position,
  preset,
  size = 64,
  opacity,
  backgroundColor,
  borderRadius,
  animateIn = false,
  animateInDelay = 0,
  pulse = false,
  className = "",
}) => {
  const { fadeIn, scaleIn, pulse: pulseAnim } = useAnimations(animateInDelay);

  // Determine opacity default based on positioning mode
  const resolvedOpacity = opacity ?? (positioning === "absolute" ? 0.8 : 1);

  // Resolve position from preset or custom
  const resolvedPosition = preset ? presetPositions[preset] : position;

  // Animation values
  const animOpacity = animateIn ? fadeIn(20) : 1;
  const animScale = animateIn ? scaleIn() : 1;
  const pulseScale = pulse ? pulseAnim(0.08, 0.05) : 1;

  const style: React.CSSProperties = {
    width: size,
    height: size,
    opacity: resolvedOpacity * animOpacity,
    transform: `scale(${animScale * pulseScale})`,
    backgroundColor,
    borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...(positioning === "absolute" && {
      position: "absolute",
      ...resolvedPosition,
    }),
  };

  const content = src ? (
    <Img
      src={src.startsWith("/") || src.startsWith("http") ? src : staticFile(src)}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  ) : (
    children
  );

  return (
    <div style={style} className={className}>
      {content}
    </div>
  );
};
