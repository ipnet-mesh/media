import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const useAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = (delay = 0, duration = 20) => {
    return interpolate(frame - delay, [0, duration], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  };

  const fadeOut = (startFrame: number, duration = 20) => {
    return interpolate(frame - startFrame, [0, duration], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  };

  const slideInFromBottom = (delay = 0) => {
    return spring({
      frame: frame - delay,
      fps,
      config: {
        damping: 200,
        stiffness: 100,
        mass: 0.5,
      },
    });
  };

  const slideInFromLeft = (delay = 0) => {
    return spring({
      frame: frame - delay,
      fps,
      config: {
        damping: 200,
        stiffness: 80,
        mass: 0.5,
      },
    });
  };

  const scale = (delay = 0) => {
    return spring({
      frame: frame - delay,
      fps,
      config: {
        damping: 100,
        stiffness: 200,
        mass: 0.5,
      },
    });
  };

  const pulse = (speed = 0.05) => {
    return 1 + Math.sin(frame * speed) * 0.05;
  };

  return {
    frame,
    fps,
    fadeIn,
    fadeOut,
    slideInFromBottom,
    slideInFromLeft,
    scale,
    pulse,
  };
};

export const easeOutExpo = (t: number) => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export const easeInOutCubic = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
