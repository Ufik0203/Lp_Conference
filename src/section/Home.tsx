import CarouselPlugin from "@/components/CarouselPlugin";
import slide1 from "../assets/slide-1.jpg";
import slide2 from "../assets/slide-2.jpg";
import slide3 from "../assets/slide-3.jpg";
import slide4 from "../assets/slide-4.jpg";
import ButtonNav from "@/components/ButtonNav";
import fl_1 from "../assets/fl-1.jpg";
import fl_2 from "../assets/fl-2.jpg";
import fl_3 from "../assets/fl-3.jpg";
import { useEffect, useState } from "react";
import {
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import Countdown from "@/components/Countdown";

type TabKey = "submission" | "using_pdf" | "presentation_slide";

const TAB: Record<
  Exclude<TabKey, "using_pdf">,
  { title: string; body: string }
> = {
  submission: {
    title: "Submission",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  presentation_slide: {
    title: "Presentation Slide",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
};

const PDF_PAGES = [
  {
    title: "First Page",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    title: "Second Page",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
  {
    title: "Third Page",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.",
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("submission");
  const [fading, setFading] = useState(false);
  const [pdfPage, setPdfPage] = useState(0);
  const [pageFading, setPageFading] = useState(false);
  const slides = [slide1, slide2, slide3, slide4].map((src, i) => ({
    id: String(i),
    content: (
      <img
        src={src}
        alt={`slide-${i + 1}`}
        className="h-full w-full object-cover"
        draggable="false"
      />
    ),
  }));
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

  return (
    <div className="w-full sm:min-h-200 h-216 sm:h-200 lg:min-h-266 lg:h-266 pt-20">
      <div className="w-full sm:h-3/4 h-100 border-b-4 border-primary-accent">
        <CarouselPlugin
          slides={slides}
          autoDelayMs={4000}
          pauseAfterInteractionMs={2000}
        />
      </div>
      <div className="w-full sm:h-1/2 relative">
        <div className="animate__fadeInDown animate__animated animate__delay-1s animate__slow absolute left-1/2 -top-15 sm:-top-57 lg:-top-72 2xl:-top-45 sm:-translate-y-1/2 -translate-x-1/2 z-20 w-90">
          <Countdown targetISO="2026-01-10T02:00:00Z"classNameUpcoming="text-white"/>
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
              className="bg-neutral-100"
            />
            <ButtonNav
              onClick={() => switchTab("using_pdf")}
              active={activeTab === "using_pdf"}
              label="Using PDF Express"
              className="bg-neutral-100"
            />
            <ButtonNav
              onClick={() => switchTab("presentation_slide")}
              active={activeTab === "presentation_slide"}
              label="Presentation Slide Template"
              className="bg-neutral-100"
            />
          </div>
          <div className="w-full sm:flex-1 min-h-0 flex flex-col sm:flex-row pt-1">
            <div className="sm:w-2/5 h-20 sm:h-full overflow-hidden sm:rounded-bl-md border-t-2 sm:border-r-2 border-primary-accent">
              <img
                src={
                  activeTab === "submission"
                    ? fl_1
                    : activeTab === "using_pdf"
                    ? fl_2
                    : fl_3
                }
                alt="tab-image"
                className={`h-full w-full object-cover transition-opacity duration-300 ease-in-out ${
                  fading ? "opacity-0" : "opacity-100"
                }`}
                draggable={false}
              />
            </div>
            <div className="sm:w-3/5 h-90 sm:h-full overflow-hidden sm:rounded-br-md p-3 lg:p-6 relative border-t-2 border-primary-accent flex flex-col">
              {activeTab === "using_pdf" ? (
                <>
                  <div
                    className={`flex-1 transition-opacity duration-300 ${
                      pageFading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <h2 className="text-lg sm:text-xl font-bold">
                      {PDF_PAGES[pdfPage].title}
                    </h2>
                    <p className="sm:mt-2">{PDF_PAGES[pdfPage].body}</p>
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
                <div>
                  <h2
                    className={`text-xl font-bold transition-opacity duration-300 ease-in-out ${
                      fading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {TAB[activeTab as Exclude<TabKey, "using_pdf">].title}
                  </h2>
                  <p
                    className={`mt-2 transition-opacity duration-300 ease-in-out ${
                      fading ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {TAB[activeTab as Exclude<TabKey, "using_pdf">].body}
                  </p>
                </div>
              )}

              <button
                className={`absolute bottom-3 right-3 sm:bottom-5 sm:right-5 lg:bottom-10 lg:right-10 mt-4 px-4 py-2 bg-primary-accent 
                  text-white rounded-md cursor-pointer hover:bg-orange-400 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg active:shadow-sm active:scale-[0.90] active:translate-y-px ${
                    activeTab === "submission" ? "" : "hidden"
                  }`}
              >
                Submit Now
              </button>
              <button
                className={`absolute bottom-3 right-3 sm:bottom-5 sm:right-5 lg:bottom-10 lg:right-10 mt-4 px-4 py-2 flex items-center gap-2 
                  bg-primary-accent text-white rounded-md cursor-pointer hover:bg-orange-400 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg active:shadow-sm active:scale-[0.90] active:translate-y-px ${
                    activeTab === "presentation_slide" ? "" : "hidden"
                  }`}
              >
                Go to Presentaion Slide Template <FaRegArrowAltCircleRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
