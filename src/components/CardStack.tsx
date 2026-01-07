import React from "react";

type Item = {
  id: string;
  title?: string;
  body?: string[];
  bgPict?: string;
  pict?: string;
};

type CardStackProps = {
  items?: Item[];
  active: number;
  onChangeActive: (i: number) => void;
  maxVisible?: number;
  children?: (ctx: {
    index: number;
    active: boolean;
    item?: Item;
  }) => React.ReactNode;
};

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function circularOffset(index: number, active: number, len: number) {
  const raw = index - active;
  const half = Math.floor(len / 2);
  let o = raw;
  if (o > half) o -= len;
  if (o < -half) o += len;
  return o;
}

const CardStack = ({
  items,
  active,
  onChangeActive,
  maxVisible = 5,
  children,
}: CardStackProps) => {
  const length = items?.length ?? 0;
  const safeActive = length ? mod(active, length) : 0;
  const half = Math.floor(maxVisible / 2);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <div
          className="relative w-full h-full overflow-hidden"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {Array.from({ length }).map((_, i) => {
            const item = items?.[i];
            const off = circularOffset(i, safeActive, length);
            const abs = Math.abs(off);
            const hidden = abs > half;
            const x = off * 220;
            const z = -Math.min(abs, half) * 160;
            const rotateY = off * -18;
            const scale = 1 - Math.min(abs, half) * 0.08;
            const opacity = hidden ? 0 : 1;
            const zIndex = 50 - Math.min(abs, half);

            return (
              <button
                key={item?.id ?? i}
                onClick={() => onChangeActive(i)}
                className="absolute left-1/2 top-1/2 w-[320px] text-left focus:outline-none"
                style={{
                  pointerEvents: hidden ? "none" : "auto",
                  zIndex,
                  transform: `translate3d(calc(-50% + ${x}px), -50%, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                  transformStyle: "preserve-3d",
                  opacity,
                  transition:
                    "transform 450ms cubic-bezier(.2,.8,.2,1), filter 450ms, opacity 450ms",
                  willChange: "transform",
                }}
              >
                <div
                  style={
                    item?.bgPict
                      ? { backgroundImage: `url(${item.bgPict})` }
                      : undefined
                  }
                  className={[
                    "rounded-3xl border border-primary-accent bg-primary-accent bg-cover bg-center select-none cursor-pointer text-neutral-dark relative flex flex-col",
                    "shadow-[0_18px_60px_rgba(0,0,0,0.18)]",
                    "sm:w-83 w-76",
                    off === 0
                      ? "ring-2 ring-black/10"
                      : "hover:shadow-[0_18px_80px_rgba(0,0,0,0.22)]",
                  ].join(" ")}
                >
                  <div className="absolute w-full h-full bg-white/60 top-0 left-0 rounded-3xl z-0" />
                  {children ? (
                    <div className="relative z-10 flex flex-col 2xl:h-130">
                      {children({ index: i, active: i === safeActive, item })}
                    </div>
                  ) : (
                    <div className="text-lg 2xl:text-xl h-95 sm:h-100 2xl:h-130 font-bold z-10 text-center sm:m-6 m-3">
                      {item?.title}
                      <ol className="mt-4 list-decimal list-outside pl-6 text-xs 2xl:text-sm font-extrabold leading-relaxed z-10 text-start">
                        {(item?.body ?? []).map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardStack;
