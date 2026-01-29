import "./index.css";
import { Composition } from "remotion";
import { Video } from "./Video";

// Total duration: 135 + 165 + 195 + 210 + 315 + 150 + 150 + 150 + 330 + 225 + 450 - (10 × 15 transitions) = 2325 frames = 77.5 seconds at 30fps
const TOTAL_DURATION = 2325;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="main"
        component={Video}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
