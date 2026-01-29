import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { BackgroundDemo } from "./scenes/BackgroundDemo";
import { HeaderDemo } from "./scenes/HeaderDemo";
import { NoIconDemo } from "./scenes/NoIconDemo";
import { PopupDemo } from "./scenes/PopupDemo";
import { TerminalDemo } from "./scenes/TerminalDemo";
import { TerminalFullscreen } from "./scenes/TerminalFullscreen";
import { TerminalLarge } from "./scenes/TerminalLarge";
import { CompositionDemo } from "./scenes/CompositionDemo";
import { ImageDemo } from "./scenes/ImageDemo";
import { MediaFrameDemo } from "./scenes/MediaFrameDemo";
import { OverlayDemo } from "./scenes/OverlayDemo";

const TRANSITION_DURATION = 15;

// TransitionSeries transitions OVERLAP, so duration = (phases × phaseDuration) - (transitions × transitionDuration)
// BackgroundDemo: 4 × 45 - 3 × 15 = 135
// HeaderDemo: 5 × 45 - 4 × 15 = 165
// NoIconDemo: 4 × 60 - 3 × 15 = 195
// TerminalDemo: 4 × 90 - 3 × 15 = 315
// ImageDemo: 3 × 120 - 2 × 15 = 330
// MediaFrameDemo: 2 × 120 - 1 × 15 = 225

export const Video: React.FC = () => {
  return (
    <AbsoluteFill className="bg-black">
      <TransitionSeries>
        {/* Scene 1: Background showcase */}
        <TransitionSeries.Sequence durationInFrames={135}>
          <BackgroundDemo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 2: Header levels with icon */}
        <TransitionSeries.Sequence durationInFrames={165}>
          <HeaderDemo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 3: Header levels without icon */}
        <TransitionSeries.Sequence durationInFrames={195}>
          <NoIconDemo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 4: Popup animations */}
        <TransitionSeries.Sequence durationInFrames={210}>
          <PopupDemo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 5: Terminal code display */}
        <TransitionSeries.Sequence durationInFrames={315}>
          <TerminalDemo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 6: Fullscreen terminal */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <TerminalFullscreen />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 7: Large font terminal */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <TerminalLarge />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 8: Full composition demo */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <CompositionDemo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 9: Image with MediaFrame demo */}
        <TransitionSeries.Sequence durationInFrames={330}>
          <ImageDemo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 10: MediaFrame with Terminal demo */}
        <TransitionSeries.Sequence durationInFrames={225}>
          <MediaFrameDemo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 11: Overlay demo */}
        <TransitionSeries.Sequence durationInFrames={450}>
          <OverlayDemo />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
