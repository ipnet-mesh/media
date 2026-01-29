import { Background, Terminal } from "../components";

const code = `const sum = (a: number, b: number): number => {
  return a + b;
};

console.log(sum(2, 3)); // Output: 5`;

export const TerminalLarge: React.FC = () => {
  return (
    <Background mode="solid" color="#0d1117">
      <div className="absolute inset-0 flex items-center justify-center p-16">
        <Terminal
          title="math.ts"
          code={code}
          language="typescript"
          theme="darker"
          width="100%"
          fontSize={42}
          padding={48}
          lineNumbers={true}
          delay={10}
        />
      </div>
    </Background>
  );
};
