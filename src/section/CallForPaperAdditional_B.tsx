import { useCallForPaperAdditionalB } from "@/Hook/useCallForPapersAdditional_B";
// import { getCallForPaperAdditional_B } from "@/services/callForPaperAdditional_B.service";
// import type { CallForPapersAdditionalBData } from "@/types/callForPaperAdditional_B";
import { useEffect, useRef, useState } from "react";
import { MdPlace } from "react-icons/md";
import { SiGooglemeet } from "react-icons/si";

// const CGAP = [
//   {
//     id: 1,
//     body: "At least one author must join the session to answer questions.",
//   },
//   {
//     id: 2,
//     body: "Presenters are requested to wear neat and formal clothing.",
//   },
//   {
//     id: 3,
//     body: "The presentation is presented in the form of power point slides.",
//   },
//   {
//     id: 4,
//     body: "Power point templates will be available for download here: {LINK BLANK}",
//   },
//   {
//     id: 5,
//     body: "Please carefully review the following guidelines and specifications before sending material of your presentation.",
//   },
//   {
//     id: 6,
//     body: "All presentation materials must be uploaded to EDAS, no later than 1 December 2025!",
//   },
// ];

// const IPS = [
//   {
//     id: 1,
//     body: "Conference fees do not include hotel accommodation.",
//   },
//   {
//     id: 2,
//     body: "Presenters must arrive at the venue at least 15 minutes before the event starts.",
//   },
//   {
//     id: 3,
//     body: "Participants register at the secretariat desk to get a participant ID card.",
//   },
//   {
//     id: 4,
//     body: "Presenters are requested to wear neat and formal clothing.",
//   },
//   {
//     id: 5,
//     body: "In parallel sessions, participants enter the parallel room according to the presentation session schedule.",
//   },
//   {
//     id: 6,
//     body: "In plenary session, participants are invited to enter the main hall.",
//   },
// ];

// const VP = [
//   {
//     id: 1,
//     body: "Make sure all participants have installed the latest version of the ZOOM Meeting Platform.",
//   },
//   {
//     id: 2,
//     body: "Zoom usernames must follow the format provided in the guidebook.",
//   },
//   {
//     id: 3,
//     body: "Participants must use the ISRITI conference virtual background.",
//   },
//   {
//     id: 4,
//     body: "Presenters must be ready in the Zoom Meeting no later than 5 minutes before the event starts.",
//   },
//   {
//     id: 5,
//     body: "In parallel sessions, participants enter the breakout room according to the presentation session schedule.",
//   },
//   {
//     id: 6,
//     body: "In plenary session, participants are invited to enter the main room.",
//   },
// ];

const CallForPaperAdditional_B = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);
  // const [data, setData] = useState<CallForPapersAdditionalBData>({
  //   CGAP: [],
  //   IPS: [],
  //   VP: [],
  // });
  const { data: callForPaperAdditoinal_B } = useCallForPaperAdditionalB();

  const CGAP = callForPaperAdditoinal_B?.CGAP ?? [];
  const IPS = callForPaperAdditoinal_B?.IPS ?? [];
  const VP = callForPaperAdditoinal_B?.VP ?? [];

  // useEffect(() => {
  //   const fetchCallForPapersAdditional_B = async () => {
  //     try {
  //       const data = await getCallForPaperAdditional_B();
  //       setData(data);
  //     } catch (err) {
  //       console.error("Failed to fetch CallForPapersAdditional_B", err);
  //     }
  //   };
  //   fetchCallForPapersAdditional_B();
  // }, []);

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
      },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="sm:max-w-2xl lg:max-w-260 xl:max-w-6xl mx-5 sm:mx-auto h-full flex flex-col items-center"
    >
      <div className="w-full text-center mt-10">
        <h1
          className={`animate__animated animate__slow ${
            animate ? "animate__fadeInDown opacity-100" : "opacity-0"
          } text-3xl sm:text-4xl lg:text-5xl font-bold mb-3`}
        >
          Conference Guidelines And Preparation
        </h1>
      </div>
      {CGAP.length === 0 ? (
        <p className="text-center text-sm font-semibold text-gray-400">
          No Data
        </p>
      ) : (
        CGAP.map((item) =>
          item.body.map((text, i) => (
            <div
              key={`${item.id}-${i}`}
              className={`animate__animated animate__slow ${
                animate ? "animate__fadeInUp opacity-100" : "opacity-0"
              } w-full sm:max-w-2xl lg:max-w-4xl border-2 mt-3 h-12 rounded-md bg-primary-accent border-neutral-dark/60 flex px-5 items-center text-white font-bold`}
            >
              <h3>{i + 1}.</h3>
              <p className="ml-2 text-xs">{text}</p>
            </div>
          )),
        )
      )}
      <div className="w-full h-full py-10 lg:py-0 gap-5 lg:gap-0 lg:pt-10 flex flex-col lg:flex-row text-secondary-accent font-bold">
        <div
          className={`animate__animated animate__slow ${animate ? "animate__fadeInLeft opacity-100" : "opacity-0"} lg:w-1/2 h-full lg:pr-2`}
        >
          <div className="w-full lg:h-150 rounded-xl border-secondary-accent border-2 bg-neutral-dark relative">
            <div className="p-5 flex sm:absolute right-1">
              <p>On Site</p>
              <MdPlace className="text-6xl" />
            </div>
            <h1 className="text-center mt-10 text-3xl">In Person Presenters</h1>
            <div className="w-full p-10">
              <ol className="mt-4 list-decimal list-outside leading-relaxed text-start pl-6">
                {IPS.length === 0 ? (
                  <p className="text-center text-sm font-semibold text-gray-400">
                    No Data
                  </p>
                ) : (
                  IPS.map((item) =>
                    item.body.map((text, i) => (
                      <li key={`${item.id}-${i}`} className="mt-2">
                        {text}
                      </li>
                    )),
                  )
                )}
              </ol>
            </div>
          </div>
        </div>
        <div
          className={`animate__animated animate__slow ${animate ? "animate__fadeInRight opacity-100" : "opacity-0"} lg:w-1/2 h-full lg:pl-2`}
        >
          <div className="w-full lg:h-150 rounded-xl border-secondary-accent border-2 bg-neutral-dark relative">
            <div className="p-5 flex sm:absolute right-1">
              <p>Online</p>
              <SiGooglemeet className="text-6xl" />
            </div>
            <h1 className="text-center mt-10 text-3xl">Virtual Presenters</h1>
            <div className="w-full p-10">
              <ol className="mt-4 list-decimal list-outside leading-relaxed text-start pl-6">
                {VP.length === 0 ? (
                  <p className="text-center text-sm font-semibold text-gray-400">
                    No Data
                  </p>
                ) : (
                  VP.map((item) =>
                    item.body.map((text, i) => (
                      <li key={`${item.id}-${i}`} className="mt-2">
                        {text}
                      </li>
                    )),
                  )
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallForPaperAdditional_B;
