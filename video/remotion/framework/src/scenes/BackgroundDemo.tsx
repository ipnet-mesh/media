import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Background, Popup } from "../components";

const PHASE_DURATION = 45;
const TRANSITION_DURATION = 15;

const SolidPhase: React.FC = () => (
  <Background mode="solid" color="#000000">
    <Popup showAt={0} preset="center" animation="fade">
      <div className="text-center">
        <p className="text-4xl font-bold text-white mb-2">Solid Background</p>
        <p className="text-xl text-slate-400">Simple black background</p>
      </div>
    </Popup>
  </Background>
);

const GradientPhase: React.FC = () => (
  <Background mode="gradient" palette="dark">
    <Popup showAt={0} preset="center" animation="fade">
      <div className="text-center">
        <p className="text-4xl font-bold text-white mb-2">Dark Gradient</p>
        <p className="text-xl text-slate-400">Palette: dark (linear)</p>
      </div>
    </Popup>
  </Background>
);

const RadialPhase: React.FC = () => (
  <Background
    mode="gradient"
    gradient={{
      type: "radial",
      colors: ["#0c4a6e", "#0369a1", "#0891b2"],
    }}
  >
    <Popup showAt={0} preset="center" animation="fade">
      <div className="text-center">
        <p className="text-4xl font-bold text-white mb-2">Radial Gradient</p>
        <p className="text-xl text-cyan-300">Cool blue tones</p>
      </div>
    </Popup>
  </Background>
);

const AnimatedPhase: React.FC = () => (
  <Background
    mode="animated"
    palette="emergency"
    animation={{ type: "pulse", speed: 0.05, intensity: 0.5 }}
  >
    <Popup showAt={0} preset="center" animation="fade">
      <div className="text-center">
        <p className="text-4xl font-bold text-white mb-2">Animated Pulse</p>
        <p className="text-xl text-red-300">Emergency palette with pulse</p>
      </div>
    </Popup>
  </Background>
);

export const BackgroundDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <SolidPhase />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <GradientPhase />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <RadialPhase />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <AnimatedPhase />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
