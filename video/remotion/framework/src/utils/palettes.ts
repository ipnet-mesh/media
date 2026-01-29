// Color palette definitions for the video framework

export const palettes = {
  dark: {
    colors: ["#000000", "#0f172a", "#1e293b"],
    angle: 180,
  },
  light: {
    colors: ["#ffffff", "#f8fafc", "#e2e8f0"],
    angle: 180,
  },
  warm: {
    colors: ["#7c2d12", "#c2410c", "#ea580c"],
    angle: 135,
  },
  cool: {
    colors: ["#0c4a6e", "#0369a1", "#0891b2"],
    angle: 135,
  },
  emergency: {
    colors: ["#450a0a", "#7f1d1d", "#b91c1c"],
    angle: 180,
  },
} as const;

export type PaletteName = keyof typeof palettes;

// Level color schemes for Header
export const levelColors = {
  default: {
    background: "rgba(15, 23, 42, 0.85)",
    border: "rgba(71, 85, 105, 0.5)",
    text: "#ffffff",
    accent: "#94a3b8",
  },
  info: {
    background: "rgba(30, 58, 138, 0.85)",
    border: "rgba(59, 130, 246, 0.7)",
    text: "#ffffff",
    accent: "#60a5fa",
  },
  warn: {
    background: "rgba(120, 53, 15, 0.85)",
    border: "rgba(245, 158, 11, 0.7)",
    text: "#ffffff",
    accent: "#fbbf24",
  },
  emergency: {
    background: "rgba(127, 29, 29, 0.9)",
    border: "rgba(239, 68, 68, 0.8)",
    text: "#ffffff",
    accent: "#f87171",
  },
} as const;

export type LevelName = keyof typeof levelColors;
