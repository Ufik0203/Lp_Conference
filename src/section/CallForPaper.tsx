import CardStack from "@/components/CardStack";
// import fl_3 from "/images/fl-3.webp";
import { useEffect, useRef, useState } from "react";
import ButtonNav from "@/components/ButtonNav";
import { getCallForPapers } from "@/services/callForPapers.service";
import type { callForPapersCard } from "@/types/callForPapers";
import DOMPurify from "dompurify";

// const data = [
//   {
//     id: "1",
//     title: "Data and Distributed Computing",
//     body: [
//       "Big Data",
//       "Mobile Cloud Services",
//       "Distributed and collaborative development",
//       "Intelligent Systems for Cloud and Services Computing",
//       "Soft Computing, Fuzzy Logic and Artificial Neural Networks",
//       "Mathematical Modeling and Simulation",
//       "Green Computing",
//       "Cloud Computing",
//       "Data Mining, Web Technology and Ontology",
//       "Smart, distributed intelligent factory",
//       "Decision support systems, performance indicators and control",
//       "Nanoelectronics and Quantum Computing",
//       "Decentralized System",
//     ],
//     bgPict: fl_3,
//   },
//   {
//     id: "2",
//     title: "Computer Network, Security, Privacy",
//     body: [
//       "Adhoc Networks and Wireless Networks.",
//       "Sensor networks.",
//       "Network design and architecture.",
//       "Advanced network infrastructures and internetworking.",
//       "Security and Authentication.",
//       "RFIDs and Applications.",
//       "Vehicular Technology and Networks.",
//       "Information Security and Network Security.",
//       "Parallel and Distributed Systems.",
//       "Multimedia Information Processing and Retrieval.",
//       "Telecommunication and Mobile Communication.",
//     ],
//     bgPict: fl_3,
//   },
//   {
//     id: "3",
//     title: "Smart and Autonomus System",
//     body: [
//       "Computer Vision.",
//       "Artificial Intelligence.",
//       "Pattern Recognition.",
//       "Autonomous robotics and transportation.",
//       "Image, Speech, and Signal Processing.",
//       "Nano Technology.",
//       "Grid Technology.",
//       "Power Systems.",
//       "Distributed embedded systems.",
//       "Vehicular Technology.",
//       "Simulation and Hardware Implementation Techniques.",
//       "Manufacturing systems.",
//       "Robotics and Mecatronics.",
//       "Networked health and medical systems.",
//     ],
//     bgPict: fl_3,
//   },
//   {
//     id: "4",
//     title: "Internet Services, Application, Technology",
//     body: [
//       "Internet Technologies.",
//       "Internet Architecture.",
//       "Internet of Things (IoT).",
//       "IoT services and applications.",
//       "Artificial Intelligence and Expert Systems.",
//       "Knowledge Engineering and Management.",
//       "Software-defined Networking.",
//       "Communication Systems and Communication Standards.",
//       "Virtualization.",
//     ],
//     bgPict: fl_3,
//   },
// ];

const CallForPaper = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);
  const [active, setActive] = useState(0);
  const [cards, setCards] = useState<callForPapersCard[]>([]);
  const [body, setBody] = useState("");
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCallForPapers = async () => {
      try {
        const data = await getCallForPapers();
        setCards(data.card || []);
        setBody(data.body ?? "");
      } catch (err) {
        console.error("Failed to fetch CallForPapers", err);
      }
      // finally {
      //   setLoading(false);
      // }
    };
    fetchCallForPapers();
  }, []);

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
  });

  const data =
    cards?.map((item) => ({
      id: item._id,
      title: item.title,
      body: item.body,
      bgPict: item.bg_image_url,
    })) ?? [];

  const totalCards = cards.length;


  return (
    <div
      ref={ref}
      className="overflow-hidden w-full h-full bg-neutral-dark border-t-4 border-secondary-accent lg:flex relative"
    >
      <div className="sm:max-w-2xl lg:max-w-310 h-full mx-5 lg:px-5 2xl:px-0 sm:mx-auto flex flex-col lg:flex-row z-20">
        <div className="lg:w-3/8 h-full text-secondary-accent pt-14 lg:py-14 text-sm sm:text-xl text-justify">
          <div
            className={`animate__animated animate__slow ${
              animate ? "animate__fadeInDown opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-center text-2xl sm:text-4xl font-bold">
              Call for Papers
            </h1>
            {/* <p className="mt-5 xl:mt-8 2xl:mt-16">
              We invite submissions in all areas of information technology and
              intelligent systems research. In particular, we encourage
              submissions related to the seminar theme :{" "}
              <span className="font-extrabold">
                Advanced Intelligent Systems in Contemporary Society
              </span>
              . We, in the name of the committe, hope you enjoy this seminar and
              have a great day in Indonesia.
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
          <div
            className={`animate__animated animate__slow ${
              animate ? "animate__fadeInUp opacity-100" : "opacity-0"
            }`}
          >
            <h3 className="text-center mt-5 xl:mt-8 2xl:mt-10 text-2xl font-bold text-orange-400">
              No Show Policy
            </h3>
            <p className="text-orange-400 mt-2 2xl:mt-5">
              All accepted papers MUST BE presented orally (offline) or
              virtually (online) at the Conference in order to be published in
              the proceeding, unless their paper will not be published in the
              proceeding.
            </p>
            <p className="mt-3 2xl:mt-5 text-orange-400">
              ONLY Accepted & Presented papers will be submitted for possible
              inclusion into IEEE Xplore subject to meeting IEEE Xplore's scope
              and quality requirements.
            </p>
          </div>
        </div>
        <div className="lg:w-5/8 lg:h-full h-130 sm:h-155 grid lg:grid-rows-6">
          <div
            className={`animate__animated animate__slow ${
              animate ? "animate__fadeInRight opacity-100" : "opacity-0"
            } row-span-5 flex justify-center lg:p-3 lg:pt-16 2xl:p-10 flex-col`}
          >
            {cards.length === 0 ? (
              <p className="text-secondary-accent text-center">No Data</p>
            ) : (
              <CardStack
                items={data}
                active={active}
                onChangeActive={setActive}
                maxVisible={3}
              />
            )}
            <div className="w-full flex sm:mt-3 2xl:mt-10">
              <p className="text-sm text-secondary-accent pb-3 sm:pb-10 lg:pb-0 lg:pl-20 select-none">
                <span className="font-bold">*Note: </span>Click the card or the
                title below for more information.
              </p>
            </div>
          </div>

          <div className={`bg-neutral-dark hidden lg:grid lg:grid-cols-5 font-bold`}>
            <div className="diagonal-bottom bg-neutral-light" />
            {/* <div
              className={
                active === 0 ? "pb-2 bg-white" : "pb-2 bg-neutral-light"
              }
            >
              <ButtonNav
                active={active === 0}
                onClick={() => setActive(0)}
                label="Data and Distributed Computing"
              />
            </div>
            <div
              className={
                active === 1 ? "pb-2 bg-white" : "pb-2 bg-neutral-light"
              }
            >
              <ButtonNav
                active={active === 1}
                onClick={() => setActive(1)}
                label="Computer Network, Security, Privacy"
              />
            </div>
            <div
              className={
                active === 2 ? "pb-2 bg-white" : "pb-2 bg-neutral-light"
              }
            >
              <ButtonNav
                active={active === 2}
                onClick={() => setActive(2)}
                label="Smart and Autonomus System"
              />
            </div>
            <div
              className={
                active === 3 ? "pb-2 bg-white" : "pb-2 bg-neutral-light"
              }
            >
              <ButtonNav
                active={active === 3}
                onClick={() => setActive(3)}
                label="Internet Services, Application, Technology"
              />
            </div> */}
            {cards.map((item, index) => (
              <div
                key={item._id}
                className={
                  active === index ? "pb-2 bg-white" : "pb-2 bg-neutral-light"
                }
              >
                <ButtonNav
                  active={active === index}
                  onClick={() => setActive(index)}
                  label={item.title}
                  className="w-full"
                  additionalClassName="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`bg-neutral-dark font-bold lg:hidden border-t-2 border-secondary-accent grid grid-cols-${totalCards}`}>
        {/* <div
          className={active === 0 ? "py-2 bg-white" : "py-2 bg-neutral-light"}
        >
          <ButtonNav
            active={active === 0}
            onClick={() => setActive(0)}
            label="Data and Distributed Computing"
          />
        </div>
        <div
          className={active === 1 ? "py-2 bg-white" : "py-2 bg-neutral-light"}
        >
          <ButtonNav
            active={active === 1}
            onClick={() => setActive(1)}
            label="Computer Network, Security, Privacy"
          />
        </div>
        <div
          className={active === 2 ? "py-2 bg-white" : "py-2 bg-neutral-light"}
        >
          <ButtonNav
            active={active === 2}
            onClick={() => setActive(2)}
            label="Smart and Autonomus System"
          />
        </div>
        <div
          className={active === 3 ? "py-2 bg-white" : "py-2 bg-neutral-light"}
        >
          <ButtonNav
            active={active === 3}
            onClick={() => setActive(3)}
            label="Internet Services, Application, Technology"
          />
        </div> */}
        {cards.map((item, index) => (
          <div
            key={item._id}
            className={
              active === index ? "pb-2 bg-white" : "pb-2 bg-neutral-light"
            }
          >
            <ButtonNav
              active={active === index}
              onClick={() => setActive(index)}
              label={item.title}
              className="w-full"
              additionalClassName="w-full"
            />
          </div>
        ))}
      </div>
      <div className="hidden absolute w-1/2 h-full right-0 lg:grid grid-rows-6">
        <div className="row-span-5 bg-neutral-dark border-b-4 border-secondary-accent" />
        <div className="xl:bg-neutral-light" />
      </div>
    </div>
  );
};

export default CallForPaper;
