import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneBackground } from "../components/SceneBackground";

export const JoinNetworkScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const mainScale = spring({
    frame,
    fps,
    config: { damping: 100, stiffness: 150, mass: 0.6 },
  });

  const reasonsOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaScale = spring({
    frame: frame - 100,
    fps,
    config: { damping: 80, stiffness: 200, mass: 0.5 },
  });

  const glowPulse = 1 + Math.sin(frame * 0.1) * 0.3;

  const reasons = [
    { icon: "🌍", text: "Expand local coverage" },
    { icon: "🤝", text: "Connect with neighbors" },
    { icon: "⚡", text: "Emergency communications" },
    { icon: "🔬", text: "Learn & experiment" },
  ];

  return (
    <SceneBackground>
      {/* Animated background */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-3xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ transform: `scale(${glowPulse})` }}
      />

      {/* Network pattern background */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        {Array.from({ length: 15 }).map((_, i) => {
          const x1 = (i * 137) % 100;
          const y1 = (i * 89) % 100;
          const x2 = ((i + 5) * 137) % 100;
          const y2 = ((i + 5) * 89) % 100;
          return (
            <line
              key={i}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#22d3ee"
              strokeWidth="1"
              opacity={0.3 + Math.sin(frame * 0.05 + i) * 0.2}
            />
          );
        })}
        {Array.from({ length: 15 }).map((_, i) => {
          const x = (i * 137) % 100;
          const y = (i * 89) % 100;
          return (
            <circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r="4"
              fill="#22d3ee"
              opacity={0.2 + Math.sin(frame * 0.08 + i) * 0.15}
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-10 z-10">
        {/* Main heading */}
        <div
          className="text-center"
          style={{
            opacity: mainOpacity,
            transform: `scale(${mainScale})`,
          }}
        >
          <h2 className="text-6xl font-bold text-white mb-4">
            Join the <span className="text-cyan-400">Network</span>
          </h2>
          <p className="text-2xl text-slate-400">
            Become part of Suffolk's growing mesh community
          </p>
        </div>

        {/* Reasons to join */}
        <div
          className="flex gap-8"
          style={{ opacity: reasonsOpacity }}
        >
          {reasons.map((reason, i) => {
            const reasonDelay = 50 + i * 12;
            const reasonOpacity = interpolate(
              frame - reasonDelay,
              [0, 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const reasonY = spring({
              frame: frame - reasonDelay,
              fps,
              config: { damping: 200, stiffness: 100, mass: 0.5 },
            });

            return (
              <div
                key={i}
                className="flex flex-col items-center gap-2 bg-slate-800/40 rounded-xl px-6 py-5 border border-slate-700/50"
                style={{
                  opacity: reasonOpacity,
                  transform: `translateY(${(1 - reasonY) * 20}px)`,
                }}
              >
                <span className="text-3xl">{reason.icon}</span>
                <span className="text-slate-300 text-sm font-medium">{reason.text}</span>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
          }}
        >
          <div
            className="relative px-12 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500"
            style={{
              boxShadow: `0 0 ${40 * glowPulse}px ${15 * glowPulse}px rgba(34, 211, 238, 0.3)`,
            }}
          >
            <p className="text-white text-2xl font-bold">Get Started Today</p>
          </div>
        </div>

        {/* Steps hint */}
        <div
          className="flex items-center gap-6 text-slate-400"
          style={{
            opacity: interpolate(frame, [130, 160], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">1</span>
            Get hardware
          </span>
          <span className="text-slate-600">→</span>
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">2</span>
            Flash firmware
          </span>
          <span className="text-slate-600">→</span>
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">3</span>
            Join the mesh
          </span>
        </div>
      </div>
      </div>
    </SceneBackground>
  );
};
