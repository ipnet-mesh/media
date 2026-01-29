import { AbsoluteFill, useCurrentFrame } from "remotion";
import { palettes, PaletteName } from "../utils/palettes";

interface GradientConfig {
  type: "linear" | "radial";
  angle?: number;
  colors: string[];
  positions?: number[];
}

interface AnimationConfig {
  type: "none" | "pulse" | "wave" | "gradient-shift";
  speed?: number;
  intensity?: number;
}

interface BackgroundProps {
  mode?: "solid" | "gradient" | "animated";
  color?: string;
  gradient?: GradientConfig;
  palette?: PaletteName;
  animation?: AnimationConfig;
  children?: React.ReactNode;
}

const buildGradient = (
  config: GradientConfig,
  animationOffset: number = 0
): string => {
  const { type, angle = 180, colors, positions } = config;
  const adjustedAngle = angle + animationOffset;

  const colorStops = colors
    .map((color, i) => {
      const position = positions?.[i] ?? (i / (colors.length - 1)) * 100;
      return `${color} ${position}%`;
    })
    .join(", ");

  if (type === "radial") {
    return `radial-gradient(circle at 50% 50%, ${colorStops})`;
  }

  return `linear-gradient(${adjustedAngle}deg, ${colorStops})`;
};

export const Background: React.FC<BackgroundProps> = ({
  mode = "solid",
  color = "#000000",
  gradient,
  palette,
  animation = { type: "none" },
  children,
}) => {
  const frame = useCurrentFrame();

  // Resolve palette to gradient config if specified
  const resolvedGradient: GradientConfig | undefined = palette
    ? { type: "linear", colors: [...palettes[palette].colors], angle: palettes[palette].angle }
    : gradient;

  // Calculate animation values
  const speed = animation.speed ?? 0.02;
  const intensity = animation.intensity ?? 0.3;

  let animationOffset = 0;
  let pulseScale = 1;
  let overlayOpacity = 0;

  if (animation.type === "gradient-shift") {
    animationOffset = Math.sin(frame * speed) * 30;
  } else if (animation.type === "pulse") {
    pulseScale = 1 + Math.sin(frame * speed * 2) * intensity * 0.1;
    overlayOpacity = Math.sin(frame * speed * 2) * intensity * 0.15;
  } else if (animation.type === "wave") {
    overlayOpacity = (Math.sin(frame * speed) + 1) / 2 * intensity * 0.2;
  }

  // Determine background style
  let backgroundStyle: React.CSSProperties = {};

  if (mode === "solid" || (mode === "gradient" && !resolvedGradient)) {
    backgroundStyle = { backgroundColor: color };
  } else if ((mode === "gradient" || mode === "animated") && resolvedGradient) {
    backgroundStyle = {
      background: buildGradient(resolvedGradient, animationOffset),
    };
  }

  return (
    <AbsoluteFill style={backgroundStyle}>
      {/* Pulse/wave overlay effect */}
      {animation.type !== "none" && animation.type !== "gradient-shift" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              animation.type === "pulse"
                ? `radial-gradient(circle at 50% 50%, rgba(255,255,255,${overlayOpacity}) 0%, transparent 70%)`
                : `linear-gradient(180deg, rgba(255,255,255,${overlayOpacity}) 0%, transparent 50%, rgba(255,255,255,${overlayOpacity * 0.5}) 100%)`,
            transform: `scale(${pulseScale})`,
          }}
        />
      )}

      {/* Subtle animated grid overlay for visual interest */}
      {mode === "animated" && (
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `translateY(${Math.sin(frame * 0.01) * 5}px)`,
          }}
        />
      )}

      {children}
    </AbsoluteFill>
  );
};
