import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Background, Header, Popup } from "../components";
import { LevelName, PaletteName } from "../utils/palettes";

const PHASE_DURATION = 60;
const TRANSITION_DURATION = 15;

interface NoIconPhaseProps {
  title: string;
  subtitle: string;
  level: LevelName;
  palette: PaletteName;
  levelLabel: string;
  levelColor: string;
}

const NoIconPhase: React.FC<NoIconPhaseProps> = ({
  title,
  subtitle,
  level,
  palette,
  levelLabel,
  levelColor
}) => (
  <Background mode="gradient" palette={palette}>
    <Header
      title={title}
      subtitle={subtitle}
      level={level}
      animateIn={true}
    />
    <Popup showAt={0} preset="center" animation="scale" width={500}>
      <div className="text-center">
        <p className="text-3xl font-bold text-white mb-2">No Icon Header</p>
        <p className={`text-xl ${levelColor}`}>Level: {levelLabel}</p>
      </div>
    </Popup>
  </Background>
);

export const NoIconDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <NoIconPhase
            title="Breaking News"
            subtitle="Live coverage from the scene"
            level="default"
            palette="dark"
            levelLabel="default"
            levelColor="text-slate-400"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <NoIconPhase
            title="System Update"
            subtitle="New features available"
            level="info"
            palette="cool"
            levelLabel="info"
            levelColor="text-blue-400"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <NoIconPhase
            title="Weather Alert"
            subtitle="Heavy rain expected this evening"
            level="warn"
            palette="warm"
            levelLabel="warn"
            levelColor="text-yellow-400"
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <NoIconPhase
            title="Emergency Broadcast"
            subtitle="Please stand by for important information"
            level="emergency"
            palette="emergency"
            levelLabel="emergency"
            levelColor="text-red-400"
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
