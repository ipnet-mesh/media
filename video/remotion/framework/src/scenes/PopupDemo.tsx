import { Background, Popup } from "../components";

export const PopupDemo: React.FC = () => {
  return (
    <Background
      mode="gradient"
      gradient={{
        type: "linear",
        angle: 135,
        colors: ["#1e1b4b", "#312e81", "#4338ca"],
      }}
    >
      {/* Center popup - scale animation */}
      <Popup showAt={0} hideAt={140} preset="center" animation="scale" width={400}>
        <div className="text-center">
          <p className="text-3xl font-bold text-white mb-2">Scale Animation</p>
          <p className="text-lg text-slate-300">Center position with scale-in effect</p>
        </div>
      </Popup>

      {/* Top-left popup - slide from left */}
      <Popup showAt={30} hideAt={140} preset="top-left" animation="slide-left" width={300}>
        <div>
          <p className="text-xl font-bold text-white mb-1">Slide Left</p>
          <p className="text-sm text-slate-300">Top-left corner</p>
        </div>
      </Popup>

      {/* Top-right popup - slide from right */}
      <Popup showAt={45} hideAt={140} preset="top-right" animation="slide-right" width={300}>
        <div>
          <p className="text-xl font-bold text-white mb-1">Slide Right</p>
          <p className="text-sm text-slate-300">Top-right corner</p>
        </div>
      </Popup>

      {/* Bottom-left popup - slide up */}
      <Popup showAt={60} hideAt={140} preset="bottom-left" animation="slide-up" width={300}>
        <div>
          <p className="text-xl font-bold text-white mb-1">Slide Up</p>
          <p className="text-sm text-slate-300">Bottom-left corner</p>
        </div>
      </Popup>

      {/* Bottom-right popup - slide down */}
      <Popup showAt={75} hideAt={140} preset="bottom-right" animation="slide-down" width={300}>
        <div>
          <p className="text-xl font-bold text-white mb-1">Slide Down</p>
          <p className="text-sm text-slate-300">Bottom-right corner</p>
        </div>
      </Popup>

      {/* Second wave - fade animation */}
      <Popup showAt={150} preset="center" animation="fade" width={500}>
        <div className="text-center">
          <p className="text-4xl font-bold text-white mb-3">Fade Animation</p>
          <p className="text-lg text-slate-300">
            Simple opacity fade-in effect
          </p>
          <div className="mt-4 p-4 bg-indigo-500/30 rounded-lg">
            <p className="text-indigo-200">Popups can contain any content!</p>
          </div>
        </div>
      </Popup>
    </Background>
  );
};
