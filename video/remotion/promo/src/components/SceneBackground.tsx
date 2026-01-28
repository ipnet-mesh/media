import { AbsoluteFill } from "remotion";

interface SceneBackgroundProps {
  children: React.ReactNode;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({ children }) => {
  return (
    <AbsoluteFill className="overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      {children}
    </AbsoluteFill>
  );
};
