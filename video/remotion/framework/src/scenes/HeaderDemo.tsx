import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Background, Header, Icon, Popup } from "../components";
import { LevelName } from "../utils/palettes";

const PHASE_DURATION = 45;
const TRANSITION_DURATION = 15;

const DemoLogo: React.FC<{ color?: string }> = ({ color = "white" }) => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

interface HeaderPhaseProps {
  level: LevelName;
  title: string;
  subtitle?: string;
  iconColor: string;
}

const HeaderPhase: React.FC<HeaderPhaseProps> = ({ level, title, subtitle, iconColor }) => (
  <Background mode="gradient" palette="dark">
    <Header
      icon={
        <Icon positioning="relative" size={72}>
          <DemoLogo color={iconColor} />
        </Icon>
      }
      title={title}
      subtitle={subtitle}
      level={level}
      position="top"
      animateIn={true}
      animateInDelay={0}
    />
    <Popup showAt={0} preset="center" animation="scale">
      <div className="text-center">
        <p className="text-2xl font-bold text-white mb-2">Header Level:</p>
        <p
          className={`text-4xl font-bold ${
            level === "emergency"
              ? "text-red-400"
              : level === "warn"
              ? "text-yellow-400"
              : level === "info"
              ? "text-blue-400"
              : "text-slate-400"
          }`}
        >
          {level.toUpperCase()}
        </p>
        {!subtitle && (
          <p className="text-lg text-slate-500 mt-2">(No subtitle - title fills space)</p>
        )}
      </div>
    </Popup>
  </Background>
);

export const HeaderDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <HeaderPhase level="default" title="Default Header" subtitle="Standard styling with icon" iconColor="#94a3b8" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <HeaderPhase level="info" title="Information Update" subtitle="Blue accent for informational content" iconColor="#93c5fd" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <HeaderPhase level="warn" title="Warning Notice" subtitle="Amber accent for warnings" iconColor="#fcd34d" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <HeaderPhase level="emergency" title="Emergency Alert" subtitle="Red pulsing for critical alerts" iconColor="#fca5a5" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <HeaderPhase level="default" title="Title Only Mode" subtitle={undefined} iconColor="#94a3b8" />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
