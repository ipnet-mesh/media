import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Background, Terminal, Header } from "../components";

const PHASE_DURATION = 90;
const TRANSITION_DURATION = 15;

const jsCode = `const greet = (name) => {
  // Return a friendly greeting
  return \`Hello, \${name}!\`;
};

const users = ["Alice", "Bob", "Charlie"];

users.forEach((user) => {
  console.log(greet(user));
});`;

const tsCode = `interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch("/api/users");
  return response.json();
}

export default fetchUsers;`;

const pythonCode = `def fibonacci(n: int) -> list[int]:
    """Generate Fibonacci sequence."""
    if n <= 0:
        return []

    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])

    return sequence[:n]

# Generate first 10 numbers
print(fibonacci(10))`;

const bashCode = `#!/bin/bash

# Deploy script
echo "Starting deployment..."

for service in api web worker; do
  echo "Deploying $service..."
  docker-compose up -d $service
done

echo "Deployment complete!"`;

interface TerminalPhaseProps {
  title: string;
  code: string;
  language: "javascript" | "typescript" | "python" | "bash";
  theme: "dark" | "darker";
  typewriter?: boolean;
  typeSpeed?: number;
}

const TerminalPhase: React.FC<TerminalPhaseProps> = ({
  title,
  code,
  language,
  theme,
  typewriter = false,
  typeSpeed = 3,
}) => (
  <Background mode="gradient" palette="dark">
    <Header
      title="Terminal Component"
      subtitle="Syntax highlighted code display"
      level="info"
      animateIn={true}
    />
    <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: 200 }}>
      <Terminal
        title={title}
        code={code}
        language={language}
        theme={theme}
        delay={0}
        width={900}
        typewriter={typewriter}
        typeSpeed={typeSpeed}
      />
    </div>
  </Background>
);

export const TerminalDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <TerminalPhase title="example.js" code={jsCode} language="javascript" theme="dark" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <TerminalPhase title="types.ts" code={tsCode} language="typescript" theme="darker" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <TerminalPhase title="fibonacci.py" code={pythonCode} language="python" theme="dark" />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        <TransitionSeries.Sequence durationInFrames={PHASE_DURATION}>
          <TerminalPhase title="deploy.sh" code={bashCode} language="bash" theme="darker" typewriter={true} typeSpeed={3} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
