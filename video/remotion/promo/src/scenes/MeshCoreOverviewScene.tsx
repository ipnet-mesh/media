import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneBackground } from "../components/SceneBackground";

export const MeshCoreOverviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 100, mass: 0.5 },
  });

  const glowPulse = 1 + Math.sin(frame * 0.08) * 0.2;

  const features = [
    {
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5">
          <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" />
          <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" />
          <path d="M12 10a2 2 0 0 0-2 2c0 1.02.1 2.51.26 4" />
          <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
        </svg>
      ),
      title: "LoRa Protocol",
      value: "868 MHz",
      desc: "License-free ISM band for long-range communication",
      color: "#f97316",
      delay: 30,
    },
    {
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
          <line x1="2" y1="2" x2="22" y2="22" />
          <path d="M8.5 16.5a5 5 0 0 1 7 0" />
          <path d="M2 8.82a15 15 0 0 1 4.17-2.65" />
          <path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76" />
          <path d="M16.85 11.25a10 10 0 0 1 2.22 1.68" />
          <path d="M5 13a10 10 0 0 1 5.24-2.76" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>
      ),
      title: "No WiFi or 4G Required",
      value: "Off-Grid",
      desc: "Works completely without internet connectivity",
      color: "#ef4444",
      delay: 50,
    },
    {
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: "Fully Legal",
      value: "UK / EU / US",
      desc: "ISM band compliant worldwide",
      color: "#22c55e",
      delay: 70,
    },
    {
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5">
          <rect x="2" y="7" width="16" height="10" rx="2" />
          <line x1="22" y1="11" x2="22" y2="13" />
          <line x1="6" y1="11" x2="6" y2="13" />
          <line x1="10" y1="11" x2="10" y2="13" />
        </svg>
      ),
      title: "Ultra Low Power",
      value: "mW Range",
      desc: "Solar and battery powered capable",
      color: "#3b82f6",
      delay: 90,
    },
  ];

  return (
    <SceneBackground>
      {/* Background decoration */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-3xl"
        style={{
          left: "5%",
          top: "10%",
          transform: `scale(${glowPulse})`,
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-3xl"
        style={{
          right: "10%",
          bottom: "10%",
          transform: `scale(${1 + Math.sin(frame * 0.06) * 0.2})`,
        }}
      />

      {/* Header with MeshCore branding */}
      <div
        className="absolute top-8 left-0 right-0 flex justify-center items-center gap-4"
        style={{
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleY) * 30}px)`,
        }}
      >
        <div
          className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center"
          style={{
            boxShadow: `0 0 ${30 * glowPulse}px ${8 * glowPulse}px rgba(139, 92, 246, 0.3)`,
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
            <line x1="12" y1="22" x2="12" y2="15.5" />
            <polyline points="22 8.5 12 15.5 2 8.5" />
          </svg>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-white">
            Mesh<span className="text-purple-400">Core</span>
          </h2>
          <p className="text-slate-400 text-sm italic">
            "We connect people and things, without using the internet"
          </p>
        </div>
      </div>

      {/* 2x2 Feature Grid - Full Page */}
      <div className="absolute inset-0 top-28 bottom-8 px-12 py-4">
        <div className="grid grid-cols-2 grid-rows-2 gap-6 h-full">
          {features.map((feature, i) => {
            const featureOpacity = interpolate(
              frame - feature.delay,
              [0, 25],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const featureScale = spring({
              frame: frame - feature.delay,
              fps,
              config: { damping: 100, stiffness: 150, mass: 0.5 },
            });

            return (
              <div
                key={i}
                className="flex flex-col items-center justify-center rounded-3xl bg-slate-800/40 border border-slate-700/50"
                style={{
                  opacity: featureOpacity,
                  transform: `scale(${featureScale})`,
                  boxShadow: `0 0 ${20 * glowPulse}px ${5 * glowPulse}px ${feature.color}15`,
                }}
              >
                <div
                  className="w-32 h-32 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  {feature.icon}
                </div>
                <p className="text-white font-semibold text-2xl mb-2">{feature.title}</p>
                <p style={{ color: feature.color }} className="font-bold text-5xl mb-3">
                  {feature.value}
                </p>
                <p className="text-slate-400 text-lg max-w-xs text-center">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </SceneBackground>
  );
};
