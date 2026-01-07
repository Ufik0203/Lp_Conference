import React, { useEffect, useLayoutEffect, useRef } from "react";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 1 | -1;
  repeat?: number;
  gapClass?: string;
};

const Marquee = ({
  children,
  className,
  speed = 0,
  direction = -1,
  repeat = 40,
  gapClass = "gap-30",
}: MarqueeProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const xRef = useRef(0);
  const halfRef = useRef(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const update = () => {
      const half = el.scrollWidth / 2;
      halfRef.current = half;
      xRef.current = direction === 1 ? -half : 0;

      el.style.transform = `translate3d(${xRef.current}px,0,0)`;
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    return () => ro.disconnect();
  }, [direction, repeat, children, gapClass]);

  useEffect(() => {
    if (!ref.current) return;

    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const el = ref.current;
      if (!el) return;

      const dt = Math.min((now - last) / 1000, 0.033);
      last = now;

      const half = halfRef.current || el.scrollWidth / 2;

      xRef.current += direction * speed * dt;

      if (direction === -1) {
        if (xRef.current <= -half) xRef.current += half;
      } else {
        if (xRef.current >= 0) xRef.current -= half;
      }

      el.style.transform = `translate3d(${xRef.current}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [speed, direction]);

  return (
    <div className={`w-full overflow-hidden ${className ?? ""}`}>
      <div
        ref={ref}
        className={`flex w-max whitespace-nowrap items-center ${gapClass}`}
      >
        {[...Array(repeat), ...Array(repeat)].map((_, i) => (
          <span key={i} className="shrink-0">
            {children}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
