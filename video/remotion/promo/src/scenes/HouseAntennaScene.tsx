import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneBackground } from "../components/SceneBackground";

export const HouseAntennaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const houseScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 100, stiffness: 150, mass: 0.6 },
  });

  const houseOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const antennaGrow = spring({
    frame: frame - 40,
    fps,
    config: { damping: 80, stiffness: 100, mass: 0.5 },
  });

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Signal wave animations
  const signalStart = 70;
  const waveCount = 5;

  return (
    <SceneBackground>
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Title */}
      <div
        className="absolute top-12 left-0 right-0 text-center"
        style={{ opacity: titleOpacity }}
      >
        <h2 className="text-5xl font-bold text-white mb-3">Your Node Setup</h2>
        <p className="text-xl text-slate-400">
          A simple roof-mounted antenna connects you to the mesh
        </p>
      </div>

      {/* House visualization - centered */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: houseOpacity,
          transform: `scale(${houseScale})`,
        }}
      >
        <svg
          width="800"
          height="500"
          viewBox="0 0 800 500"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
        >
          {/* Ground line */}
          <line x1="50" y1="420" x2="750" y2="420" strokeDasharray="10 5" opacity="0.3" />

          {/* House wireframe */}
          {/* Main body */}
          <rect x="200" y="280" width="400" height="140" fill="none" opacity="0.8" />

          {/* Roof */}
          <polygon points="180,280 400,150 620,280" fill="none" opacity="0.8" />

          {/* Door */}
          <rect x="360" y="340" width="80" height="80" fill="none" opacity="0.6" />

          {/* Windows */}
          <rect x="240" y="310" width="60" height="50" fill="none" opacity="0.6" />
          <rect x="500" y="310" width="60" height="50" fill="none" opacity="0.6" />

          {/* Chimney */}
          <rect x="480" y="180" width="40" height="60" fill="none" opacity="0.6" />

          {/* Antenna pole on roof */}
          <g style={{ transform: `scaleY(${antennaGrow})`, transformOrigin: "320px 150px" }}>
            {/* Pole */}
            <line x1="320" y1="150" x2="320" y2="50" strokeWidth="3" stroke="#f97316" />

            {/* Antenna element */}
            <line x1="300" y1="60" x2="340" y2="60" strokeWidth="3" stroke="#f97316" />
            <line x1="305" y1="75" x2="335" y2="75" strokeWidth="2" stroke="#f97316" />
            <line x1="310" y1="90" x2="330" y2="90" strokeWidth="2" stroke="#f97316" />

            {/* Node box */}
            <rect x="310" y="100" width="20" height="15" fill="#f97316" stroke="#f97316" />
          </g>

          {/* Signal waves emanating from antenna */}
          {Array.from({ length: waveCount }).map((_, i) => {
            const waveFrame = frame - signalStart - i * 15;
            if (waveFrame < 0) return null;

            const waveProgress = interpolate(waveFrame % 60, [0, 60], [0, 1], {
              extrapolateRight: "clamp",
            });
            const waveOpacity = interpolate(waveProgress, [0, 0.3, 1], [0, 0.8, 0]);
            const waveRadius = 30 + waveProgress * 200;

            return (
              <circle
                key={i}
                cx="320"
                cy="60"
                r={waveRadius}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
                opacity={waveOpacity}
              />
            );
          })}
        </svg>
      </div>

      {/* Labels */}
      <div
        className="absolute bottom-32 left-0 right-0 flex justify-center gap-16"
        style={{
          opacity: interpolate(frame, [80, 110], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-orange-500" />
          <span className="text-slate-300 text-lg">LoRa Antenna</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-cyan-400" />
          <span className="text-slate-300 text-lg">Signal Broadcast</span>
        </div>
      </div>

      {/* Bottom text */}
      <div
        className="absolute bottom-12 left-0 right-0 text-center"
        style={{
          opacity: interpolate(frame, [100, 130], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <p className="text-xl text-slate-400">
          Typical range: <span className="text-cyan-400 font-bold">1-5 km</span> depending on terrain
        </p>
      </div>
    </SceneBackground>
  );
};
