import CarouselPlugin from "@/components/CarouselPlugin";
// import slide1 from "/images/slide-1.webp";
// import slide2 from "/images/slide-2.webp";
// import slide3 from "/images/slide-3.webp";
// import slide4 from "/images/slide-4.webp";
import ButtonNav from "@/components/ButtonNav";
// import fl_1 from "/images/fl-1.webp";
// import fl_2 from "/images/fl-2.webp";
// import fl_3 from "/images/fl-3.webp";
import { useEffect, useState } from "react";
import {
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import Countdown from "@/components/Countdown";
// import { getImages } from "@/services/imageCarousel.service";
// import type { ImagesCarousel } from "@/types/imagesCarousel";
// import type { HomeResponse } from "@/types/home";
// import { getHome } from "@/services/home.service";
import { useTitleAndDates } from "@/Hook/useTitleAndDates";
import { useImages } from "@/Hook/useImages";
import { useHome } from "@/Hook/useHome";
import type { ImagesCarousel } from "@/types/imagesCarousel";
import { useRegistrationPayment } from "@/Hook/useRegistrationPayment";

type TabKey = "submission" | "using_pdf" | "presentation_slide";

// const TAB: Record<
//   Exclude<TabKey, "using_pdf">,
//   { title: string; body: string }
// > = {
//   submission: {
//     title: "Submission",
//     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
//   },
//   presentation_slide: {
//     title: "Presentation Slide",
//     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
//   },
// };

// const PDF_PAGES = [
//   {
//     title: "First Page",
//     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,",
//   },
//   {
//     title: "Second Page",
//     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
//   },
//   {
//     title: "Third Page",
//     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
//   },
// ];

const Home = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("submission");
  const [fading, setFading] = useState(false);
  const [pdfPage, setPdfPage] = useState(0);
  const [pageFading, setPageFading] = useState(false);
  // const [images, setImages] = useState<ImagesCarousel[]>([]);
  // const [home, setHome] = useState<HomeResponse | null>(null);
  const [animateKey, setAnimateKey] = useState(0);
  const { data: titleAndDates } = useTitleAndDates();
  const { data: images = [] } = useImages();
  const { data: home } = useHome();
  const { data } = useRegistrationPayment();

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const data = await getImages();
  //       setImages(data);
  //     } catch (err) {
  //       console.error("Failed to fetch Images", err);
  //     }
  //   };
  //   fetchImages();
  // }, []);

  // const slides = [slide1, slide2, slide3, slide4].map((src, i) => ({
  //   id: String(i),
  //   content: (
  //     <img
  //       src={src}
  //       alt={`slide-${i + 1}`}
  //       className="h-full w-full object-cover"
  //       draggable="false"
  //     />
  //   ),
  // }));
  const slides =
    images.length === 0
      ? [
          {
            id: "no-image",
            content: (
              <div className="h-full w-full text-sm font-semibold flex items-center justify-center text-gray-400">
                No Image
              </div>
            ),
          },
        ]
      : images.map((img: ImagesCarousel, i: number) => ({
          id: img._id,
          content: (
            <img
              src={img.url}
              alt={`slide-${i + 1}`}
              className="h-full w-full object-cover"
              draggable="false"
            />
          ),
        }));

  // useEffect(() => {
  //   const fetchHome = async () => {
  //     try {
  //       const data = await getHome();
  //       setHome(data);
  //     } catch (err) {
  //       console.error("Failed to fetch Home", err);
  //     }
  //   };
  //   fetchHome();
  // }, []);

  const switchTab = (next: TabKey) => {
    setFading(true);
    window.setTimeout(() => {
      setActiveTab(next);
      setFading(false);
    }, 170);
  };
  const clampPage = (p: number) =>
    Math.max(0, Math.min(p, PDF_PAGES.length - 1));

  useEffect(() => {
    if (activeTab === "using_pdf") {
      setPdfPage(0);
    }
  }, [activeTab]);

  const changePdfPage = (next: number) => {
    const safe = clampPage(next);
    if (safe === pdfPage) return;
    setPageFading(true);
    setTimeout(() => {
      setPdfPage(next);
      setPageFading(false);
    }, 200);
  };

  useEffect(() => {
    if (activeTab !== "using_pdf") return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && pdfPage < PDF_PAGES.length - 1) {
        changePdfPage(pdfPage + 1);
      }
      if (e.key === "ArrowLeft" && pdfPage > 0) {
        changePdfPage(pdfPage - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeTab, pdfPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateKey((prev) => prev + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!home) return null;

  const TAB = {
    submission: {
      title: home.submission.title,
      body: home.submission.body,
    },
    presentation_slide: {
      title: home.presentation_slide.title,
      body: home.presentation_slide.body,
    },
  };

  const PDF_PAGES = home?.using_pdf.pages ?? [];

  const imageSrc =
    activeTab === "submission"
      ? home.submission.image_url
      : activeTab === "using_pdf"
        ? home.using_pdf.image_url
        : home.presentation_slide.image_url;

  const title = titleAndDates?.title ?? "Conference";

  return (
    <div className="w-full sm:min-h-200 h-216 sm:h-200 lg:min-h-266 lg:h-266 pt-20">
      <div className="w-full sm:h-3/4 h-100 border-b-4 border-primary-accent">
        <CarouselPlugin
          slides={slides}
          autoDelayMs={4000}
          pauseAfterInteractionMs={2000}
        />
        <div className="absolute w-full sm:h-75 h-50 top-0 flex pt-25 bg-linear-to-b from-secondary-accent to-transparent justify-center">
          <h1
            key={animateKey}
            className="text-xl lg:text-4xl 2xl:text-5xl text-center font-extrabold text-neutral-dark px-5 lg:px-11"
            style={{
              textShadow: `-2px -2px 0 #8e793e, 2px -2px 0 #8e793e, -2px 2px 0 #8e793e, 2px 2px 0 #8e793e`,
            }}
          >
            {title.split("").map((char, i) => (
              <span
                key={i}
                className="letter-drop"
                style={{ animationDelay: `${i * 0.02}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>
      </div>
      <div className="w-full sm:h-1/2 relative">
        <div
          className={`animate__fadeInDown animate__animated animate__delay-1s animate__slow 
          absolute left-1/2 sm:left-4/10 xl:left-4/9 -top-15 sm:-top-57 lg:-top-75 xl:-top-78 2xl:-top-48 sm:-translate-y-1/2 
          -translate-x-1/2 sm:-translate-x-1/3 z-20 w-100 sm:min-w-150 xl:min-w-200`}
        >
          <Countdown
            targetISO={titleAndDates?.conferenceDate ?? "4027-01-10T02:00:00Z"}
            classNameUpcoming="text-white"
            classNameLive="py-2 xl:py-3 sm:text-xl xl:text-4xl sm:w-140 xl:min-w-200"
            styleUpcoming="text-sm p-2.5 sm:p-3 xl:p-4 sm:text-4xl xl:text-5xl xl:px-10 font-bold"
            styleWrapperDL="px-3 py-1 sm:py-2 min-w-15 xl:min-w-20"
            styleDisplay="text-xs sm:text-lg xl:text-2xl"
            styleLabel="text-xs sm:text-sm xl:text-lg"
          />
        </div>
        <div
          className={`animate__fadeInUp animate__animated animate__slow sm:absolute sm:left-1/2 sm:top-1/10 2xl:top-2/5 sm:w-6xl sm:max-w-[90%] 
        sm:h-110 lg:h-150 2xl:h-165.75 2xl:min-h-165 bg-white sm:shadow-xl flex flex-col z-10 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-md 
        sm:overflow-hidden sm:border border-secondary-accent`}
        >
          <div className="w-full h-18 sm:h-24 lg:h-32 2xl:h-1/4 grid grid-cols-3 font-semibold text-primary-accent">
            <ButtonNav
              onClick={() => switchTab("submission")}
              active={activeTab === "submission"}
              label="Submission"
              b_classname="lg:text-xl"
              className="bg-neutral-100"
            />
            <ButtonNav
              onClick={() => switchTab("using_pdf")}
              active={activeTab === "using_pdf"}
              label="Using PDF Express"
              b_classname="lg:text-xl"
              className="bg-neutral-100"
            />
            <ButtonNav
              onClick={() => switchTab("presentation_slide")}
              active={activeTab === "presentation_slide"}
              label="Presentation Slide Template"
              b_classname="lg:text-xl"
              className="bg-neutral-100"
            />
          </div>
          <div className="w-full sm:flex-1 min-h-0 flex flex-col md:flex-row pt-1">
            <div className="md:w-2/5 h-20 md:h-full overflow-hidden md:rounded-bl-md border-t-2 md:border-r-2 border-primary-accent">
              {imageSrc ? (
                <img
                  // src={
                  //   activeTab === "submission"
                  //     ? fl_1
                  //     : activeTab === "using_pdf"
                  //       ? fl_2
                  //       : fl_3
                  // }
                  src={
                    activeTab === "submission"
                      ? home?.submission.image_url
                      : activeTab === "using_pdf"
                        ? home?.using_pdf.image_url
                        : home?.presentation_slide.image_url
                  }
                  alt="tab-image"
                  className={`h-full w-full object-cover transition-opacity duration-300 ease-in-out ${
                    fading ? "opacity-0" : "opacity-100"
                  }`}
                  draggable={false}
                />
              ) : (
                <div className="h-full w-full text-sm font-semibold flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <div className="md:w-3/5 h-90 sm:h-full overflow-hidden sm:rounded-br-md p-3 lg:p-6 relative border-t-2 border-primary-accent flex flex-col">
              {activeTab === "using_pdf" ? (
                <>
                  <div
                    /** Using PDF Express */
                    className={`flex-1 transition-opacity duration-300 ${
                      pageFading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <h2 className="text-xl xl:text-[26px] 2xl:text-3xl font-bold">
                      {PDF_PAGES[pdfPage]?.title ?? "No Title"}
                    </h2>
                    <p className="sm:mt-2 text-xs lg:text-sm xl:text-base">
                      {PDF_PAGES[pdfPage]?.body ?? "No Content"}
                    </p>
                  </div>
                  <div className="sm:mt-auto sm:pt-4">
                    <div className="flex justify-center gap-1 sm:gap-2 sm:mb-4">
                      {PDF_PAGES.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => changePdfPage(i)}
                          className={`h-2 w-2 rounded-full transition ${
                            i === pdfPage ? "bg-primary-accent" : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-3 mt-4 sm:mb-2 sm:mx-2 lg:mb-4 lg:mx-5">
                      <div className="flex justify-start">
                        <button
                          disabled={pdfPage === 0}
                          onClick={() => changePdfPage(pdfPage - 1)}
                          className={`px-4 w-28 py-2 flex items-center gap-2 rounded-md bg-neutral-300 
                            disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all 
                            duration-200 ease-in-out shadow-md hover:shadow-lg active:shadow-sm active:scale-[0.90] 
                            active:translate-y-px`}
                        >
                          <FaLongArrowAltLeft />
                          Previous
                        </button>
                      </div>
                      <div className="flex justify-center items-center">
                        <p className="text-sm text-gray-500">
                          Page {pdfPage + 1} of {PDF_PAGES.length}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <button
                          disabled={pdfPage === PDF_PAGES.length - 1}
                          onClick={() => changePdfPage(pdfPage + 1)}
                          className={`px-4 py-2 flex items-center justify-center gap-2 w-28 rounded-md bg-primary-accent 
                            disabled:opacity-50 cursor-pointer text-white disabled:cursor-not-allowed transition-all 
                            duration-200 ease-in-out shadow-md hover:shadow-lg active:shadow-sm active:scale-[0.90] 
                            active:translate-y-px`}
                        >
                          Next
                          <FaLongArrowAltRight />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /** For Submission and Presentation Slide */
                <div>
                  <h2
                    className={`text-xl xl:text-[26px] 2xl:text-3xl font-bold transition-opacity duration-300 ease-in-out ${
                      fading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {TAB[activeTab as Exclude<TabKey, "using_pdf">].title}
                  </h2>
                  <p
                    className={`mt-2 text-xs lg:text-sm xl:text-base  transition-opacity duration-300 ease-in-out ${
                      fading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {TAB[activeTab as Exclude<TabKey, "using_pdf">].body}
                  </p>
                </div>
              )}

              <a href="#registration">
                <button
                  className={`absolute bottom-3 right-3 sm:bottom-5 sm:right-5 lg:bottom-10 lg:right-10 mt-4 px-4 py-2 bg-primary-accent 
                  text-white rounded-md cursor-pointer hover:bg-orange-400 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg active:shadow-sm active:scale-[0.90] active:translate-y-px ${
                    activeTab === "submission" ? "" : "hidden"
                  }`}
                >
                  Submit Now
                </button>
              </a>
              <a
                href={data?.presentationSlideLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className={`absolute bottom-3 right-3 sm:bottom-5 sm:right-5 lg:bottom-10 lg:right-10 mt-4 px-4 py-2 flex items-center gap-2 
                  bg-primary-accent text-white rounded-md cursor-pointer hover:bg-orange-400 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg active:shadow-sm active:scale-[0.90] active:translate-y-px ${
                    activeTab === "presentation_slide" ? "" : "hidden"
                  }`}
                >
                  Go to Presentaion Slide Template <FaRegArrowAltCircleRight />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
