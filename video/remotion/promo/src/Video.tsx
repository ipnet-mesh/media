import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { WelcomeScene } from "./scenes/WelcomeScene";
import { MeshFlowScene } from "./scenes/MeshFlowScene";
import { HouseAntennaScene } from "./scenes/HouseAntennaScene";
import { SuffolkMapScene } from "./scenes/SuffolkMapScene";
import { MeshCoreOverviewScene } from "./scenes/MeshCoreOverviewScene";
import { HardwareScene } from "./scenes/HardwareScene";
import { JoinNetworkScene } from "./scenes/JoinNetworkScene";
import { MeshCoreHubScene } from "./scenes/MeshCoreHubScene";
import { OutroScene } from "./scenes/OutroScene";

const TRANSITION_DURATION = 20;

export const Video: React.FC = () => {
  return (
    <AbsoluteFill className="bg-slate-950">
      <Audio src={staticFile("narration.mp3")} />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={168}>
          <WelcomeScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={228}>
          <SuffolkMapScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={348}>
          <MeshFlowScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={468}>
          <MeshCoreOverviewScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={258}>
          <HardwareScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={228}>
          <HouseAntennaScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={258}>
          <MeshCoreHubScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={235}>
          <JoinNetworkScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={200}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
