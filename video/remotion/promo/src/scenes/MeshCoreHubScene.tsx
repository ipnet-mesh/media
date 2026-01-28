import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneBackground } from "../components/SceneBackground";

interface ArchitectureBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  subtitle: string;
  color: string;
  delay: number;
  icon: React.ReactNode;
}

const ArchitectureBox: React.FC<ArchitectureBoxProps> = ({
  x,
  y,
  width,
  height,
  title,
  subtitle,
  color,
  delay,
  icon,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame - delay, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100, stiffness: 150, mass: 0.5 },
  });

  return (
    <g
      style={{
        opacity,
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        transformOrigin: `${x + width / 2}px ${y + height / 2}px`,
      }}
    >
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={12}
        fill={`${color}15`}
        stroke={color}
        strokeWidth={2}
      />
      <foreignObject x={0} y={0} width={width} height={height}>
        <div className="w-full h-full flex flex-col items-center justify-center p-3">
          <div className="mb-2">{icon}</div>
          <p className="text-white font-bold text-sm text-center">{title}</p>
          <p className="text-slate-400 text-xs text-center">{subtitle}</p>
        </div>
      </foreignObject>
    </g>
  );
};

export const MeshCoreHubScene: React.FC = () => {
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

  // Per-segment arrow opacities - appear after target nodes are visible
  const arrowsLoRaOpacity = interpolate(frame, [65, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrowsMqttOpacity = interpolate(frame, [85, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrowsCollDbOpacity = interpolate(frame, [105, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrowsDbApiOpacity = interpolate(frame, [125, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const arrowsApiDashOpacity = interpolate(frame, [145, 165], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bottomOpacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Arrow animation
  const arrowDashOffset = -frame * 2;

  return (
    <SceneBackground>
      {/* Title */}
      <div
        className="absolute top-10 left-0 right-0 text-center"
        style={{
          opacity: titleOpacity,
          transform: `translateY(${(1 - titleY) * 30}px)`,
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8" />
              <path d="M12 17v4" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-white">
            MeshCore <span className="text-cyan-400">Hub</span>
          </h2>
        </div>
        <p className="text-lg text-slate-400">
          IPNet's infrastructure for network monitoring & data aggregation
        </p>
      </div>

      {/* Architecture diagram */}
      <div className="absolute top-32 left-0 right-0 bottom-28 flex items-center justify-center">
        <svg width="1100" height="500" viewBox="0 0 1100 500">
          {/* Connection arrows with animation */}
          {/* Mesh Nodes to Receivers (LoRa/RF) */}
          <g style={{ opacity: arrowsLoRaOpacity }}>
            <path d="M 130 150 L 180 150" fill="none" stroke="#f97316" strokeWidth={2} strokeDasharray="8 4" style={{ strokeDashoffset: arrowDashOffset }} />
            <path d="M 130 250 L 180 250" fill="none" stroke="#f97316" strokeWidth={2} strokeDasharray="8 4" style={{ strokeDashoffset: arrowDashOffset }} />
            <path d="M 130 350 L 180 350" fill="none" stroke="#f97316" strokeWidth={2} strokeDasharray="8 4" style={{ strokeDashoffset: arrowDashOffset }} />
            <text x="135" y="135" fill="#f97316" fontSize="10" fontFamily="sans-serif">LoRa/RF</text>
          </g>

          {/* Receivers to Collector (MQTT) */}
          <g style={{ opacity: arrowsMqttOpacity }}>
            <path d="M 310 150 C 360 150 360 250 390 250" fill="none" stroke="#22d3ee" strokeWidth={2} strokeDasharray="8 4" style={{ strokeDashoffset: arrowDashOffset }} />
            <path d="M 310 250 L 390 250" fill="none" stroke="#22d3ee" strokeWidth={2} strokeDasharray="8 4" style={{ strokeDashoffset: arrowDashOffset }} />
            <path d="M 310 350 C 360 350 360 250 390 250" fill="none" stroke="#22d3ee" strokeWidth={2} strokeDasharray="8 4" style={{ strokeDashoffset: arrowDashOffset }} />
            <text x="335" y="200" fill="#22d3ee" fontSize="10" fontFamily="sans-serif">MQTT</text>
          </g>

          {/* Collector to Database */}
          <g style={{ opacity: arrowsCollDbOpacity }}>
            <path d="M 530 250 L 570 250" fill="none" stroke="#a855f7" strokeWidth={2} strokeDasharray="8 4" style={{ strokeDashoffset: arrowDashOffset }} />
            <text x="535" y="240" fill="#a855f7" fontSize="10" fontFamily="sans-serif">Write</text>
          </g>

          {/* Database to API */}
          <g style={{ opacity: arrowsDbApiOpacity }}>
            <path d="M 710 250 L 750 250" fill="none" stroke="#22c55e" strokeWidth={2} strokeDasharray="8 4" style={{ strokeDashoffset: arrowDashOffset }} />
            <text x="715" y="240" fill="#22c55e" fontSize="10" fontFamily="sans-serif">Query</text>
          </g>

          {/* API to Dashboard */}
          <g style={{ opacity: arrowsApiDashOpacity }}>
            <path d="M 890 250 L 930 250" fill="none" stroke="#3b82f6" strokeWidth={2} strokeDasharray="8 4" style={{ strokeDashoffset: arrowDashOffset }} />
            <text x="893" y="240" fill="#3b82f6" fontSize="10" fontFamily="sans-serif">HTTP</text>
          </g>

          {/* Mesh Nodes (left side) */}
          <ArchitectureBox
            x={20}
            y={110}
            width={110}
            height={80}
            title="Mesh Node"
            subtitle="LoRa Device"
            color="#f97316"
            delay={20}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 5v2" />
                <path d="M12 17v2" />
                <path d="M5 12h2" />
                <path d="M17 12h2" />
              </svg>
            }
          />
          <ArchitectureBox
            x={20}
            y={210}
            width={110}
            height={80}
            title="Mesh Node"
            subtitle="LoRa Device"
            color="#f97316"
            delay={25}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 5v2" />
                <path d="M12 17v2" />
                <path d="M5 12h2" />
                <path d="M17 12h2" />
              </svg>
            }
          />
          <ArchitectureBox
            x={20}
            y={310}
            width={110}
            height={80}
            title="Mesh Node"
            subtitle="LoRa Device"
            color="#f97316"
            delay={30}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 5v2" />
                <path d="M12 17v2" />
                <path d="M5 12h2" />
                <path d="M17 12h2" />
              </svg>
            }
          />

          {/* Receivers */}
          <ArchitectureBox
            x={180}
            y={110}
            width={130}
            height={80}
            title="Receiver"
            subtitle="RF → MQTT"
            color="#22d3ee"
            delay={40}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2">
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4" />
                <circle cx="12" cy="12" r="2" />
                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4" />
                <path d="M19.1 4.9c3.9 3.9 3.9 10.3 0 14.2" />
              </svg>
            }
          />
          <ArchitectureBox
            x={180}
            y={210}
            width={130}
            height={80}
            title="Receiver"
            subtitle="RF → MQTT"
            color="#22d3ee"
            delay={45}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2">
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4" />
                <circle cx="12" cy="12" r="2" />
                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4" />
                <path d="M19.1 4.9c3.9 3.9 3.9 10.3 0 14.2" />
              </svg>
            }
          />
          <ArchitectureBox
            x={180}
            y={310}
            width={130}
            height={80}
            title="Receiver"
            subtitle="RF → MQTT"
            color="#22d3ee"
            delay={50}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2">
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4" />
                <circle cx="12" cy="12" r="2" />
                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4" />
                <path d="M19.1 4.9c3.9 3.9 3.9 10.3 0 14.2" />
              </svg>
            }
          />

          {/* Collector */}
          <ArchitectureBox
            x={390}
            y={200}
            width={140}
            height={100}
            title="Collector"
            subtitle="MQTT Aggregator"
            color="#a855f7"
            delay={70}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            }
          />

          {/* Database */}
          <ArchitectureBox
            x={570}
            y={200}
            width={140}
            height={100}
            title="Database"
            subtitle="SQL Database"
            color="#eab308"
            delay={90}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            }
          />

          {/* API */}
          <ArchitectureBox
            x={750}
            y={200}
            width={140}
            height={100}
            title="API Service"
            subtitle="HTTP/REST"
            color="#22c55e"
            delay={110}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                <path d="M18 20V10" />
                <path d="M12 20V4" />
                <path d="M6 20v-6" />
              </svg>
            }
          />

          {/* Dashboard */}
          <ArchitectureBox
            x={930}
            y={200}
            width={140}
            height={100}
            title="Dashboard"
            subtitle="ipnt.uk"
            color="#3b82f6"
            delay={130}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            }
          />
        </svg>
      </div>

      {/* Bottom description */}
      <div
        className="absolute bottom-8 left-0 right-0 px-20"
        style={{ opacity: bottomOpacity }}
      >
        <div className="flex justify-center gap-8">
          <div className="bg-slate-800/50 rounded-lg px-5 py-3 border border-slate-700/50">
            <p className="text-slate-300 text-sm">
              <span className="text-cyan-400 font-bold">Messages</span> • Advertisements • Network Stats
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg px-5 py-3 border border-slate-700/50">
            <p className="text-slate-300 text-sm">
              Open Source at <span className="text-cyan-400 font-bold">github.com/ipnet-mesh</span>
            </p>
          </div>
        </div>
      </div>
    </SceneBackground>
  );
};
