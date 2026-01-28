import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneBackground } from "../components/SceneBackground";

export const WelcomeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.8,
    },
  });

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [25, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame: frame - 25,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 0.5,
    },
  });

  const taglineOpacity = interpolate(frame, [50, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const websiteOpacity = interpolate(frame, [75, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = 1 + Math.sin(frame * 0.1) * 0.3;

  return (
    <SceneBackground>
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-3xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `scale(${glowPulse})`,
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <div
            className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center"
            style={{
              boxShadow: `0 0 ${50 * glowPulse}px ${15 * glowPulse}px rgba(34, 211, 238, 0.4)`,
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="5" r="2" />
              <circle cx="5" cy="19" r="2" />
              <circle cx="19" cy="19" r="2" />
              <circle cx="12" cy="12" r="2" />
              <path d="M12 7v3" />
              <path d="M7 17.5L10.5 14" />
              <path d="M17 17.5L13.5 14" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${(1 - titleY) * 40}px)`,
          }}
        >
          <h1 className="text-8xl font-bold tracking-tight">
            <span className="text-white">IP</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Net
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <div style={{ opacity: taglineOpacity }}>
          <p className="text-2xl text-slate-300 tracking-wide italic">
            "Connect with us through decentralized mesh networking"
          </p>
        </div>

        {/* Website */}
        <div
          className="mt-8"
          style={{ opacity: websiteOpacity }}
        >
          <div className="px-6 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5">
            <span className="text-cyan-400 text-lg font-medium">ipnt.uk</span>
          </div>
        </div>
      </div>
      </div>
    </SceneBackground>
  );
};
