import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./section/Home";
import ButtonNav from "./components/ButtonNav";
import HomeAdditional_A from "./section/HomeAdditional_A";
import HomeAdditional_B from "./section/HomeAdditional_B";
import HomeAdditional_C from "./section/HomeAdditional_C";
import CallForPaper from "./section/CallForPaper";
import CallForPaperAdditional_B from "./section/CallForPaperAdditional_B";
import CallForPaperAdditional_A from "./section/CallForPaperAdditional_A";
import Speakers from "./section/Speakers";
import SpeakersAdditional_A from "./section/SpeakersAdditional_A";
import Registration from "./section/Registration";
import Contact from "./section/Contact";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoArrowUndoCircleSharp } from "react-icons/io5";
import Countdown from "./components/Countdown";
import { FaCircleChevronUp } from "react-icons/fa6";
import "animate.css";
import Loader from "./components/Loader";
import ImportantDatesPages from "./section/ImportantDates";
// import { getImages } from "./services/imageCarousel.service";
import { useTitleAndDates } from "./Hook/useTitleAndDates";
import { useImages } from "./Hook/useImages";
import { useLocation } from "react-router-dom";
import { useArchive } from "@/context/ArchiveContext";
import { useArchives } from "./Hook/useArchives";
import { useArchiveByDate } from "./Hook/useArchiveByDate";
import { useHome } from "./Hook/useHome";

// const years = [
//   {
//     id: 1,
//     year: "Event 2025",
//     url: "",
//   },
//   {
//     id: 2,
//     year: "Event 2024",
//     url: "",
//   },
//   {
//     id: 3,
//     year: "Event 2023",
//     url: "",
//   },
//   {
//     id: 4,
//     year: "Event 2022",
//     url: "",
//   },
//   {
//     id: 5,
//     year: "Event 2021",
//     url: "",
//   },
// ];

function App() {
  const homeRef = useRef<HTMLElement | null>(null);
  const cfpRef = useRef<HTMLElement | null>(null);
  const datesRef = useRef<HTMLElement | null>(null);
  const speakersRef = useRef<HTMLElement | null>(null);
  const registrationRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const navbarRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [navH, setNavH] = useState(80);
  const [archivesOpen, setArchivesOpen] = useState(false);
  const [hideEvents, setHideEvents] = useState(false);
  // const [ready, setReady] = useState(false);
  const { data: titleAndDates, isLoading: titleLoading } = useTitleAndDates();
  const { isLoading: imagesLoading } = useImages();
  // const { year } = useParams();
  const location = useLocation();
  const match = location.pathname.match(/^\/ibitec-(\d+)/);
  const year = match?.[1];
  const { setArchive } = useArchive();
  const { data: archives = [] } = useArchives();
  const found = archives.find((a) => a.year === Number(year));
  const dateKey = found?.dateKey;
  const { data: archiveData, isLoading: archiveLoading } =
    useArchiveByDate(dateKey);
  const archivePage = Boolean(year);
  const { isLoading: homeLoading } = useHome();

  const isPageLoading =
    (archivePage && archiveLoading) ||
    titleLoading ||
    imagesLoading ||
    homeLoading;

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (archiveData) {
  //     setArchive(archiveData);
  //   } else {
  //     setArchive(null);
  //   }
  // }, [archiveData]);

  useEffect(() => {
    if (archiveLoading) return;

    if (archiveData) {
      setArchive(archiveData);
    } else if (!year) {
      setArchive(null);
    }
  }, [archiveData, archiveLoading, year]);

  // const ready = !titleLoading && !imagesLoading;

  useLayoutEffect(() => {
    const update = () => {
      const el = navbarRef.current;
      if (!el) return;
      setNavH(el.getBoundingClientRect().height);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    const el = ref.current;
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const el = homeRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideEvents(entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // useEffect(() => {
  //   const sections = [
  //     { id: "home", ref: homeRef },
  //     { id: "cfp", ref: cfpRef },
  //     { id: "dates", ref: datesRef },
  //     { id: "speakers", ref: speakersRef },
  //     { id: "registration", ref: registrationRef },
  //     { id: "contact", ref: contactRef },
  //   ];
  //   // const observer = new IntersectionObserver(
  //   //   (entries) => {
  //   //     entries.forEach((entry) => {
  //   //       if (entry.isIntersecting) {
  //   //         setActiveSection(entry.target.id);
  //   //       }
  //   //     });
  //   //   },
  //   //   {
  //   //     root: null,
  //   //     threshold: 0.1,
  //   //     rootMargin: `-${navH}px 0px -40% 0px`,
  //   //   },
  //   // );
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const visible = entries.filter((e) => e.isIntersecting);

  //       if (visible.length > 0) {
  //         setActiveSection(visible[0].target.id);
  //       }
  //     },
  //     {
  //       root: null,
  //       threshold: 0.1,
  //       rootMargin: `-${navH}px 0px -30% 0px`,
  //     },
  //   );
  //   sections.forEach(({ ref }) => {
  //     if (ref.current) observer.observe(ref.current);
  //   });
  //   return () => observer.disconnect();
  // }, [navH]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + navH + 100;

      if (contactRef.current && scrollY >= contactRef.current.offsetTop)
        return setActiveSection("contact");

      if (
        registrationRef.current &&
        scrollY >= registrationRef.current.offsetTop
      )
        return setActiveSection("registration");

      if (speakersRef.current && scrollY >= speakersRef.current.offsetTop)
        return setActiveSection("speakers");

      if (datesRef.current && scrollY >= datesRef.current.offsetTop)
        return setActiveSection("dates");

      if (cfpRef.current && scrollY >= cfpRef.current.offsetTop)
        return setActiveSection("cfp");

      setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navH]);

  useEffect(() => {
    if (!archivesOpen) return;
    const handler = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target as Node)) return;
      setArchivesOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [archivesOpen]);

  // useEffect(() => {
  //   if (document.readyState === "complete") {
  //     setReady(true);
  //     return;
  //   }

  //   const onLoad = () => setReady(true);
  //   window.addEventListener("load", onLoad);
  //   return () => window.removeEventListener("load", onLoad);
  // }, []);

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       await Promise.all([getImages()]);
  //       setReady(true);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   loadData();
  // }, []);

  return (
    <>
      {isPageLoading ? (
        <Loader />
      ) : (
        <>
          <div
            className="w-full"
            // style={{
            //   pointerEvents: ready ? "auto" : "none",
            //   opacity: ready ? 1 : 0,
            //   transition: "opacity 250ms ease",
            // }}
          >
            <Navbar>
              <ButtonNav
                onClick={() => scrollTo(homeRef)}
                label="Home"
                active={activeSection === "home"}
              />
              <ButtonNav
                onClick={() => scrollTo(cfpRef)}
                label="Call for Paper"
                active={activeSection === "cfp"}
              />
              <ButtonNav
                onClick={() => scrollTo(datesRef)}
                label="Important Dates"
                active={activeSection === "dates"}
              />
              <ButtonNav
                onClick={() => scrollTo(speakersRef)}
                label="Speakers"
                active={activeSection === "speakers"}
              />
              <ButtonNav
                onClick={() => scrollTo(registrationRef)}
                label="Registration"
                active={activeSection === "registration"}
              />
              <ButtonNav
                onClick={() => scrollTo(contactRef)}
                label="Contact"
                active={activeSection === "contact"}
              />
              <ButtonNav
                onClick={() => setArchivesOpen(!archivesOpen)}
                label="Archives"
                className="group relative"
                data-nav-no-close="true"
              >
                <RiArrowDropDownLine className="w-7 h-7" />
                <div
                  ref={menuRef}
                  className={`absolute bg-white w-40 top-10 flex-col text-secondary-accent rounded-lg border-2 overflow-hidden lg:group-hover:flex hover:flex z-10 ${
                    archivesOpen ? "flex" : "hidden"
                  }`}
                >
                  <a
                    key="ibitec-2019"
                    href="https://ibitec.uii.ac.id/ibitec-2019/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 hover:bg-neutral-dark"
                    onClick={(e) => {
                      e.stopPropagation();
                      setArchivesOpen(false);
                    }}
                  >
                    IBITeC 2019
                  </a>
                  <a
                    key="ibitec-2021"
                    href="https://ibitec.uii.ac.id/ibitec-2021/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 hover:bg-neutral-dark"
                    onClick={(e) => {
                      e.stopPropagation();
                      setArchivesOpen(false);
                    }}
                  >
                    IBITeC 2021
                  </a>
                  <a
                    key="ibitec-2023"
                    href="https://ibitec.uii.ac.id/ibitec-2023/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 hover:bg-neutral-dark"
                    onClick={(e) => {
                      e.stopPropagation();
                      setArchivesOpen(false);
                    }}
                  >
                    IBITeC 2023
                  </a>
                  {archives.map((a) => (
                    <a
                      key={a.year}
                      href={`/ibitec-${a.year}`}
                      className="py-2 hover:bg-neutral-dark"
                      onClick={(e) => {
                        e.stopPropagation();
                        setArchivesOpen(false);
                      }}
                    >
                      IBITeC {a.year}
                    </a>
                  ))}
                </div>
              </ButtonNav>
            </Navbar>
          </div>

          <section id="home" ref={homeRef}>
            <Home />
          </section>
          <section className="2xl:min-h-266 h-175 sm:h-160 lg:h-220 2xl:h-266">
            <div className="h-1/5 2xl:h-1/3" />
            <div className="h-4/5 2xl:h-2/3">
              <HomeAdditional_A />
            </div>
          </section>
          <section className="2xl:min-h-266 sm:h-340 lg:h-220 2xl:h-266">
            <div className="h-1/9 lg:h-1/5">
              <HomeAdditional_B />
            </div>
            <div className="h-8/9 lg:h-4/5">
              <HomeAdditional_C />
            </div>
          </section>

          <section
            id="cfp"
            ref={cfpRef}
            className="2xl:min-h-266 lg:h-220 2xl:h-266"
          >
            <div className="h-4/5">
              <CallForPaper />
            </div>
            <div className="h-1/5">
              <CallForPaperAdditional_A />
            </div>
          </section>
          <section className="overflow-hidden 2xl:min-h-266 lg:h-266">
            <CallForPaperAdditional_B />
          </section>
          <section
            id="dates"
            ref={datesRef}
            className="overflow-hidden 2xl:min-h-266 h-270 sm:h-300 lg:h-220 2xl:h-266"
          >
            <div className="h-9/10">
              <ImportantDatesPages />
            </div>
            <div className="h-1/10 sm:h-1/7 bg-neutral-dark border-b-2 border-secondary-accent" />
          </section>
          <section
            id="speakers"
            ref={speakersRef}
            className="overflow-hidden 2xl:min-h-266 h-210 sm:h-220 2xl:h-266"
          >
            <Speakers />
          </section>
          <section className="overflow-hidden lg:h-280 2xl:h-320">
            <SpeakersAdditional_A />
          </section>
          <section
            id="registration"
            ref={registrationRef}
            className="overflow-hidden 2xl:min-h-955 2xl:h-955"
          >
            <Registration />
          </section>
          <section
            id="contact"
            ref={contactRef}
            className="overflow-hidden 2xl:min-h-225 2xl:h-225 bg-neutral-light"
          >
            <Contact />
          </section>
          <div
            className={`relative animate__animated animate__slow z-50 ${
              hideEvents ? "hidden" : "animate__fadeIn"
            }`}
          >
            <Countdown
              targetISO={
                titleAndDates?.conferenceDate ?? "4027-01-10T02:00:00Z"
              }
              classNameLive="fixed right-35 bottom-5 sm:right-5 z-50 p-1 sm:p-2 2xl:px-5"
              classNameUpcoming="fixed bottom-2 sm:bottom-4 right-9 sm:right-5 z-50 2xl:flex-col"
              styleUpcoming="p-2.5 sm:p-3 2xl:w-full text-sm sm:text-lg font-bold"
              styleLive="sm:text-4xl"
              styleWrapperDL="px-3 py-1 sm:py-2 min-w-15"
              styleDisplay="text-xs sm:text-sm"
              styleLabel="text-xs"
            />
          </div>
          <button
            className={`fixed ${
              hideEvents
                ? "bottom-5 sm:bottom-5 2xl:bottom-5"
                : "bottom-14 sm:bottom-20 2xl:bottom-35"
            } right-2 sm:right-5 rounded-full border-2 
          border-secondary-accent z-50 bg-secondary-accent cursor-pointer
          active:scale-60 transition-all duration-200 ease-in-out`}
            onClick={() => scrollTo(homeRef)}
          >
            <FaCircleChevronUp className="w-7 h-7 sm:w-10 sm:h-10" />
          </button>
          {archivePage && (
            <button
              className={`fixed ${
                hideEvents
                  ? "bottom-5 sm:bottom-5 2xl:bottom-5"
                  : "bottom-29 sm:bottom-35 2xl:bottom-50"
              } right-2 sm:right-5 rounded-full z-50 bg-secondary-accent cursor-pointer
          active:scale-60 transition-all duration-200 ease-in-out`}
              onClick={() => (window.location.href = "/")}
            >
              <IoArrowUndoCircleSharp className="w-7 h-7 sm:w-10 sm:h-10" />
            </button>
          )}
        </>
      )}
    </>
  );
}

export default App;
