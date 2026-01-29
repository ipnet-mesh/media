import { AbsoluteFill } from "remotion";
import { Background } from "./Background";
import { Header } from "./Header";
import { Icon } from "./Icon";
import { PaletteName } from "../utils/palettes";
import { LevelName } from "../utils/palettes";

interface BackgroundConfig {
  mode?: "solid" | "gradient" | "animated";
  color?: string;
  gradient?: {
    type: "linear" | "radial";
    angle?: number;
    colors: string[];
    positions?: number[];
  };
  palette?: PaletteName;
  animation?: {
    type: "none" | "pulse" | "wave" | "gradient-shift";
    speed?: number;
    intensity?: number;
  };
}

interface HeaderConfig {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  level?: LevelName;
  position?: "top" | "bottom";
  height?: number;
  animateIn?: boolean;
  animateInDelay?: number;
}

interface WatermarkConfig {
  src?: string;
  children?: React.ReactNode;
  preset?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  opacity?: number;
  animateIn?: boolean;
  pulse?: boolean;
}

interface SceneProps {
  children?: React.ReactNode;
  background?: BackgroundConfig;
  header?: HeaderConfig;
  watermark?: WatermarkConfig;
  className?: string;
}

export const Scene: React.FC<SceneProps> = ({
  children,
  background,
  header,
  watermark,
  className = "",
}) => {
  return (
    <AbsoluteFill className={className}>
      {/* Background layer */}
      {background ? (
        <Background {...background} />
      ) : (
        <Background mode="solid" color="#000000" />
      )}

      {/* Header layer */}
      {header && <Header {...header} />}

      {/* Content layer - vertically centered, accounting for header */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          paddingTop: header ? (header.height ?? 200) : 0,
        }}
      >
        {children}
      </div>

      {/* Watermark layer (on top) */}
      {watermark && (
        <Icon
          positioning="absolute"
          preset={watermark.preset ?? "bottom-right"}
          src={watermark.src}
          size={watermark.size ?? 48}
          opacity={watermark.opacity ?? 0.6}
          animateIn={watermark.animateIn}
          pulse={watermark.pulse}
        >
          {watermark.children}
        </Icon>
      )}
    </AbsoluteFill>
  );
};
