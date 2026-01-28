import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneBackground } from "../components/SceneBackground";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 100, stiffness: 200, mass: 0.7 },
  });

  const titleOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const websiteOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const websiteScale = spring({
    frame: frame - 50,
    fps,
    config: { damping: 80, stiffness: 180, mass: 0.5 },
  });

  const taglineOpacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = 1 + Math.sin(frame * 0.1) * 0.3;

  return (
    <SceneBackground>
      {/* Subtle animated background */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-3xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ transform: `scale(${glowPulse})` }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
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
            className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center"
            style={{
              boxShadow: `0 0 ${60 * glowPulse}px ${20 * glowPulse}px rgba(34, 211, 238, 0.4)`,
            }}
          >
            <svg
              width="56"
              height="56"
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
        <div style={{ opacity: titleOpacity }}>
          <h1 className="text-7xl font-bold tracking-tight">
            <span className="text-white">IP</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Net
            </span>
          </h1>
        </div>

        {/* Website - prominent */}
        <div
          style={{
            opacity: websiteOpacity,
            transform: `scale(${websiteScale})`,
          }}
        >
          <div
            className="px-10 py-4 rounded-xl bg-slate-800/60 border-2 border-cyan-500/50"
            style={{
              boxShadow: `0 0 ${30 * glowPulse}px ${8 * glowPulse}px rgba(34, 211, 238, 0.2)`,
            }}
          >
            <p className="text-5xl font-bold">
              <span className="text-cyan-400">ipnt</span>
              <span className="text-white">.uk</span>
            </p>
          </div>
        </div>

        {/* Tagline - Official Slogan */}
        <div style={{ opacity: taglineOpacity }}>
          <p className="text-xl text-slate-300 italic">
            "Connect with us through decentralized mesh networking"
          </p>
        </div>

        {/* Social links */}
        <div
          className="flex items-center gap-8 mt-4"
          style={{
            opacity: interpolate(frame, [100, 130], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div className="flex items-center gap-2 text-slate-400 bg-slate-800/40 px-4 py-2 rounded-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-sm">github.com/ipnet-mesh</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 bg-slate-800/40 px-4 py-2 rounded-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span className="text-sm">discord.gg/hXRM2cJgtf</span>
          </div>
        </div>
      </div>
      </div>
    </SceneBackground>
  );
};
