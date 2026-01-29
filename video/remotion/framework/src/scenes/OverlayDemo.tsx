import { Background, Header, Overlay } from "../components";

// Simple GitHub icon as SVG
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "100%", height: "100%", color: "#ffffff" }}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// Simple Twitter/X icon as SVG
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "100%", height: "100%", color: "#ffffff" }}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Simple YouTube icon as SVG
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "100%", height: "100%", color: "#ff0000" }}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const OverlayDemo: React.FC = () => {
  return (
    <Background mode="gradient" palette="dark">
      <Header
        title="Overlay Component"
        subtitle="Animated toast notifications for videos"
        level="info"
        animateIn={true}
      />

      {/* GitHub overlay - slides up from bottom center */}
      <Overlay
        icon={<GitHubIcon />}
        text="github.com/ipnet-mesh"
        subtext="Check out our open source projects"
        align="center"
        showAt={30}
        hideAt={120}
        animationIn="slideUp"
        animationOut="fade"
        backgroundColor="rgba(36, 41, 46, 0.95)"
        borderColor="rgba(255, 255, 255, 0.1)"
      />

      {/* Twitter overlay - slides in from left */}
      <Overlay
        icon={<TwitterIcon />}
        text="@ipnet_mesh"
        subtext="Follow us for updates"
        align="left"
        showAt={150}
        hideAt={240}
        animationIn="slide"
        animationOut="slide"
        backgroundColor="rgba(0, 0, 0, 0.9)"
        borderColor="rgba(29, 155, 240, 0.5)"
      />

      {/* YouTube overlay - slides in from right */}
      <Overlay
        icon={<YouTubeIcon />}
        text="Subscribe to our channel"
        align="right"
        showAt={270}
        hideAt={360}
        animationIn="slide"
        animationOut="fade"
        backgroundColor="rgba(40, 40, 40, 0.95)"
        borderColor="rgba(255, 0, 0, 0.3)"
        iconSize={56}
        fontSize={36}
      />

      {/* Custom colored overlay - scales in */}
      <Overlay
        text="Thanks for watching!"
        subtext="Like and subscribe for more content"
        align="center"
        showAt={390}
        animationIn="scale"
        backgroundColor="rgba(59, 130, 246, 0.9)"
        borderColor="rgba(147, 197, 253, 0.5)"
        textColor="#ffffff"
        subtextColor="#bfdbfe"
        fontSize={40}
        subtextSize={28}
        padding={32}
        borderRadius={20}
      />
    </Background>
  );
};
