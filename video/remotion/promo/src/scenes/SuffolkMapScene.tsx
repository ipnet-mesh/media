import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneBackground } from "../components/SceneBackground";

// Simplified Suffolk outline (approximate shape)
const suffolkPath = `
  M 150,180
  L 280,120
  L 420,100
  L 550,130
  L 620,180
  L 680,220
  L 700,300
  L 650,380
  L 550,420
  L 400,440
  L 280,420
  L 180,380
  L 120,300
  L 130,220
  Z
`;

// Node locations in Suffolk (approximate positions)
const suffolkNodes = [
  { x: 400, y: 270, name: "Ipswich", delay: 30 },
  { x: 280, y: 240, name: "Stowmarket", delay: 45 },
  { x: 520, y: 200, name: "Woodbridge", delay: 50 },
  { x: 220, y: 320, name: "Sudbury", delay: 60 },
  { x: 350, y: 180, name: "Eye", delay: 55 },
  { x: 580, y: 300, name: "Felixstowe", delay: 65 },
  { x: 450, y: 380, name: "Hadleigh", delay: 70 },
  { x: 300, y: 380, name: "Long Melford", delay: 75 },
];

// Connections between nodes
const nodeConnections = [
  [0, 1], [0, 2], [0, 6],
  [1, 3], [1, 4],
  [2, 5], [2, 0],
  [3, 7], [6, 7],
  [4, 1], [5, 6],
];

interface SignalPath {
  from: number;
  to: number;
  startFrame: number;
}

const signalPaths: SignalPath[] = [
  { from: 0, to: 1, startFrame: 80 },
  { from: 0, to: 2, startFrame: 85 },
  { from: 1, to: 4, startFrame: 110 },
  { from: 1, to: 3, startFrame: 115 },
  { from: 2, to: 5, startFrame: 120 },
  { from: 3, to: 7, startFrame: 145 },
  { from: 0, to: 6, startFrame: 130 },
  { from: 6, to: 7, startFrame: 160 },
];

export const SuffolkMapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mapOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const mapScale = spring({
    frame,
    fps,
    config: { damping: 100, stiffness: 120, mass: 0.6 },
  });

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Track which nodes have received signals
  const activeNodes = new Set<number>([0]); // Start with Ipswich active
  signalPaths.forEach((path) => {
    if (frame >= path.startFrame + 30) {
      activeNodes.add(path.to);
    }
  });

  return (
    <SceneBackground>
      {/* Title */}
      <div
        className="absolute top-10 left-0 right-0 text-center z-10"
        style={{ opacity: titleOpacity }}
      >
        <h2 className="text-5xl font-bold text-white mb-2">IPNet in Suffolk</h2>
        <p className="text-xl text-slate-400">
          Growing mesh coverage across the county
        </p>
      </div>

      {/* Map container */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          opacity: mapOpacity,
          transform: `scale(${mapScale})`,
        }}
      >
        <svg width="900" height="550" viewBox="0 0 800 500">
          {/* Suffolk outline */}
          <path
            d={suffolkPath}
            fill="rgba(34, 211, 238, 0.05)"
            stroke="#22d3ee"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* County label */}
          <text
            x="400"
            y="500"
            textAnchor="middle"
            fill="#64748b"
            fontSize="18"
            fontFamily="sans-serif"
          >
            SUFFOLK, UK
          </text>

          {/* Connection lines */}
          {nodeConnections.map(([from, to], i) => {
            const fromNode = suffolkNodes[from];
            const toNode = suffolkNodes[to];
            const isActive = activeNodes.has(from) && activeNodes.has(to);

            return (
              <line
                key={i}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isActive ? "#22d3ee" : "#475569"}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? "none" : "4 4"}
                opacity={isActive ? 0.7 : 0.3}
              />
            );
          })}

          {/* Signal animations */}
          {signalPaths.map((path, i) => {
            const progress = interpolate(
              frame,
              [path.startFrame, path.startFrame + 30],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            if (frame < path.startFrame || progress > 1) return null;

            const fromNode = suffolkNodes[path.from];
            const toNode = suffolkNodes[path.to];
            const x = fromNode.x + (toNode.x - fromNode.x) * progress;
            const y = fromNode.y + (toNode.y - fromNode.y) * progress;

            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="6"
                fill="#22d3ee"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.8))",
                }}
              />
            );
          })}

          {/* Node points */}
          {suffolkNodes.map((node, i) => {
            const nodeOpacity = interpolate(
              frame - node.delay,
              [0, 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            const isActive = activeNodes.has(i);
            const pulseScale = isActive ? 1 + Math.sin(frame * 0.15) * 0.15 : 1;

            return (
              <g key={i} opacity={nodeOpacity}>
                {/* Pulse ring for active nodes */}
                {isActive && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={12 + ((frame * 0.5) % 20)}
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="1"
                    opacity={0.5 - ((frame * 0.5) % 20) / 40}
                  />
                )}

                {/* Node dot */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={8 * pulseScale}
                  fill={isActive ? "#22d3ee" : "#64748b"}
                  style={{
                    filter: isActive
                      ? "drop-shadow(0 0 10px rgba(34, 211, 238, 0.8))"
                      : "none",
                  }}
                />

                {/* Node label */}
                <text
                  x={node.x}
                  y={node.y - 18}
                  textAnchor="middle"
                  fill={isActive ? "#22d3ee" : "#94a3b8"}
                  fontSize="12"
                  fontFamily="sans-serif"
                  fontWeight={isActive ? "bold" : "normal"}
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Stats overlay */}
      <div
        className="absolute bottom-12 left-0 right-0 flex justify-center gap-16"
        style={{
          opacity: interpolate(frame, [150, 180], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div className="text-center">
          <p className="text-4xl font-bold text-cyan-400">60+</p>
          <p className="text-slate-400">Active Nodes</p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-cyan-400">Growing</p>
          <p className="text-slate-400">Network Coverage</p>
        </div>
      </div>
    </SceneBackground>
  );
};
