import { Scene, Icon, Popup, Highlight } from "../components";

// Demo channel logo
const ChannelLogo: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#3b82f6" />
    <path d="M8 8h8v2H8zM8 12h6v2H8zM8 16h8v2H8z" fill="white" />
  </svg>
);

// Header icon
const NewsIcon: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
    <path d="M18 14h-8M18 18h-8M18 10h-8M18 6h-8" />
  </svg>
);

export const CompositionDemo: React.FC = () => {
  return (
    <Scene
      background={{
        mode: "animated",
        palette: "cool",
        animation: { type: "wave", speed: 0.02, intensity: 0.3 },
      }}
      header={{
        icon: (
          <Icon positioning="relative" size={72}>
            <NewsIcon />
          </Icon>
        ),
        title: "Framework Demo",
        subtitle: "All components working together",
        level: "info",
        animateIn: true,
      }}
      watermark={{
        children: <ChannelLogo />,
        preset: "bottom-right",
        size: 64,
        opacity: 0.7,
        animateIn: true,
        pulse: true,
      }}
    >
      {/* Main content popup */}
      <Popup showAt={30} preset="center" animation="scale" width={700} padding={32}>
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Complete <Highlight color="cyan">Scene</Highlight> Composition
          </h2>
          <p className="text-xl text-slate-300 mb-6">
            This demo showcases all framework components:
          </p>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <p className="text-cyan-400 font-semibold">Background</p>
              <p className="text-sm text-slate-400">Animated cool palette with wave effect</p>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <p className="text-cyan-400 font-semibold">Header</p>
              <p className="text-sm text-slate-400">Info level with icon, title & subtitle</p>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <p className="text-cyan-400 font-semibold">Watermark</p>
              <p className="text-sm text-slate-400">Bottom-right icon with pulse</p>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <p className="text-cyan-400 font-semibold">Popup</p>
              <p className="text-sm text-slate-400">Centered scale animation</p>
            </div>
          </div>
        </div>
      </Popup>

      {/* Secondary info popup */}
      <Popup
        showAt={90}
        preset="bottom-center"
        animation="slide-up"
        width={500}
        backgroundColor="rgba(30, 58, 138, 0.95)"
      >
        <div className="text-center">
          <p className="text-lg text-blue-200">
            Multiple popups can appear simultaneously with different timings
          </p>
        </div>
      </Popup>
    </Scene>
  );
};
