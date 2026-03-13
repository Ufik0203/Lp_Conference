import { useEffect, useRef, useState } from "react";
// import fl_2 from "/images/fl-2.webp";
// import { getHomeAdditional_C } from "@/services/homeAdditional_C.service";
import DOMPurify from "dompurify";
import { useHomeAdditionalC } from "@/Hook/usueHomeAdditional_C";

const HomeAdditional_C = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);
  // const [body, setBody] = useState("");
  // const [image, setImage] = useState("");
  const { data } = useHomeAdditionalC();
  const image = data?.image_url ?? "";
  const body = data?.body ?? "";

  // useEffect(() => {
  //   const fetchHomeAdditional_C = async () => {
  //     try {
  //       const data = await getHomeAdditional_C();
  //       setImage(data?.image_url ?? "");
  //       setBody(data?.body ?? "");
  //     } catch (err) {
  //       console.error("Failed to fetch HomeAdditional_C", err);
  //     }
  //   };
  //   fetchHomeAdditional_C();
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
      className="overflow-hidden h-full sm:max-w-2xl lg:max-w-250 xl:max-w-310 mx-5 sm:mx-auto relative lg:flex pt-10 mb-5 sm:mb-0"
    >
      <div
        className={`animate__animated animate__slow ${
          animate ? "animate__fadeInDown opacity-100" : "opacity-0"
        } 
        lg:w-2/5 bg-black shadow-xl rounded-md h-60 sm:h-2/5 lg:h-3/5 z-10 overflow-hidden border-2 border-secondary-accent`}
      >
        {/* <img src={fl_2} alt="" className="object-cover w-full h-full" /> */}
        {image ? (
          <img
            src={image}
            alt="about event"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-gray-400">
            No data
          </div>
        )}
      </div>
      <div
        className={`animate__animated animate__slow ${animate ? "animate__fadeInUp opacity-100" : "opacity-0"}
        lg:w-2/3 rounded-md shadow-2xl mt-5 lg:mt-0 lg:h-4/5 bottom-10 right-0 lg:absolute border-2 border-primary-accent/10 lg:pl-28 lg:pt-10 lg:pr-10 p-8 lg:p-0 text-primary-accent text-sm sm:text-[17px] xl:text-xl text-justify`}
      >
        <h1 className="w-full text-center text-2xl sm:text-3xl xl:text-4xl font-bold">
          About Event
        </h1>
        {/* <p className="pt-3 2xl:pt-10">We inform you that the</p>
        <p>
          <span className="font-extrabold text-orange-400">
            <a href="#">Universitas of Wakanda (UoW)</a>
          </span>{" "}
          will organize{" "}
          <span className="font-bold">
            2026 1st NaN (NaN)
            <a href="#" className="text-orange-400 font-medium">
              {" "}
              (http://NaN.ac.id/)
            </a>
          </span>
          . This seminar will take place from{" "}
          <span className="font-bold">1 Januari 2026</span>. This seminar will
          be connection to the most influential ideas and systems in the field
          of information technology and intelligent systems. Join us at 8th
          ISRITI 2025 and contribute to the research-led exploration and
          discussion of the current, development, and emerging state of the
          information technology and intelligent systems.
        </p>
        <p className="pt-3 2xl:pt-5">
          The purpose of this seminar is to provide a platform for academics,
          practitioners, researchers, and governments to identify and explore
          the issues, opportunities, and solutions that promote information
          technology and intelligent system convergences, developments and find
          new business, technology, and societal value from the information
          technology and intelligent systems.
        </p> */}
        {body ? (
          <div
            className="max-w-none break-all [&_a]:no-underline pt-3 2xl:pt-10"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(body),
            }}
          />
        ) : (
          <p className="pt-3 2xl:pt-10 text-sm font-semibold text-gray-400">
            No data
          </p>
        )}
      </div>
    </div>
  );
};

export default HomeAdditional_C;
