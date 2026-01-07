import * as React from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

type Slide = {
  id: string;
  content: React.ReactNode;
};

type Props = {
  slides: Slide[];
  autoDelayMs?: number;
  pauseAfterInteractionMs?: number;
  className?: string;
};

const CarouselPlugin = ({
  slides,
  autoDelayMs = 2000,
  pauseAfterInteractionMs = 5000,
  className = "",
}: Props) => {
  const [index, setIndex] = React.useState(0);

  const intervalRef = React.useRef<number | null>(null);
  const resumeTimeoutRef = React.useRef<number | null>(null);

  const clampIndex = React.useCallback(
    (i: number) => {
      const n = slides.length;
      if (n === 0) return 0;
      return ((i % n) + n) % n;
    },
    [slides.length]
  );

  const stopAutoplay = React.useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoplay = React.useCallback(() => {
    stopAutoplay();
    if (slides.length <= 1) return;
    intervalRef.current = window.setInterval(() => {
      setIndex((v) => clampIndex(v + 1));
    }, autoDelayMs);
  }, [autoDelayMs, clampIndex, slides.length, stopAutoplay]);

  const pauseThenResume = React.useCallback(() => {
    stopAutoplay();
    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = window.setTimeout(() => {
      startAutoplay();
    }, pauseAfterInteractionMs);
  }, [pauseAfterInteractionMs, startAutoplay, stopAutoplay]);

  React.useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
      if (resumeTimeoutRef.current !== null)
        window.clearTimeout(resumeTimeoutRef.current);
    };
  }, [startAutoplay, stopAutoplay]);

  const goTo = (i: number) => {
    pauseThenResume();
    setIndex(clampIndex(i));
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="relative w-full h-full overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={[
              "absolute inset-0 h-full w-full transition-opacity duration-500 ease-out",
              i === index ? "opacity-100" : "opacity-0 pointer-events-none",
            ].join(" ")}
          >
            {s.content}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4">
        <button
          type="button"
          onClick={prev}
          className="pointer-events-auto text-white/50 hover:text-white cursor-pointer"
          aria-label="Previous"
        >
          <MdArrowBackIos className="h-16 w-16" />
        </button>
        <button
          type="button"
          onClick={next}
          className="pointer-events-auto rounded-full text-white/50 hover:text-white cursor-pointer"
          aria-label="Next"
        >
          <MdArrowForwardIos className="h-16 w-16" />
        </button>
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            className={`h-2 w-2 rounded-full ${
              i === index ? "bg-black/70" : "bg-black/20"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      {/* <div className="absolute bottom-0 left-0 h-full w-full bg-black/20 pointer-events-none" /> */}
    </div>
  );
};

export default CarouselPlugin;
