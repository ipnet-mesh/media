import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneBackground } from "../components/SceneBackground";

interface NodePosition {
  x: number;
  y: number;
  id: string;
}

interface SignalPacket {
  fromNode: number;
  toNode: number;
  startFrame: number;
  duration: number;
}

const nodes: NodePosition[] = [
  { x: 50, y: 20, id: "Origin" },
  { x: 25, y: 40, id: "A" },
  { x: 75, y: 40, id: "B" },
  { x: 10, y: 65, id: "C" },
  { x: 40, y: 65, id: "D" },
  { x: 60, y: 65, id: "E" },
  { x: 90, y: 65, id: "F" },
  { x: 25, y: 85, id: "G" },
  { x: 75, y: 85, id: "H" },
];

const connections: [number, number][] = [
  [0, 1], [0, 2],
  [1, 2], [1, 3], [1, 4],
  [2, 5], [2, 6],
  [3, 7], [4, 7],
  [5, 8], [6, 8],
];

// Signal propagation sequence
const signalSequence: SignalPacket[] = [
  // Wave 1: Origin sends
  { fromNode: 0, toNode: 1, startFrame: 60, duration: 30 },
  { fromNode: 0, toNode: 2, startFrame: 60, duration: 30 },
  // Wave 2: A and B repeat
  { fromNode: 1, toNode: 3, startFrame: 100, duration: 30 },
  { fromNode: 1, toNode: 4, startFrame: 100, duration: 30 },
  { fromNode: 2, toNode: 5, startFrame: 100, duration: 30 },
  { fromNode: 2, toNode: 6, startFrame: 100, duration: 30 },
  // Wave 3: C, D, E, F repeat
  { fromNode: 3, toNode: 7, startFrame: 140, duration: 30 },
  { fromNode: 4, toNode: 7, startFrame: 145, duration: 30 },
  { fromNode: 5, toNode: 8, startFrame: 140, duration: 30 },
  { fromNode: 6, toNode: 8, startFrame: 145, duration: 30 },
];

const MeshNode: React.FC<{
  x: number;
  y: number;
  id: string;
  delay: number;
  isActive: boolean;
  isOrigin: boolean;
}> = ({ x, y, id, delay, isActive, isOrigin }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodeScale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100, stiffness: 200, mass: 0.5 },
  });

  const pulseScale = isActive ? 1 + Math.sin(frame * 0.2) * 0.1 : 1;

  const ringOpacity = isActive
    ? interpolate((frame % 40), [0, 40], [0.8, 0], { extrapolateRight: "clamp" })
    : 0;
  const ringScale = isActive
    ? interpolate((frame % 40), [0, 40], [1, 2.5], { extrapolateRight: "clamp" })
    : 1;

  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${nodeScale * pulseScale})`,
      }}
    >
      {/* Pulse ring for active nodes */}
      {isActive && (
        <div
          className="absolute w-12 h-12 rounded-full border-2 border-cyan-400"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${ringScale})`,
            opacity: ringOpacity,
          }}
        />
      )}

      {/* Node circle */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
          isOrigin
            ? "bg-gradient-to-br from-orange-400 to-red-500"
            : isActive
            ? "bg-gradient-to-br from-cyan-400 to-blue-500"
            : "bg-slate-600"
        }`}
        style={{
          boxShadow: isActive
            ? "0 0 20px 5px rgba(34, 211, 238, 0.5)"
            : isOrigin
            ? "0 0 20px 5px rgba(251, 146, 60, 0.5)"
            : "none",
        }}
      >
        {id}
      </div>
    </div>
  );
};

const SignalDot: React.FC<{
  packet: SignalPacket;
}> = ({ packet }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [packet.startFrame, packet.startFrame + packet.duration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (frame < packet.startFrame || frame > packet.startFrame + packet.duration + 10) {
    return null;
  }

  const fromNode = nodes[packet.fromNode];
  const toNode = nodes[packet.toNode];
  const x = fromNode.x + (toNode.x - fromNode.x) * progress;
  const y = fromNode.y + (toNode.y - fromNode.y) * progress;

  const opacity = progress < 1 ? 1 : interpolate(
    frame - packet.startFrame - packet.duration,
    [0, 10],
    [1, 0],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      className="absolute w-4 h-4 rounded-full bg-cyan-300"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        boxShadow: "0 0 15px 5px rgba(34, 211, 238, 0.8)",
        opacity,
      }}
    />
  );
};

export const MeshFlowScene: React.FC = () => {
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

  const subtitleOpacity = interpolate(frame, [180, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Determine which nodes are active based on signal sequence
  const activeNodes = new Set<number>();
  activeNodes.add(0); // Origin always active

  signalSequence.forEach((packet) => {
    if (frame >= packet.startFrame + packet.duration) {
      activeNodes.add(packet.toNode);
    }
  });

  return (
    <SceneBackground>
      {/* Title */}
      <div
        className="absolute top-12 left-0 right-0 text-center"
        style={{
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleY) * 30}px)`,
        }}
      >
        <h2 className="text-5xl font-bold text-white mb-3">How Mesh Networking Works</h2>
        <p className="text-xl text-slate-400">
          Signals flow to nearest nodes and are <span className="text-cyan-400">repeated</span> across the network
        </p>
      </div>

      {/* Network visualization */}
      <div className="absolute inset-0 top-32 bottom-24">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full">
          {connections.map(([from, to], i) => {
            const fromNode = nodes[from];
            const toNode = nodes[to];
            const isActive = activeNodes.has(from) && activeNodes.has(to);

            return (
              <line
                key={i}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={isActive ? "#22d3ee" : "#475569"}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? "none" : "5 5"}
                opacity={isActive ? 0.6 : 0.3}
              />
            );
          })}
        </svg>

        {/* Signal packets */}
        {signalSequence.map((packet, i) => (
          <SignalDot key={i} packet={packet} />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <MeshNode
            key={i}
            x={node.x}
            y={node.y}
            id={node.id}
            delay={10 + i * 5}
            isActive={activeNodes.has(i)}
            isOrigin={i === 0}
          />
        ))}
      </div>

      {/* Subtitle explanation */}
      <div
        className="absolute bottom-12 left-0 right-0 text-center"
        style={{ opacity: subtitleOpacity }}
      >
        <p className="text-2xl text-cyan-400 font-medium">
          Each node extends the network's reach
        </p>
      </div>
    </SceneBackground>
  );
};
