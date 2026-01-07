import { useEffect, useRef, useState } from "react";
import edas from "/logo/edas-logo.webp";

const ImportantDates = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.4) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full h-full bg-neutral-light border-t border-secondary-accent/25"
    >
      <div className="sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-5 sm:mx-auto flex flex-col lg:flex-row h-full">
        <div className="lg:w-2/3 sm:h-full flex flex-col lg:p-6">
          <div
            className={`animate__animated animate__slow ${
              animate ? "animate__fadeInDown opacity-100" : "opacity-0"
            } w-full h-32 justify-between flex mt-5 sm:mt-10 2xl:mt-20`}
          >
            <div className="flex flex-col justify-end">
              <h2 className="text-gray-500 text-sm sm:text-lg">
                Submission Type :{" "}
                <span className="sm:text-lg text-primary-accent font-bold">
                  Full Paper
                </span>
              </h2>
            </div>
            <div className="2xl:pb-20">
              <h1 className="text-3xl sm:text-5xl text-primary-accent font-bold">
                Submission
              </h1>
            </div>
          </div>
          <hr className="border-t border-gray-400 my-1 sm:my-3" />
          <div
            className={`animate__animated animate__slow ${
              animate ? "animate__fadeInLeft opacity-100" : "opacity-0"
            } h-full mt-5 lg:mt-10`}
          >
            <h1 className="text-primary-accent text-lg sm:text-2xl font-bold">
              Important Dates
            </h1>
            <div className="sm:mt-8">
              <h2 className="sm:text-xl text-secondary-accent pl-3 sm:pl-5 font-bold">
                Batch 1
              </h2>
              <div className="flex pl-6 sm:pl-8 text-sm sm:text-lg">
                <div className="text-gray-500 grid grid-rows-4">
                  <p>Paper Submission</p>
                  <p>Notification of Acceptance</p>
                  <p>Registration</p>
                  <p>Upload Final Manuscript</p>
                </div>
                <div className="pl-2 text-gray-500 grid grid-rows-4">
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                </div>
                <div className="text-primary-accent ml-2 grid grid-rows-4 sm:text-lg font-bold">
                  <div className="flex gap-2">
                    <p>1 Januuari 2026</p>
                    <p className="line-through text-gray-500">
                      1 Januuari 2026
                    </p>
                  </div>
                  <p>Done</p>
                  <p>2 Januuari 2026</p>
                  <p>3 Januuari 2026</p>
                </div>
              </div>
              <h2 className="sm:text-xl text-secondary-accent pl-3 sm:pl-5 mt-2 sm:mt-5 font-bold">
                Batch 2
              </h2>
              <div className="flex pl-6 sm:pl-8 text-sm sm:text-lg">
                <div className="text-gray-500 grid grid-rows-4">
                  <p>Paper Submission</p>
                  <p>Notification of Acceptance</p>
                  <p>Registration</p>
                  <p>Upload Final Manuscript</p>
                </div>
                <div className="pl-2 text-gray-500 grid grid-rows-4">
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                </div>
                <div className="text-primary-accent ml-2 grid grid-rows-4 sm:text-lg font-bold">
                  <div className="flex gap-2">
                    <p>1 Januuari 2026</p>
                    <p className="line-through text-gray-500">
                      1 Januuari 2026
                    </p>
                  </div>
                  <p>Done</p>
                  <p>2 Januuari 2026</p>
                  <p>3 Januuari 2026</p>
                </div>
              </div>
            </div>
            <button
              className={`mt-8 px-4 py-2 w-full sm:w-fit flex items-center gap-2 bg-primary-accent 
                text-white rounded-md cursor-pointer transition-all duration-200 
                ease-in-out shadow-md hover:shadow-lg active:shadow-sm active:scale-[0.90] active:translate-y-px
                font-bold text-lg sm:text-xl`}
            >
              Conference Date : 1 Januuari 2026
            </button>
          </div>
        </div>
        <div
          className={`animate__animated animate__slow ${
            animate ? "animate__fadeInRight opacity-100" : "opacity-0"
          } lg:w-1/3 h-full flex sm:items-center`}
        >
          <div className="sm:ml-10 text-gray-500 text-lg">
            <p>
              Authors are invited to submit Paper must be using IEEE Paper
              format, to{" "}
              <span className="font-bold">
                download IEEE Paper format template:
              </span>
            </p>
            <h2 className="my-3 text-center">
              <span className="font-bold text-orange-400">
                <a href="#">IEEE Conference Template Doc</a>
              </span>{" "}
              or{" "}
              <span className="font-bold text-orange-400">
                <a href="#">Latex Template</a>
              </span>
            </h2>
            <hr className="border-t border-gray-400 my-3" />
            <div className="mt-10">
              <h3>
                <span className="text-xl font-extrabold text-primary-accent">
                  Online Submission
                </span>{" "}
                via{" "}
                <span className="text-xl font-extrabold text-orange-400">
                  <a href="#">EDAS</a>
                </span>
              </h3>
            </div>
            <div className="w-fit">
              <a href="#">
                <img src={edas} alt="edas_logo" className="w-20 h-20" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportantDates;
