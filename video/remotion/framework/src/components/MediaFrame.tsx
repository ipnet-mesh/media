import { useAnimations } from "../utils/animations";
import { interpolate, useCurrentFrame } from "remotion";

type Alignment = "center" | "left" | "right";

interface MediaFrameProps {
  /** Child content (Terminal, Image, etc.) */
  children: React.ReactNode;
  /** Horizontal alignment */
  align?: Alignment;
  /** 3D rotation angle in degrees for left/right alignment */
  rotateAngle?: number;
  /** Perspective depth for 3D effect */
  perspective?: number;
  /** Vertical offset from center */
  offsetY?: number;
  /** Horizontal offset from edge (for left/right alignment) */
  offsetX?: number;
  /** Animation delay in frames */
  delay?: number;
  /** Enable 3D rotation animation for left/right alignment */
  animate?: boolean;
  /** Animation duration in frames */
  animationDuration?: number;
  /** Starting rotation angle for animation (more extreme) */
  animateFromAngle?: number;
  /** Additional class names */
  className?: string;
}

export const MediaFrame: React.FC<MediaFrameProps> = ({
  children,
  align = "center",
  rotateAngle = 8,
  perspective = 1200,
  offsetY = 0,
  offsetX = 100,
  delay = 0,
  animate = true,
  animationDuration = 45,
  animateFromAngle = 35,
  className = "",
}) => {
  const frame = useCurrentFrame();
  const { fadeIn, scaleIn } = useAnimations(delay);

  const opacity = fadeIn(30);
  const scale = scaleIn();

  // Calculate animated rotation for left/right alignments
  const getAnimatedRotation = (): number => {
    if (align === "center" || !animate) {
      return align === "left" ? rotateAngle : align === "right" ? -rotateAngle : 0;
    }

    const animationFrame = Math.max(0, frame - delay);
    const baseRotation = align === "left" ? 1 : -1;

    // Interpolate from extreme angle to final angle
    const currentAngle = interpolate(
      animationFrame,
      [0, animationDuration],
      [animateFromAngle * baseRotation, rotateAngle * baseRotation],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );

    return currentAngle;
  };

  // Calculate horizontal slide animation
  const getSlideOffset = (): number => {
    if (align === "center" || !animate) {
      return 0;
    }

    const animationFrame = Math.max(0, frame - delay);
    const direction = align === "left" ? -1 : 1;

    const offset = interpolate(
      animationFrame,
      [0, animationDuration],
      [80 * direction, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );

    return offset;
  };

  // Calculate alignment styles
  const getAlignmentStyles = (): React.CSSProperties => {
    const slideOffset = getSlideOffset();

    const baseStyles: React.CSSProperties = {
      position: "absolute",
      top: "50%",
    };

    switch (align) {
      case "left":
        return {
          ...baseStyles,
          left: offsetX + slideOffset,
          transform: `translateY(-50%) translateY(${offsetY}px)`,
        };
      case "right":
        return {
          ...baseStyles,
          right: offsetX - slideOffset,
          transform: `translateY(-50%) translateY(${offsetY}px)`,
        };
      case "center":
      default:
        return {
          ...baseStyles,
          left: "50%",
          transform: `translate(-50%, -50%) translateY(${offsetY}px) scale(${scale})`,
        };
    }
  };

  // Calculate 3D transform for the outer container
  const get3DTransform = (): React.CSSProperties => {
    if (align === "center") {
      return {};
    }

    return {
      perspective,
      transformStyle: "preserve-3d" as const,
    };
  };

  // Calculate 3D transform for the inner content
  const getInnerTransform = (): React.CSSProperties => {
    if (align === "center") {
      return {};
    }

    const rotation = getAnimatedRotation();
    // Transform origin should be on the outer edge for natural rotation
    const origin = align === "left" ? "left center" : "right center";

    return {
      transform: `rotateY(${rotation}deg) scale(${scale})`,
      transformOrigin: origin,
    };
  };

  return (
    <div
      className={`${className}`}
      style={{
        ...getAlignmentStyles(),
        ...get3DTransform(),
        opacity,
      }}
    >
      <div style={getInnerTransform()}>{children}</div>
    </div>
  );
};
