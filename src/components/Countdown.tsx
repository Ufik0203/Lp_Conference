import { useEffect, useMemo, useState } from "react";

type CountdownTime = { days: number; hours: number; minutes: number };

function calc(distance: number): CountdownTime {
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, minutes };
}

const Countdown = ({
  targetISO,
  classNameLive,
  classNameUpcoming,
}: {
  targetISO: string;
  classNameLive?: string;
  classNameUpcoming?: string;
}) => {
  const targetMs = useMemo(() => new Date(targetISO).getTime(), [targetISO]);

  const [timeLeft, setTimeLeft] = useState<CountdownTime | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    setIsLive(false);
    setTimeLeft(null);

    const tick = () => {
      const now = Date.now();
      const distance = targetMs - now;

      if (distance <= 0) {
        setIsLive(true);
        setTimeLeft(null);
      } else {
        setIsLive(false);
        setTimeLeft(calc(distance));
      }
    };

    tick();

    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [targetMs]);

  if (isLive) {
    return (
      <div
        className={`p-1 sm:p-2 bg-neutral-dark border-4 rounded-xl border-secondary-accent ${classNameLive}`}
      >
        <h1 className="sm:text-4xl font-bold text-secondary-accent animate-pulse text-center">
          Event is Live !
        </h1>
      </div>
    );
  }

  if (!timeLeft) return null;

  return (
    <div
      className={`flex gap-1 items-center text-center ${classNameUpcoming}`}
    >
      <div className="bg-neutral-dark p-2.5 sm:p-3 2xl:w-full rounded-xl border-2 text-secondary-accent">
        <h1 className="text-sm sm:text-lg font-bold animate-pulse">
          Event starts in
        </h1>
      </div>
      <div className="flex gap-1 sm:gap-2">
        <TimeBox label="Days" value={timeLeft.days} />
        <TimeBox label="Hours" value={timeLeft.hours} />
        <TimeBox label="Minutes" value={timeLeft.minutes} />
      </div>
    </div>
  );
};

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="px-3 py-1 sm:py-2 bg-neutral-dark text-white rounded-xl min-w-15 border-2 border-secondary-accent">
      <div className="text-xs sm:text-sm font-bold">{value}</div>
      <div className="text-xs opacity-70">{label}</div>
    </div>
  );
}

export default Countdown;
