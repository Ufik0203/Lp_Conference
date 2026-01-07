import { useEffect, useRef, useState } from "react";
import img1 from "/images/fl-1.webp";

const previousPubliication = [
  {
    id: 1,
    title: "NaN 2018",
    link: "https://ieeexplore.ieee.org/xpl/conhome/",
  },
  {
    id: 2,
    title: "NaN 2019",
    link: "https://ieeexplore.ieee.org/xpl/conhome/",
  },
  {
    id: 3,
    title: "NaN 2020",
    link: "https://ieeexplore.ieee.org/xpl/conhome/",
  },
  {
    id: 4,
    title: "NaN 2021",
    link: "https://ieeexplore.ieee.org/xpl/conhome/",
  },
  {
    id: 5,
    title: "NaN 2022",
    link: "https://ieeexplore.ieee.org/xpl/conhome/",
  },
  {
    id: 6,
    title: "NaN 2023",
    link: "https://ieeexplore.ieee.org/xpl/conhome/",
  },
  {
    id: 7,
    title: "NaN 2024",
    link: "https://ieeexplore.ieee.org/xpl/conhome/",
  },
];

const HomeAdditional_A = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.3) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="overflow-hidden w-full h-full flex relative justify-center"
    >
      <div className="absolute w-full h-full bg-primary-accent/70 border-t-2 border-primary-accent/80 z-20" />
      <img src={img1} alt="" className="absolute w-full h-full object-cover" />
      <div className="h-full w-full sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl sm:mx-auto absolute z-30 text-white flex flex-col sm:gap-5 gap-8 px-3 sm:px-0">
        <h1
          className={`animate__animated animate__slow ${
            animate ? "animate__fadeInUp opacity-100" : "opacity-0"
          } sm:text-2xl lg:text-4xl font-bold mt-10 sm:my-8 lg:my-16 w-full text-center`}
        >
          NaN Previous Publication : IEEE Xplore & SCOPUS Indexed
        </h1>
        {previousPubliication.map((_, i) => (
          <div
            key={i}
            className={`animate__animated animate__slow ${
              animate ? "animate__fadeInUp opacity-100" : "opacity-0"
            } group w-full lg:h-10 h-5 sm:h-8 sm:flex`}
          >
            <div className="lg:w-52 h-full justify-center items-center flex sm:w-36 w-full">
              <h1 className="lg:text-2xl font-bold transition-colors group-hover:text-orange-400 sm:text-sm text-xs">
                {previousPubliication[i].id}. {previousPubliication[i].title} :
              </h1>
            </div>
            <div className="w-full h-full bg-neutral-light rounded-md text-neutral-dark font-semibold transition-colors group-hover:bg-orange-400 group-hover:text-white cursor-pointer">
              <a
                href={`${previousPubliication[i].link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full pl-5 flex items-center sm:text-lg text-xs"
              >
                {previousPubliication[i].link}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeAdditional_A;
