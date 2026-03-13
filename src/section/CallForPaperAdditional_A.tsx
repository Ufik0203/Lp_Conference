import cp_1 from "../assets/cp-data.svg";
import cp_2 from "../assets/cp-privacy.svg";
import cp_3 from "../assets/cp-ai.svg";
import cp_4 from "../assets/cp-internet.svg";
import { useEffect, useRef, useState } from "react";

const CallForPaperAdditional_A = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.6) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.6,
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  });

  return (
    <div ref={ref} className="overflow-hidden w-full h-full bg-primary-accent border-b border-t-2 border-secondary-accent">
      <div className="sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl py-8 lg:py-0 mx-auto h-full grid grid-cols-4">
        <div className={`animate__animated animate__slow ${animate ? "animate__fadeInUp opacity-100" : "opacity-0"} flex justify-center items-center`}>
          <img
            src={cp_1}
            alt="data"
            className="object-cover h-14 sm:h-20 lg:w-28 lg:h-28"
          />
        </div>
        <div className={`animate__animated animate__slow ${animate ? "animate__fadeInDown opacity-100" : "opacity-0"} flex justify-center items-center`}>
          <img
            src={cp_2}
            alt="data"
            className="object-cover h-14 sm:h-20 lg:w-28 lg:h-28"
          />
        </div>
        <div className={`animate__animated animate__slow ${animate ? "animate__fadeInUp opacity-100" : "opacity-0"} flex justify-center items-center`}>
          <img
            src={cp_3}
            alt="data"
            className="object-cover h-14 sm:h-20 lg:w-28 lg:h-28"
          />
        </div>
        <div className={`animate__animated animate__slow ${animate ? "animate__fadeInDown opacity-100" : "opacity-0"} flex justify-center items-center`}>
          <img
            src={cp_4}
            alt="data"
            className="object-cover h-14 sm:h-20 lg:w-28 lg:h-28"
          />
        </div>
      </div>
    </div>
  );
};

export default CallForPaperAdditional_A;
