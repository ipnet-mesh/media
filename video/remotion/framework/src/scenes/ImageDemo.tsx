import { AbsoluteFill, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Background, Header, Image, MediaFrame } from "../components";
import { ContentPanel } from "../components/ContentPanel";

const bgImage = staticFile("images/bg.jpg");
const PHASE_DURATION = 120;
const TRANSITION_DURATION = 15;

const CenterPhase: React.FC = () => (
  <Background mode="gradient" palette="dark">
    <Header
      title="MediaFrame Component"
      subtitle="Flexible content positioning with 3D transforms"
      level="info"
      animateIn={true}
    />
    <MediaFrame align="center" offsetY={100} delay={0}>
      <Image
        src={bgImage}
        width={800}
        height={450}
        borderRadius={16}
        shadow={true}
        animate={false}
      />
    </MediaFrame>
  </Background>
);

const LeftPhase: React.FC = () => (
  <Background mode="gradient" palette="dark">
    <Header
      title="MediaFrame Component"
      subtitle="Flexible content positioning with 3D transforms"
      level="info"
      animateIn={true}
    />
    <MediaFrame align="left" rotateAngle={10} offsetX={80} offsetY={100} delay={0}>
      <Image
        src={bgImage}
        width={900}
        height={550}
        borderRadius={16}
        shadow={true}
        animate={false}
      />
    </MediaFrame>
    <ContentPanel
      side="right"
      title="Left Aligned"
      content="Content on the left with a 3D perspective angle, leaving space for text or other components on the right side."
      offsetY={100}
      delay={10}
    />
  </Background>
);

const RightPhase: React.FC = () => (
  <Background mode="gradient" palette="dark">
    <Header
      title="MediaFrame Component"
      subtitle="Flexible content positioning with 3D transforms"
      level="info"
      animateIn={true}
    />
    <ContentPanel
      side="left"
      title="Right Aligned"
      content="Content on the right with a 3D perspective angle, leaving space for text or other components on the left side."
      offsetY={100}
      delay={10}
    />
    <MediaFrame align="right" rotateAngle={10} offsetX={80} offsetY={100} delay={0}>
      <Image
        src={bgImage}
        width={900}
        height={550}
        borderRadius={16}
        shadow={true}
        animate={false}
      />
    </MediaFrame>
  </Background>
);

export const ImageDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <CenterPhase />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <LeftPhase />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <RightPhase />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
