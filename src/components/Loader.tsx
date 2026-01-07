import logo from "/logo/Logo-Vertikal-Telkom-University.webp";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-neutral-dark">
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full border-4 border-white/20 border-t-white animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={logo}
              alt="Logo"
              className="w-20 h-20 object-contain animate-[logoFloat_1.2s_ease-in-out_infinite] rounded-full bg-white"
            />
          </div>
        </div>
        <div className="text-white text-xs tracking-[0.25em] animate-[logoFloat_1.2s_ease-in-out_infinite] opacity-80">
          LOADING . . .
        </div>
        <style>{`
          @keyframes logoFloat {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.9; }
            50%      { transform: translateY(-10px) scale(1.03); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}
