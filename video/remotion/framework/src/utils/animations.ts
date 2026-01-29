import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Shared spring configurations
export const springConfigs = {
  smooth: { damping: 200, stiffness: 100, mass: 0.5 },
  bouncy: { damping: 100, stiffness: 200, mass: 0.5 },
  snappy: { damping: 80, stiffness: 300, mass: 0.3 },
  gentle: { damping: 300, stiffness: 80, mass: 0.8 },
} as const;

// Hook for common animation values
export const useAnimations = (delay: number = 0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = Math.max(0, frame - delay);

  return {
    frame,
    adjustedFrame,
    fps,

    // Fade in (0 to 1 over duration frames)
    fadeIn: (duration: number = 20) =>
      interpolate(adjustedFrame, [0, duration], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),

    // Fade out (1 to 0 over duration frames)
    fadeOut: (startFrame: number, duration: number = 20) =>
      interpolate(frame, [startFrame, startFrame + duration], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),

    // Spring-based scale (0 to 1)
    scaleIn: (config = springConfigs.smooth) =>
      spring({ frame: adjustedFrame, fps, config }),

    // Slide from direction
    slideIn: (direction: "up" | "down" | "left" | "right", distance: number = 30) => {
      const springVal = spring({ frame: adjustedFrame, fps, config: springConfigs.smooth });
      const offset = (1 - springVal) * distance;

      switch (direction) {
        case "up": return { x: 0, y: offset };
        case "down": return { x: 0, y: -offset };
        case "left": return { x: offset, y: 0 };
        case "right": return { x: -offset, y: 0 };
      }
    },

    // Pulse effect (oscillates around 1)
    pulse: (speed: number = 0.1, intensity: number = 0.1) =>
      1 + Math.sin(frame * speed) * intensity,

    // Wave effect (0 to 1 oscillation)
    wave: (speed: number = 0.05, offset: number = 0) =>
      (Math.sin(frame * speed + offset) + 1) / 2,
  };
};

// Visibility helper for frame-based show/hide
export const useVisibility = (showAt?: number, hideAt?: number) => {
  const frame = useCurrentFrame();

  if (showAt !== undefined && frame < showAt) return false;
  if (hideAt !== undefined && frame > hideAt) return false;
  return true;
};

// Interpolate between frames with clamping
export const clampedInterpolate = (
  frame: number,
  inputRange: [number, number],
  outputRange: [number, number]
) =>
  interpolate(frame, inputRange, outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// Easing functions
export const easeOutExpo = (t: number) => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export const easeInOutCubic = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
