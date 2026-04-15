// import logo_1 from "/logo/Logo-Vertikal-Telkom-University.webp";
// import logo_2 from "/logo/ieee-logo.webp";
// import logo_3 from "/logo/scopus-logo.webp";
import { useConference } from "@/Hook/useHomeAdditional_B";
import { useEffect, useRef, useState } from "react";

const HomeAdditional_B = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);
  const { data: images = [] } = useConference();
  const sortedImages = [...images].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

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
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="overflow-hidden w-full h-full bg-neutral-light border-b border-t-2 border-secondary-accent/50"
    >
      <div className="sm:max-w-2xl lg: xl:max-w-7xl h-full mx-auto flex justify-center">
        {/* <div
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
        </div> */}
        <div
          className={`animate__animated py-2 sm:py-0 flex gap-5 lg:gap-20 animate__slow ${
            animate ? "animate__fadeInUp opacity-100" : "opacity-0"
          } flex items-center justify-center`}
        >
          {sortedImages.map((img) => (
            <a
              key={img._id}
              href={img.link_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                key={img._id}
                src={img.image_url}
                alt="conference logo"
                className="object-contain h-6 sm:h-15 lg:h-30 max-w-60"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeAdditional_B;
