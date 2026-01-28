import "./index.css";
import { Composition } from "remotion";
import { Video } from "./Video";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="main"
        component={Video}
        durationInFrames={2231}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
