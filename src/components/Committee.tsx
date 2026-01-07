import { useEffect, useMemo, useRef, useState } from "react";
import slide1 from "/images/slide-1.webp";
import slide2 from "/images/slide-2.webp";
import slide3 from "/images/slide-3.webp";
import slide4 from "/images/slide-4.webp";
import { steering_committee_data } from "@/Data/ComitteeData";

type TabKey =
  | "steering_committee"
  | "organizing_committee"
  | "technical_program_committee"
  | "technical_committee"
  | "technical_support";

type Member = {
  id: number;
  name: string;
  university: string;
  country: string;
};

type TabContent = {
  title: string;
  body: Member[];
};

const ROWS_PER_PAGE = 5;

const TAB: Record<
  Exclude<TabKey, "technical_program_committee">,
  TabContent
> = {
  steering_committee: {
    title: "Steering Committee",
    body: steering_committee_data,
  },
  organizing_committee: {
    title: "Organizing Committee",
    body: [],
  },
  technical_committee: {
    title: "Technical Committee",
    body: [],
  },
  technical_support: {
    title: "Technical Support",
    body: [],
  },
};

const TPC_PAGES = [
  {
    id: 1,
    title: "TPC Chair",
    name: ["name 1", "name 2"],
    university: ["univ 1", "univ 2"],
    country: ["country 1", "country 2"],
  },
  {
    id: 2,
    title: "TPC Member",
    name: ["name 1", "name 2", "name 3", "name 4", "name 5", "name 6"],
    university: ["univ 1", "univ 2", "univ 3", "univ 4", "univ 5", "univ 6"],
    country: [
      "country 1",
      "country 2",
      "country 3",
      "country 4",
      "country 5",
      "country 6",
    ],
  },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(n, max));
}

function pageCount(totalRows: number) {
  return Math.max(1, Math.ceil(totalRows / ROWS_PER_PAGE));
}

function slicePage(rows: Member[], pageIndex: number) {
  const start = pageIndex * ROWS_PER_PAGE;
  return rows.slice(start, start + ROWS_PER_PAGE);
}

const Committee = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("steering_committee");
  const [fading, setFading] = useState(false);
  const [tabPage, setTabPage] = useState(0);
  const [tpcSection, setTpcSection] = useState(0);
  const [tpcPage, setTpcPage] = useState(0);
  const [pageFading, setPageFading] = useState(false);

  const TPC = useMemo(() => {
    return TPC_PAGES.map((p) => ({
      id: p.id,
      title: p.title,
      body: p.name.map((nm, i) => ({
        id: Number(`${p.id}${i}`),
        name: nm,
        university: p.university[i] ?? "-",
        country: p.country[i] ?? "-",
      })) as Member[],
    }));
  }, []);

  const imgSrc =
    activeTab === "steering_committee"
      ? slide1
      : activeTab === "technical_program_committee"
      ? slide2
      : activeTab === "organizing_committee"
      ? slide3
      : activeTab === "technical_committee"
      ? slide4
      : slide1;

  const switchTab = (next: TabKey) => {
    setFading(true);
    window.setTimeout(() => {
      setActiveTab(next);
      setFading(false);
    }, 170);
  };

  useEffect(() => {
    setTabPage(0);
    if (activeTab === "technical_program_committee") {
      setTpcSection(0);
      setTpcPage(0);
    }
  }, [activeTab]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (activeTab === "technical_program_committee") {
        const totalPages = pageCount(TPC[tpcSection]?.body.length ?? 0);

        if (e.key === "ArrowRight")
          setTpcPage((p) => clamp(p + 1, 0, totalPages - 1));
        if (e.key === "ArrowLeft")
          setTpcPage((p) => clamp(p - 1, 0, totalPages - 1));

        if (e.key === "ArrowDown") {
          const nextSection = clamp(tpcSection + 1, 0, TPC.length - 1);
          if (nextSection !== tpcSection) {
            setTpcSection(nextSection);
            setTpcPage(0);
          }
        }
        if (e.key === "ArrowUp") {
          const prevSection = clamp(tpcSection - 1, 0, TPC.length - 1);
          if (prevSection !== tpcSection) {
            setTpcSection(prevSection);
            setTpcPage(0);
          }
        }
      } else {
        const rows =
          TAB[activeTab as Exclude<TabKey, "technical_program_committee">].body;
        const totalPages = pageCount(rows.length);

        if (e.key === "ArrowRight")
          setTabPage((p) => clamp(p + 1, 0, totalPages - 1));
        if (e.key === "ArrowLeft")
          setTabPage((p) => clamp(p - 1, 0, totalPages - 1));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeTab, TAB, TPC, tpcSection]);

  const animatePage = (fn: () => void) => {
    setPageFading(true);
    setTimeout(() => {
      fn();
      setPageFading(false);
    }, 160);
  };

  const renderTable = (rows: Member[]) => (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="border-b lg:text-lg">
          <th className="py-2 font-semibold">Name</th>
          <th className="py-2 font-semibold">Affiliation</th>
          <th className="py-2 font-semibold">Country</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((item) => (
          <tr
            key={item.id}
            className="border-b hover:bg-neutral-dark hover:text-white transition text-sm"
          >
            <td className="py-2 lg:py-3 font-semibold">{item.name}</td>
            <td className="py-2 lg:py-3">{item.university}</td>
            <td className="py-2 lg:py-3">{item.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const isTPC = activeTab === "technical_program_committee";

  const normalRows = !isTPC
    ? TAB[activeTab as Exclude<TabKey, "technical_program_committee">].body
    : [];

  const normalTotalPages = !isTPC ? pageCount(normalRows.length) : 1;
  const normalSafePage = clamp(tabPage, 0, normalTotalPages - 1);
  const normalPageRows = !isTPC ? slicePage(normalRows, normalSafePage) : [];

  const tpcRows = isTPC ? TPC[tpcSection]?.body ?? [] : [];
  const tpcTotalPages = isTPC ? pageCount(tpcRows.length) : 1;
  const tpcSafePage = clamp(tpcPage, 0, tpcTotalPages - 1);
  const tpcPageRows = isTPC ? slicePage(tpcRows, tpcSafePage) : [];

  useEffect(() => {
    if (!isTPC) {
      if (tabPage !== normalSafePage) setTabPage(normalSafePage);
    } else {
      if (tpcPage !== tpcSafePage) setTpcPage(tpcSafePage);
    }
  }, [activeTab, normalRows.length, tpcRows.length, tpcSection]);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "steering_committee", label: "Steering Committee" },
    { key: "organizing_committee", label: "Organizing Committee" },
    {
      key: "technical_program_committee",
      label: "Technical Program Committee",
    },
    { key: "technical_committee", label: "Technical Committee" },
    { key: "technical_support", label: "Technical Support" },
  ];

  const tabClass = (key: TabKey) =>
    [
      "w-full flex justify-center items-center",
      "border-2 border-primary-accent transition-all duration-300 ease-in-out",
      key === activeTab
        ? "h-full bg-secondary-accent border-b-transparent"
        : "h-14 bg-neutral-600 text-neutral-400 border-x-transparent border-t-transparent hover:bg-orange-400 hover:text-white",
    ].join(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entries]) => {
        if (entries.intersectionRatio >= 0.2) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`animate__animated animate__slow ${
        animate ? "animate__zoomInDown opacity-100" : "opacity-0"
      } h-120 lg:h-150 lg:max-w-6xl xl:mx-auto mx-3 2xl:mx-0 2xl:w-full flex rounded-xl`}
    >
      <div className="hidden sm:max-w-52 lg:max-w-90  h-full sm:flex flex-col">
        <div className="h-20 border-b-2 border-primary-accent w-full" />
        <div className="w-full h-full border-2 border-t-0 border-r border-primary-accent rounded-bl-xl overflow-hidden">
          <img
            src={imgSrc}
            alt="cmt-image"
            className={`object-cover w-full h-full object-center bg-no-repeat transition-all duration-300 ease-in-out ${
              fading ? "opacity-0" : "opacity-100"
            }`}
            draggable={false}
          />
        </div>
      </div>

      <div className="w-full h-full flex flex-col lg:min-w-180 xl:min-w-200">
        <div className="h-20 w-full flex font-semibold text-neutral-dark items-end text-xs">
          {tabs.map((t) => (
            <div key={t.key} className={tabClass(t.key)}>
              <button
                type="button"
                className="w-full h-full cursor-pointer"
                onClick={() => switchTab(t.key)}
              >
                {t.label}
              </button>
            </div>
          ))}
        </div>

        <div className="w-full h-full flex flex-col border-b-2 border-r-2 border-primary-accent rounded-br-xl bg-secondary-accent text-neutral-dark">
          <h2
            className={`text-xl lg:text-2xl text-center pb-2 lg:pb-4 pt-3 lg:pt-8 font-bold underline underline-offset-[6px] transition-opacity duration-300 ease-in-out ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          >
            {isTPC
              ? "Technical Program Committee"
              : TAB[activeTab as Exclude<TabKey, "technical_program_committee">]
                  .title}
          </h2>

          {isTPC && (
            <div className="px-6 pb-3 flex items-center justify-center gap-3">
              {TPC.map((sec, i) => (
                <button
                  key={sec.id}
                  onClick={() =>
                    animatePage(() => {
                      setTpcSection(i);
                      setTpcPage(0);
                    })
                  }
                  className={`px-4 py-2 rounded-lg font-semibold text-sm shadow-sm transition 
                    cursor-pointer ${
                      tpcSection === i
                        ? "bg-neutral-dark text-white"
                        : "bg-white/60 hover:bg-white"
                    }`}
                >
                  {sec.title}
                </button>
              ))}
            </div>
          )}

          <div
            className={`transition-opacity w-full h-full relative duration-300 px-5 lg:p-6 ease-in-out ${
              fading || pageFading ? "opacity-0" : "opacity-100"
            }`}
          >
            {isTPC ? (
              <>
                {renderTable(tpcPageRows)}
                {tpcRows.length === 0 && (
                  <p className="py-6 text-center text-neutral-700">
                    Data is not available yet.
                  </p>
                )}

                {tpcRows.length > ROWS_PER_PAGE && (
                  <div className="flex items-center justify-between absolute left-2 sm:left-8 right-2 sm:right-8 bottom-5">
                    <button
                      className="px-5 py-2 rounded-lg shadow-xl bg-neutral-dark cursor-pointer text-white disabled:opacity-40 font-semibold text-sm hover:bg-orange-400 disabled:cursor-not-allowed"
                      onClick={() =>
                        animatePage(() =>
                          setTpcPage((p) => clamp(p - 1, 0, tpcTotalPages - 1))
                        )
                      }
                      disabled={tpcSafePage === 0}
                    >
                      ← Prev
                    </button>

                    <div className="text-sm">
                      Page {tpcSafePage + 1} / {tpcTotalPages}
                      <span className="ml-2 opacity-70">(use ← / →)</span>
                    </div>

                    <button
                      className="px-5 py-2 rounded-lg shadow-xl bg-neutral-dark text-white cursor-pointer disabled:opacity-40 font-semibold text-sm hover:bg-orange-400 disabled:cursor-not-allowed"
                      onClick={() =>
                        animatePage(() =>
                          setTpcPage((p) => clamp(p + 1, 0, tpcTotalPages - 1))
                        )
                      }
                      disabled={tpcSafePage === tpcTotalPages - 1}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {renderTable(normalPageRows)}
                {normalRows.length === 0 && (
                  <p className="py-6 text-center text-neutral-700">
                    Data is not available yet.
                  </p>
                )}

                {normalRows.length > ROWS_PER_PAGE && (
                  <div className="flex items-center justify-between absolute left-2 sm:left-8 right-2 sm:right-8 bottom-5">
                    <button
                      className="px-5 py-2 rounded-lg shadow-xl bg-neutral-dark text-white cursor-pointer disabled:opacity-40 font-semibold text-sm hover:bg-orange-400 disabled:cursor-not-allowed"
                      onClick={() =>
                        animatePage(() =>
                          setTabPage((p) =>
                            clamp(p - 1, 0, normalTotalPages - 1)
                          )
                        )
                      }
                      disabled={normalSafePage === 0}
                    >
                      ← Prev
                    </button>

                    <div className="text-sm">
                      Page {normalSafePage + 1} / {normalTotalPages}
                      <span className="ml-2 opacity-70">(use ← / →)</span>
                    </div>

                    <button
                      className="px-5 py-2 rounded-lg shadow-xl bg-neutral-dark text-white cursor-pointer disabled:opacity-40 font-semibold text-sm hover:bg-orange-400 disabled:cursor-not-allowed"
                      onClick={() =>
                        animatePage(() =>
                          setTabPage((p) =>
                            clamp(p + 1, 0, normalTotalPages - 1)
                          )
                        )
                      }
                      disabled={normalSafePage === normalTotalPages - 1}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Committee;
