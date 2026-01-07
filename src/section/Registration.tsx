import fl_2 from "../assets/fl-3.jpg";
import edas_logo from "../assets/logo/edas-logo.png";
// import Marquee from "@/components/Marque";
import tel_u_logo from "../assets/logo/Logo-Vertikal-Telkom-University.png";
import ieeeis_logo from "../assets/logo/ieeeis-logo.png";
import Committee from "@/components/Committee";
import { useEffect, useRef, useState } from "react";

const rows1 = [
  {
    id: 1,
    categories: "IEEE Students Member*",
    overseas_participants: "$ 275",
    local_participants: "IDR 2,750,000",
  },
  {
    id: 2,
    categories: "Regular Students (Non IEEE Member)",
    overseas_participants: "$ 300",
    local_participants: "IDR 3,000,000",
  },
  {
    id: 3,
    categories: "IEEE Profesional Member",
    overseas_participants: "$ 325",
    local_participants: "IDR 3,250,000",
  },
  {
    id: 4,
    categories: "Regular Profesional (Non IEEE Member)",
    overseas_participants: "$ 350",
    local_participants: "IDR 3,500,000",
  },
  {
    id: 5,
    categories: "Extra Paper (per paper)",
    overseas_participants: "$ 275",
    local_participants: "IDR 2,750,000",
  },
  {
    id: 6,
    categories: "Attendee Non Presenter",
    overseas_participants: "$ 75",
    local_participants: "IDR 750,000",
  },
  {
    id: 7,
    categories: "Additional Fee per Page (For papers longer than 6 pages)",
    overseas_participants: "$ 50",
    local_participants: "IDR 500,000",
  },
];

const rows2 = [
  {
    id: 1,
    categories: "IEEE Students Member*",
    overseas_participants: "$ 300",
    local_participants: "IDR 3,000,000",
  },
  {
    id: 2,
    categories: "Regular Students (Non IEEE Member)",
    overseas_participants: "$ 325",
    local_participants: "IDR 3,250,000",
  },
  {
    id: 3,
    categories: "IEEE Profesional Member",
    overseas_participants: "$ 350",
    local_participants: "IDR 3,500,000",
  },
  {
    id: 4,
    categories: "Regular Profesional (Non IEEE Member)",
    overseas_participants: "$ 375",
    local_participants: "IDR 3,750,000",
  },
  {
    id: 5,
    categories: "Extra Paper (per paper)",
    overseas_participants: "$ 275",
    local_participants: "IDR 2,750,000",
  },
  {
    id: 6,
    categories: "Attendee Non Presenter",
    overseas_participants: "$ 75",
    local_participants: "IDR 750,000",
  },
  {
    id: 7,
    categories: "Additional Fee per Page (For papers longer than 6 pages)",
    overseas_participants: "$ 50",
    local_participants: "IDR 500,000",
  },
];

const Registration = () => {
  const ref1 = useRef<HTMLDivElement | null>(null);
  const ref2 = useRef<HTMLDivElement | null>(null);
  const ref3 = useRef<HTMLDivElement | null>(null);
  const ref4 = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);
  const [animate2, setAnimate2] = useState(false);
  const [animate3, setAnimate3] = useState(false);
  const [animate4, setAnimate4] = useState(false);

  useEffect(() => {
    const el = ref1.current;
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

  useEffect(() => {
    const el = ref2.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.3) {
          setAnimate2(true);
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

  useEffect(() => {
    const el = ref3.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.4) {
          setAnimate3(true);
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

  useEffect(() => {
    const el = ref4.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.4) {
          setAnimate4(true);
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
    <div className="w-full 2xl:h-944.5 flex flex-col">
      <div
        ref={ref1}
        className="w-full h-275 sm:h-319.25 border-t-2 border-secondary-accent relative flex flex-col"
      >
        <div className="absolute h-full w-full bg-neutral-dark z-0" />
        <div className="lg:max-w-6xl lg:mx-auto h-full z-20 flex flex-col mx-2">
          <div
            className={`animate__animated animate__slow ${
              animate ? "animate__fadeInDown opacity-100" : "opacity-0"
            } sm:h-36 grid grid-cols-2 mt-10`}
          >
            <div className="flex justify-end items-center">
              <h1 className="text-3xl sm:text-6xl font-bold text-secondary-accent">
                Registration
              </h1>
            </div>
            <div className="items-center flex">
              <hr className="ml-4 w-full h-1 bg-secondary-accent" />
            </div>
          </div>
          <div className="w-full h-full text-secondary-accent pt-3">
            <div
              className={`animate__animated animate__slow ${
                animate ? "animate__fadeInDown opacity-100" : "opacity-0"
              }`}
            >
              <h2 className="text-center font-semibold text-sm sm:text-lg">
                Registration MUST be done after your paper is accepted and
                before uploaded the final manuscript (camera ready).
              </h2>
              <p className="mt-5 text-xs sm:text-lg">
                Registration Fee for Submission{" "}
                <span className="text-orange-400 font-semibold">
                  Paper BEFORE 16 October 2025
                </span>
              </p>
            </div>
            <div
              className={`animate__animated animate__slow ${
                animate ? "animate__fadeInLeft opacity-100" : "opacity-0"
              } mt-4 w-full overflow-x-scroll sm:overflow-x-auto rounded-xl border border-secondary-accent/40`}
            >
              <table className="min-w-200 w-full border-separate border-spacing-0 text-xs sm:text-sm">
                <thead className="bg-secondary-accent/10">
                  <tr>
                    <th className="border-b border-secondary-accent/30 px-5 py-4 text-left font-bold">
                      No
                    </th>
                    <th className="border-b border-secondary-accent/30 px-5 py-4 text-left font-bold">
                      Categories
                    </th>
                    <th className="border-b border-secondary-accent/30 px-5 py-4 text-left font-bold">
                      Overseas Participants
                    </th>
                    <th className="border-b border-secondary-accent/30 px-5 py-4 text-left font-bold">
                      Local Participants
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rows1.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={`transition-colors hover:bg-secondary-accent/10 ${
                        idx % 2 === 1
                          ? "bg-secondary-accent/5"
                          : "bg-transparent"
                      }`}
                    >
                      <td className="border-b border-secondary-accent/20 px-5 py-4">
                        {row.id}
                      </td>
                      <td className="border-b border-secondary-accent/20 px-5 py-4 font-semibold">
                        {row.categories}
                      </td>
                      <td className="border-b border-secondary-accent/20 px-5 py-4">
                        {row.overseas_participants}
                      </td>
                      <td className="border-b border-secondary-accent/20 px-5 py-4">
                        {row.local_participants}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className={`animate__animated animate__slow ${
                animate ? "animate__fadeInRight opacity-100" : "opacity-0"
              }`}
            >
              <p className="mt-10 text-xs sm:text-lg">
                Registration Fee for Submission{" "}
                <span className="text-orange-400 font-semibold">
                  Paper AFTER 16 October 2025
                </span>
              </p>
              <div className="mt-4 w-full overflow-x-scroll sm:overflow-x-auto rounded-xl border border-secondary-accent/40">
                <table className="min-w-200 w-full border-separate border-spacing-0 text-xs sm:text-sm">
                  <thead className="bg-secondary-accent/10">
                    <tr>
                      <th className="border-b border-secondary-accent/30 px-5 py-4 text-left font-bold">
                        No
                      </th>
                      <th className="border-b border-secondary-accent/30 px-5 py-4 text-left font-bold">
                        Categories
                      </th>
                      <th className="border-b border-secondary-accent/30 px-5 py-4 text-left font-bold">
                        Overseas Participants
                      </th>
                      <th className="border-b border-secondary-accent/30 px-5 py-4 text-left font-bold">
                        Local Participants
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows2.map((row, idx) => (
                      <tr
                        key={row.id}
                        className={`transition-colors hover:bg-secondary-accent/10 ${
                          idx % 2 === 1
                            ? "bg-secondary-accent/5"
                            : "bg-transparent"
                        }`}
                      >
                        <td className="border-b border-secondary-accent/20 px-5 py-4">
                          {row.id}
                        </td>
                        <td className="border-b border-secondary-accent/20 px-5 py-4 font-semibold">
                          {row.categories}
                        </td>
                        <td className="border-b border-secondary-accent/20 px-5 py-4">
                          {row.overseas_participants}
                        </td>
                        <td className="border-b border-secondary-accent/20 px-5 py-4">
                          {row.local_participants}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-40 border-t-2 bg-white border-secondary-accent border-b-2">
        <div className="lg:max-w-6xl lg:mx-auto mx-2 h-full z-20 flex flex-col justify-center text-gray-600 text-xs sm:text-[16px]">
          <p className="italic">
            * Three foreign IEEE student travel grants are provided (term and
            condition applied).
          </p>
          <p className="italic">Please send your ID card when registration.</p>
        </div>
      </div>
      <div
        ref={ref2}
        style={{ backgroundImage: `url(${fl_2})` }}
        className="w-full lg:h-212.75 pb-5 lg:pb-0 border-secondary-accent border-b-2 relative flex flex-col bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute h-full w-full bg-neutral-dark/95 z-0" />
        <div className="lg:max-w-6xl lg:mx-auto mx-3 h-full z-20">
          <div
            className={`animate__animated animate__slow ${
              animate2 ? "animate__fadeInDown opacity-100" : "opacity-0"
            } flex mt-16 items-center`}
          >
            <div className="w-100 sm:w-92 lg:w-80 text-secondary-accent">
              <h2 className="text-2xl sm:text-3xl font-bold">Payment Method</h2>
            </div>
            <div className="w-full">
              <hr className="w-full h-1 bg-secondary-accent" />
            </div>
          </div>
          <div>
            <div
              className={`animate__animated animate__slow ${
                animate2 ? "animate__fadeInDown opacity-100" : "opacity-0"
              }`}
            >
              <h2 className="mt-8 text-xl sm:text-2xl font-bold text-secondary-accent">
                International Participants
              </h2>
              <p className="text-gray-300 pl-8 text-sm sm:text-lg">
                Registration payments for international participants are made
                via EDAS using a credit card at an exchange rate of US dollars.
                Confirmation is automatic because it uses the EDAS system. If
                your payment is successful, the status will change to PAID.
              </p>
              <div className="flex mt-3 sm:mt-0">
                <h2 className="mt-5 text-xl font-bold text-secondary-accent">
                  Online Registration via{" "}
                  <span>
                    <a href="#" className="text-orange-400">
                      EDAS
                    </a>
                  </span>
                </h2>
                <a href="#">
                  <img src={edas_logo} alt="" className="h-16 w-16 ml-2" />
                </a>
              </div>
            </div>
            <div
              className={`animate__animated animate__slow ${
                animate2 ? "animate__fadeInLeft opacity-100" : "opacity-0"
              }`}
            >
              <p className="sm:mt-3 text-gray-300 font-semibold text-sm sm:text-lg">
                For overseas participants who have problems paying by credit
                card, please transfer directly to our bank account.
              </p>
              <div className="flex pl-8 text-sm sm:text-lg">
                <div className="text-secondary-accent grid grid-rows-4 font-semibold">
                  <p>Bank</p>
                  <p>SWIFT Code</p>
                  <p>Beneficiary Name</p>
                  <p>Account No.</p>
                </div>
                <div className="pl-2 text-secondary-accent grid grid-rows-4">
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                </div>
                <div className="text-secondary-accent ml-2 grid grid-rows-4 sm:text-lg font-bold">
                  <p>Bank XXX</p>
                  <p>xxxBISA</p>
                  <p>Jhon Doe</p>
                  <p>1827xxxxx</p>
                </div>
              </div>
              <h3 className="mt-3 sm:mt-5 text-orange-400">Note:</h3>
              <ol className="pl-8 text-gray-300">
                <li className="list-disc">
                  Because you come from overseas, please make sure you include
                  the SWIFT CODE.
                </li>
                <li className="list-disc">Transfer fees are not included.</li>
              </ol>
            </div>
            <div
              className={`animate__animated animate__slow ${
                animate2 ? "animate__fadeInRight opacity-100" : "opacity-0"
              }`}
            >
              <h2 className="mt-10 text-xl sm:text-2xl font-bold text-secondary-accent">
                Domestic Participants
              </h2>
              <p className="text-gray-300 pl-5">
                Registration Payment for Domestic Participants can be made by
                local bank transfer.
              </p>
              <div className="flex pl-8">
                <div className="text-secondary-accent grid grid-rows-3 font-semibold">
                  <p>Bank</p>
                  <p>Beneficiary Name</p>
                  <p>Account No.</p>
                </div>
                <div className="pl-2 text-secondary-accent grid grid-rows-3">
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                </div>
                <div className="text-secondary-accent ml-2 grid grid-rows-3 sm:text-lg font-bold">
                  <p>Bank XXX</p>
                  <p>Jhon Doe</p>
                  <p>1827xxxxx</p>
                </div>
              </div>
            </div>
            <div
              className={`animate__animated animate__slow ${
                animate2 ? "animate__fadeInLeft opacity-100" : "opacity-0"
              }`}
            >
              <p className="mt-2 text-gray-300 font-semibold text-sm sm:text-lg">
                To make it easier to check, please add the last 4 digits of your
                id paper to the registration fee. Confirmation is manual,
                meaning you must inform and send proof of transfer at this link
                below.
              </p>
              <button
                className={`mt-4 px-4 py-2 flex items-center gap-2 
                bg-primary-accent text-white rounded-md cursor-pointer hover:bg-orange-400 
                transition-all duration-200 ease-in-out shadow-md hover:shadow-lg active:shadow-sm 
                active:scale-[0.90] active:translate-y-px font-semibold`}
              >
                Registration
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={ref3}
        className="w-full lg:h-190 2xl:h-267 flex flex-col bg-neutral-light"
      >
        <div className="lg:max-w-6xl xl:max-w-7xl mx-auto h-full flex flex-col">
          <div
            className={`animate__animated animate__slow ${
              animate3 ? "animate__zoomInDown opacity-100" : "opacity-0"
            } text-center pt-10 2xl:pt-20 flex justify-center`}
          >
            <div className="w-full items-center flex">
              <hr className="w-full h-1 sm:h-1.5 bg-neutral-dark border-0" />
            </div>
            <div className="items-center flex mx-3">
              <h1 className="text-4xl lg:text-5xl font-bold text-neutral-dark">
                Committee
              </h1>
            </div>
            <div className="w-full items-center flex">
              <hr className="w-full h-1 sm:h-1.5 bg-neutral-dark border-0" />
            </div>
          </div>
          <div className="overflow-hidden w-full h-full flex 2xl:items-center pt-5 pb-10 lg:pb-0">
            <Committee />
          </div>
        </div>
      </div>
      <div
        ref={ref4}
        className="w-full flex lg:h-106 flex-col pt-3 sm:pt-6 border-t-2 border-secondary-accent"
      >
        <div className="w-full sm:h-50 flex flex-col">
          <div
            className={`animate__animated animate__slow ${
              animate4 ? "animate__fadeInRight opacity-100" : "opacity-0"
            } flex ml-5 lg:ml-80 py-5 items-center`}
          >
            <p className="text-xl sm:text-2xl font-bold text-primary-accent w-46 lg:w-42">
              Organized by
            </p>
            <hr className="h-1 w-full bg-primary-accent border-0" />
          </div>
          {/* <Marquee speed={180} direction={-1} className="h-full">
            <img src={tel_u_logo} alt="" className="h-35" />
            </Marquee> */}
          <div
            className={`animate__animated animate__slow ${
              animate4 ? "animate__zoomIn opacity-100" : "opacity-0"
            } flex justify-center`}
          >
            <img src={tel_u_logo} alt="" className="h-35" />
          </div>
        </div>
        <div className="w-full h-40 sm:h-50 flex flex-col">
          <div
            className={`animate__animated animate__slow ${
              animate4 ? "animate__fadeInLeft opacity-100" : "opacity-0"
            } flex mr-5 lg:mr-80 py-5 items-center`}
          >
            <hr className="w-full h-1 bg-primary-accent border-0" />
            <p className="ml-1 sm:ml-3 text-xl sm:text-2xl font-bold text-primary-accent w-195 sm:w-120 lg:w-92">
              Financial Co-Sponsored by
            </p>
          </div>
          {/* <Marquee speed={150} direction={1} className="h-full">
            <img src={ieeeis_logo} alt="" className="w-56" />
          </Marquee> */}
          <div
            className={`animate__animated animate__slow ${
              animate4 ? "animate__zoomIn opacity-100" : "opacity-0"
            } flex justify-center`}
          >
            <img src={ieeeis_logo} alt="" className="w-56" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
