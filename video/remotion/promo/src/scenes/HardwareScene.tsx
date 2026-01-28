import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneBackground } from "../components/SceneBackground";

export const HardwareScene: React.FC = () => {
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

  const hardware = [
    {
      name: "Heltec V3",
      description: "Compact dev board, perfect for beginners",
      features: ["ESP32-S3", "OLED Display", "USB-C", "~£25"],
      color: "#22d3ee",
      delay: 30,
      image: "images/heltec-v3.png",
    },
    {
      name: "LilyGo T114",
      description: "Portable handheld with GPS and color screen",
      features: ["Color LCD", "GPS", "Battery", "Compact"],
      color: "#a855f7",
      delay: 45,
      image: "images/lilygo-t114.png",
    },
    {
      name: "LilyGo T-Deck+",
      description: "Full keyboard handheld with touchscreen",
      features: ["Keyboard", "Touchscreen", "GPS", "Battery"],
      color: "#ec4899",
      delay: 60,
      image: "images/lilygo-tdeck-plus.png",
    },
    {
      name: "SenseCAP T1000-E",
      description: "Compact tracker with GPS and sensors",
      features: ["GPS Tracker", "Temp/Humidity", "Long Battery", "Portable"],
      color: "#22c55e",
      delay: 75,
      image: "images/sensecap-t1000-e.png",
    },
    {
      name: "SenseCAP Solar Repeater",
      description: "Solar-powered outdoor repeater node",
      features: ["Solar Panel", "IP66 Rated", "High-Gain Antenna", "Autonomous"],
      color: "#f97316",
      delay: 90,
      image: "images/sensecap-solar-p1-pro.png",
    },
  ];

  return (
    <SceneBackground>
      {/* Background decoration */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl"
        style={{
          left: "5%",
          top: "10%",
          transform: `scale(${glowPulse})`,
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-3xl"
        style={{
          right: "10%",
          bottom: "10%",
          transform: `scale(${1 + Math.sin(frame * 0.06) * 0.2})`,
        }}
      />

      {/* Header */}
      <div
        className="absolute top-8 left-0 right-0 text-center"
        style={{
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleY) * 30}px)`,
        }}
      >
        <h2 className="text-4xl font-bold text-white">Compatible Hardware</h2>
        <p className="text-sm text-slate-400 mt-1">
          Affordable devices to join the network — starting from ~£25
        </p>
      </div>

      {/* 5 devices: 3 top row, 2 bottom row */}
      <div className="absolute inset-0 top-24 bottom-8 px-10 py-4 flex flex-col gap-5">
        {/* Top row - 3 devices */}
        <div className="flex-1 flex gap-5">
          {hardware.slice(0, 3).map((item, i) => {
            const cardOpacity = interpolate(
              frame - item.delay,
              [0, 25],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const cardScale = spring({
              frame: frame - item.delay,
              fps,
              config: { damping: 100, stiffness: 150, mass: 0.5 },
            });

            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center justify-center rounded-3xl bg-slate-800/40 border border-slate-700/50"
                style={{
                  opacity: cardOpacity,
                  transform: `scale(${cardScale})`,
                  boxShadow: `0 0 ${20 * glowPulse}px ${5 * glowPulse}px ${item.color}15`,
                }}
              >
                <div className="mb-4">
                  <Img
                    src={staticFile(item.image)}
                    style={{ height: 140, objectFit: "contain" }}
                  />
                </div>
                <h3 className="text-white font-bold text-2xl mb-1">{item.name}</h3>
                <p className="text-slate-400 text-sm mb-3 max-w-[240px] text-center">{item.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {item.features.map((feature, j) => (
                    <span
                      key={j}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-700/50 border border-slate-600/50"
                      style={{ color: item.color }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom row - 2 devices */}
        <div className="flex-1 flex gap-5 px-[15%]">
          {hardware.slice(3, 5).map((item, i) => {
            const cardOpacity = interpolate(
              frame - item.delay,
              [0, 25],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const cardScale = spring({
              frame: frame - item.delay,
              fps,
              config: { damping: 100, stiffness: 150, mass: 0.5 },
            });

            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center justify-center rounded-3xl bg-slate-800/40 border border-slate-700/50"
                style={{
                  opacity: cardOpacity,
                  transform: `scale(${cardScale})`,
                  boxShadow: `0 0 ${20 * glowPulse}px ${5 * glowPulse}px ${item.color}15`,
                }}
              >
                <div className="mb-4">
                  <Img
                    src={staticFile(item.image)}
                    style={{ height: 140, objectFit: "contain" }}
                  />
                </div>
                <h3 className="text-white font-bold text-2xl mb-1">{item.name}</h3>
                <p className="text-slate-400 text-sm mb-3 max-w-[240px] text-center">{item.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {item.features.map((feature, j) => (
                    <span
                      key={j}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-700/50 border border-slate-600/50"
                      style={{ color: item.color }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneBackground>
  );
};
