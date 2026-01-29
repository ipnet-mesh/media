import { Img } from "remotion";
import { useAnimations } from "../utils/animations";

interface ImageProps {
  /** Image source path */
  src: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Width of the image container */
  width?: number | string;
  /** Height of the image container */
  height?: number | string;
  /** Border radius */
  borderRadius?: number;
  /** Show border */
  border?: boolean;
  /** Border color */
  borderColor?: string;
  /** Border width */
  borderWidth?: number;
  /** Box shadow */
  shadow?: boolean;
  /** Object fit mode */
  objectFit?: "cover" | "contain" | "fill" | "none";
  /** Animation delay in frames */
  delay?: number;
  /** Enable/disable internal animation (disable when used inside MediaFrame) */
  animate?: boolean;
  /** Additional class names */
  className?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt = "",
  width = 800,
  height,
  borderRadius = 12,
  border = true,
  borderColor = "rgba(255, 255, 255, 0.1)",
  borderWidth = 1,
  shadow = true,
  objectFit = "cover",
  delay = 0,
  animate = true,
  className = "",
}) => {
  const { fadeIn, scaleIn } = useAnimations(delay);

  const opacity = animate ? fadeIn(20) : 1;
  const scale = animate ? scaleIn() : 1;

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        width,
        height,
        opacity,
        transform: animate ? `scale(${scale})` : undefined,
        borderRadius,
        border: border ? `${borderWidth}px solid ${borderColor}` : undefined,
        boxShadow: shadow
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 12px 24px -8px rgba(0, 0, 0, 0.3)"
          : undefined,
      }}
    >
      <Img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit,
        }}
      />
    </div>
  );
};
