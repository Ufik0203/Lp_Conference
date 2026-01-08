import { useEffect, useMemo, useState } from "react";

type CountdownTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calc(distance: number): CountdownTime {
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

const Countdown = ({
  targetISO,
  classNameLive,
  classNameUpcoming,
  styleLive,
  styleUpcoming,
  styleWrapperDL,
  styleDisplay,
  styleLabel,
}: {
  targetISO: string;
  classNameLive?: string;
  classNameUpcoming?: string;
  styleLive?: string;
  styleUpcoming?: string;
  styleWrapperDL?: string;
  styleDisplay?: string;
  styleLabel?: string;
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
        className={`font-bold bg-neutral-dark border-4 rounded-xl border-secondary-accent ${
          classNameLive ?? ""
        }`}
      >
        <h1
          className={`text-secondary-accent animate-pulse text-center ${
            styleLive ?? ""
          }`}
        >
          Event is Live !
        </h1>
      </div>
    );
  }

  if (!timeLeft) return null;

  return (
    <div
      className={`flex gap-1 items-center text-center ${
        classNameUpcoming ?? ""
      }`}
    >
      <div
        className={`bg-neutral-dark rounded-xl border-2 text-secondary-accent ${
          styleUpcoming ?? ""
        }`}
      >
        <h1 className="animate-pulse">Event starts in</h1>
      </div>

      <div className="flex gap-1 sm:gap-2">
        <TimeBox
          label="Days"
          value={timeLeft.days}
          styleWrapperDL={styleWrapperDL}
          styleDisplay={styleDisplay}
          styleLabel={styleLabel}
        />
        <TimeBox
          label="Hours"
          value={timeLeft.hours}
          styleWrapperDL={styleWrapperDL}
          styleDisplay={styleDisplay}
          styleLabel={styleLabel}
        />
        <TimeBox
          label="Minutes"
          value={timeLeft.minutes}
          styleWrapperDL={styleWrapperDL}
          styleDisplay={styleDisplay}
          styleLabel={styleLabel}
        />
        <TimeBox
          label="Seconds"
          value={timeLeft.seconds}
          styleWrapperDL={styleWrapperDL}
          styleDisplay={styleDisplay}
          styleLabel={styleLabel}
        />
      </div>
    </div>
  );
};

function TimeBox({
  label,
  value,
  styleWrapperDL,
  styleDisplay,
  styleLabel,
}: {
  label: string;
  value: number;
  styleWrapperDL?: string;
  styleDisplay?: string;
  styleLabel?: string;
}) {
  const display = String(value).padStart(2, "0");

  return (
    <div
      className={`bg-neutral-dark text-white rounded-xl border-2 border-secondary-accent ${
        styleWrapperDL ?? ""
      }`}
    >
      <div className={`font-bold ${styleDisplay ?? ""}`}>
        {display}
      </div>
      <div className={`opacity-70 ${styleLabel ?? ""}`}>{label}</div>
    </div>
  );
}

export default Countdown;
