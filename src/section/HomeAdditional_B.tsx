import logo_1 from "../assets/logo/Logo-Vertikal-Telkom-University.png";
import logo_2 from "../assets/logo/ieee-logo.png";
import logo_3 from "../assets/logo/scopus-logo.png";
import { useEffect, useRef, useState } from "react";

const HomeAdditional_B = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="overflow-hidden w-full h-full bg-neutral-light border-b border-t-2 border-secondary-accent/50"
    >
      <div className="sm:max-w-2xl lg: xl:max-w-6xl h-full mx-auto grid grid-cols-3">
        <div
          className={`animate__animated animate__slow ${
            animate ? "animate__fadeInUp opacity-100" : "opacity-0"
          } flex items-center justify-center`}
        >
          <img
            src={logo_1}
            alt=""
            className="object-cover h-14 sm:h-20 lg:h-30 xl:h-40"
          />
        </div>
        <div
          className={`animate__animated animate__slow ${
            animate ? "animate__fadeInDown opacity-100" : "opacity-0"
          } flex items-center justify-center`}
        >
          <img src={logo_2} alt="" className="object-cover" />
        </div>
        <div
          className={`animate__animated animate__slow ${
            animate ? "animate__fadeInUp opacity-100" : "opacity-0"
          } flex items-center justify-center`}
        >
          <img
            src={logo_3}
            alt=""
            className="object-cover h-6 sm:h-10 lg:h-16"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeAdditional_B;
