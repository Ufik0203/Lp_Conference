import CardStack from "@/components/CardStack";
// import fl_1 from "/images/fl-1.webp";
// import fl_2 from "/images/fl-2.webp";
// import fl_3 from "/images/fl-3.webp";
import { useEffect, useMemo, useRef, useState } from "react";
// import type { SpeakersType } from "@/types/speakers";
// import { getSpeakers } from "@/services/speakers.service";
import { useSpeakers } from "@/Hook/useSpeaker";

// const speakers = [
//   {
//     id: 1,
//     pict: fl_1,
//     name: "John Doe 1",
//     university: "University of Example",
//     country: "Wakanda",
//   },
//   {
//     id: 2,
//     pict: fl_2,
//     name: "John Doe 2",
//     university: "University of Example",
//     country: "Wakanda",
//   },
//   {
//     id: 3,
//     pict: fl_3,
//     name: "John Doe 3",
//     university: "University of Example",
//     country: "Wakanda",
//   },
//   {
//     id: 4,
//     pict: fl_2,
//     name: "John Doe 4",
//     university: "University of Example",
//     country: "Wakanda",
//   },
//   {
//     id: 5,
//     pict: fl_2,
//     name: "John Doe 5",
//     university: "University of Example",
//     country: "Wakanda",
//   },
//   {
//     id: 6,
//     pict: fl_2,
//     name: "John Doe 6",
//     university: "University of Example",
//     country: "Wakanda",
//   },
// ];

const Speakers = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);
  // const [data, setData] = useState<SpeakersType[]>([]);
  const { data: speaker } = useSpeakers();
  const speakersData = speaker ?? [];
  const [visible, setVisible] = useState(() =>
    typeof window === "undefined" ? 3 : window.innerWidth >= 1024 ? 5 : 3,
  );
  const [active, setActive] = useState(0);

  // useEffect(() => {
  //   const fetchSpeaker = async () => {
  //     try {
  //       const data = await getSpeakers();
  //       setData(data);
  //     } catch (err) {
  //       console.error("Failed to fetch Speakers", err);
  //     }
  //   };
  //   fetchSpeaker();
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

  useEffect(() => {
    const onResize = () => setVisible(window.innerWidth >= 1024 ? 5 : 3);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const speakers =
    speakersData?.map((item) => ({
      id: item.order.toString(),
      pict: item.image_url,
      name: item.name,
      university: item.university,
      country: item.country,
    })) ?? [];

  const items = useMemo(
    () =>
      speakers.map((s, idx) => ({
        id: `${s.id}-${idx}`,
        pict: s.pict,
        title: s.name,
        body: [s.university, s.country],
      })),
    [speakers],
  );

  return (
    <div ref={ref} className="w-full h-full bg-primary-accent">
      <div className="sm:max-w-2xl lg:max-w-6xl xl:max-w-7xl h-full sm:mx-auto mx-2">
        <div className="w-full h-full flex flex-col">
          <div
            className={`animate__animated animate__slow ${
              animate ? "animate__fadeInDown opacity-100" : "opacity-0"
            } w-full sm:h-36 grid grid-cols-2 mt-10`}
          >
            <div className="flex items-center">
              <hr className="w-full h-1 bg-neutral-dark mr-5" />
            </div>
            <div className="flex items-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-neutral-dark">
                Speakers
              </h1>
            </div>
          </div>
          <div
            className={`animate__animated animate__slow ${
              animate ? "animate__fadeInLeft opacity-100" : "opacity-0"
            } flex w-full h-full`}
          >
            {speakersData.length > 0 ? (
              <CardStack
                items={items}
                active={active}
                onChangeActive={setActive}
                maxVisible={visible}
              >
                {({ item }) => (
                  <div className="text-center border-[3px] rounded-3xl overflow-hidden bg-neutral-dark text-secondary-accent w-full h-full">
                    <div className="border-b">
                      <img
                        src={item?.pict}
                        alt={item?.title}
                        className="w-full h-80 2xl:h-90 rounded-t-2xl object-cover object-center bg-no-repeat"
                      />
                    </div>
                    <div className="gap-2 flex flex-col py-6">
                      <h1 className="font-bold text-xl">{item?.title}</h1>
                      <p className="underline underline-offset-4">
                        {item?.body?.[0]}
                      </p>
                      <p className="font-semibold">{item?.body?.[1]}</p>
                    </div>
                  </div>
                )}
              </CardStack>
            ) : (
              <p className="pt-3 2xl:pt-10 text-sm font-semibold text-gray-400">
                No data
              </p>
            )}
          </div>
          <div
            className={`animate__animated animate__slow ${
              animate ? "animate__fadeInUp opacity-100" : "opacity-0"
            } flex w-full pb-5 sm:pb-0 sm:h-82 justify-center gap-5`}
          >
            {items.map((it, idx) => (
              <button
                key={it.id}
                className={`h-20 w-20 sm:w-28 sm:h-28 2xl:w-34 2xl:h-34 border-2 rounded-xl overflow-hidden cursor-pointer shadow-xl transition-all
                ${
                  idx === active
                    ? "border-orange-400 scale-100"
                    : "border-secondary-accent scale-85"
                }`}
                onClick={() => setActive(idx)}
              >
                <img
                  src={it.pict}
                  className="w-full h-full object-cover object-center rounded-lg"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
