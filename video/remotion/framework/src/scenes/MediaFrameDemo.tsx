import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Background, Header, Terminal, MediaFrame } from "../components";
import { ContentPanel } from "../components/ContentPanel";

const PHASE_DURATION = 120;
const TRANSITION_DURATION = 15;

const codeSnippet = `const greet = (name: string) => {
  return \`Hello, \${name}!\`;
};

console.log(greet("World"));`;

const LeftPhase: React.FC = () => (
  <Background mode="gradient" palette="cool">
    <Header
      title="MediaFrame with Terminal"
      subtitle="Works with any content type"
      level="default"
      animateIn={true}
    />
    <MediaFrame align="left" rotateAngle={8} offsetX={80} offsetY={100} delay={0}>
      <Terminal
        title="greeting.ts"
        code={codeSnippet}
        language="typescript"
        theme="darker"
        width={850}
        fontSize={28}
        delay={0}
      />
    </MediaFrame>
    <ContentPanel
      side="right"
      title="Code Examples"
      content="Display syntax-highlighted code alongside explanatory text for tutorials and documentation videos."
      contentColor="#bfdbfe"
      offsetY={100}
      delay={10}
    />
  </Background>
);

const RightPhase: React.FC = () => (
  <Background mode="gradient" palette="cool">
    <Header
      title="MediaFrame with Terminal"
      subtitle="Works with any content type"
      level="default"
      animateIn={true}
    />
    <ContentPanel
      side="left"
      title="Flexible Layout"
      content="Position content on either side with automatic 3D perspective transforms for a professional look."
      contentColor="#bfdbfe"
      offsetY={100}
      delay={10}
    />
    <MediaFrame align="right" rotateAngle={8} offsetX={80} offsetY={100} delay={0}>
      <Terminal
        title="greeting.ts"
        code={codeSnippet}
        language="typescript"
        theme="darker"
        width={850}
        fontSize={28}
        delay={0}
      />
    </MediaFrame>
  </Background>
);

export const MediaFrameDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
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
