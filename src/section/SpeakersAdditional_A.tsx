import { useEffect, useRef, useState } from "react";
import pdf_logo from "/logo/pdf-express-logo.webp";
import type { PdfExpressData } from "@/types/speakerAdditional_ATypes";
import DOMPurify from "dompurify";
import { getSpeakerAdditional_A } from "@/services/speakerAdditional_A.service";

// const ATA = [
//   {
//     id: 1,
//     body: "It provides a means for you to convert your files to PDF, without requiring you to have access to a conversion program",
//   },
//   {
//     id: 2,
//     body: "This conversion is provided in an IEEE Xplore compatible format, without you having to worry about conversion settings",
//   },
//   {
//     id: 3,
//     body: "The system emails the converted file back to you, so you can make sure that your contribution is IEEE Xplore compatible and that no unintended corruption occurred",
//   },
//   {
//     id: 4,
//     body: "It ensures that your paper views and prints as well as possible in IEEE Xplore",
//   },
//   {
//     id: 5,
//     body: "By minimizing the risk of post-processing problems, it reduces the amount of time it will take for your paper to appear on IEEE Xplore",
//   },
//   {
//     id: 6,
//     body: "It greatly simplifies the task of conforming to IEEE submission requirements",
//   },
// ];

// const SFC = [
//   {
//     id: 1,
//     body: "Create your manuscript",
//   },
//   {
//     id: 2,
//     body: "Proofread and check layout of manuscript (It is highly recommended that you do this BEFORE going to PDF eXpress)",
//   },
//   {
//     id: 3,
//     body: "Create PDF eXpress account",
//   },
//   {
//     id: 4,
//     body: "Upload source file(s) for Conversion; and/or PDF(s) for Checking",
//   },
//   {
//     id: 5,
//     body: "Use PDF eXpress to attain Xplore-compatible PDFs. The site contains extensive instructions, resources, and helpful hints",
//   },
//   {
//     id: 6,
//     head: "IMPORTANT:",
//     body: "After finishing with the PDF eXpress web site, return to the website below to submit your final, Xplore-compatible PDF(s) on the 2025 8th ISRITI Submission site at",
//     link: "https://edas.info/N33925",
//   },
// ];

// const UPE = [
//   {
//     id: 1,
//     head: "Click link",
//     link1: "https://ieee-pdf-express.org",
//     body: "or PDF eXpress logo (at top of page) to go to the",
//     link2: "https://ieee-pdf-express.org/account/login?ReturnUrl=%2F",
//     tail1: "PDF eXpress",
//     tail2: "web site",
//   },
//   {
//     id: 2,
//     body: `Once at the PDF eXpress web site, create a new account by clicking on "New Users - Click Here" link`,
//   },
//   {
//     id: 3,
//     body: "Enter the code",
//     code: "68345X",
//     tail2: "for the Conference ID",
//   },
//   {
//     id: 4,
//     body: "Continue to enter information as prompted. You will receive an email confirming the successful creation of your account",
//   },
//   {
//     id: 5,
//     body: `Through your PDF eXpress account, you may submit your source application files for conversion to PDF,
//     and/or submit PDFs for checking. You will have the opportunity to revise your submission if you are not satisfied
//     with the PDF that PDF eXpress creates for you, if you find mistakes in your manuscript, or if your PDF fails the PDF Check`,
//   },
//   {
//     id: 6,
//     body: "Technical support via email is available if you experience trouble in creating your PDF:",
//     link2: "#",
//     tail1: "pdfsupport@ieee.org",
//   },
// ];

const htmlToLines = (html: string) => {
  const safeHtml = DOMPurify.sanitize(html);

  const container = document.createElement("div");
  container.innerHTML = safeHtml;

  const lines: string[] = [];

  container.querySelectorAll("p").forEach((p) => {
    const parts = p.innerHTML.split(/<br\s*\/?>/gi);

    parts.forEach((part) => {
      const trimmed = part.trim();
      if (trimmed) lines.push(trimmed);
    });
  });
  return lines;
};

const SpeakersAdditional_A = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);
  const [data, setData] = useState<PdfExpressData>({
    ATA: [],
    SFC: [],
    UPE: [],
  });

  useEffect(() => {
    const fecthSpeakerAdditional_A = async () => {
      try {
        const data = await getSpeakerAdditional_A();
        setData(data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fecthSpeakerAdditional_A();
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
  }, []);

  return (
    <div ref={ref} className="w-full h-full border-t-2 border-secondary-accent">
      <div className="lg:max-w-6xl mx-auto h-full flex flex-col p-5">
        <h1
          className={`animate__animated animate__slow ${
            animate ? "animate__fadeInDown opacity-100" : "opacity-0"
          } text-center mt-5 2xl:mt-20 2xl:pb-10 text-3xl sm:text-4xl font-bold text-neutral-dark`}
        >
          Using PDF Express
        </h1>
        <div
          className={`animate__animated animate__slow ${
            animate ? "animate__fadeInLeft opacity-100" : "opacity-0"
          }`}
        >
          <a href="#" className="w-32 sm:w-fit mb-3 2xl:mb-6">
            <img src={pdf_logo} alt="" />
          </a>
          <h3 className="font-bold text-neutral-dark text-xl sm:text-2xl">
            Why You need to use PDF eXpress:
          </h3>
          <ol className="mt-5 list-disc list-outside leading-relaxed text-start pl-6">
            <li className="pl-2 text-gray-500">
              The new IEEE Xplore® Requirements for PDF will be enforced as of
              2005. All conference articles submitted to IEEE sponsored
              conferences must be in IEEE Xplore-compatible PDF format.
            </li>
            <li className="pt-2 pl-2 text-gray-500">
              IEEE offers PDF eXpress as a free service to IEEE conference
              authors, allowing you to make Xplore-compatible PDFs (Conversion
              function) or to check PDFs you have created yourself for Xplore
              compatibility (PDF Check function).
            </li>
          </ol>
        </div>
        {/* <div
          className={`animate__animated animate__slow ${
            animate ? "animate__fadeInRight opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="mt-5 font-semibold text-xl text-primary-accent">
            Advantages to authors:
          </h3>
          <ol className="mt-2 list-decimal list-outside leading-relaxed text-start pl-10">
            {ATA.map((item) => (
              <li key={item.id} className="pl-2 text-gray-500">
                {item.body}.
              </li>
            ))}
          </ol>
        </div>
        <div
          className={`animate__animated animate__slow ${
            animate ? "animate__fadeInLeft opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="mt-5 font-semibold text-xl text-primary-accent">
            Steps for creating your Xplore compliant PDF file:
          </h3>
          <ol className="mt-2 list-decimal list-outside leading-relaxed text-start pl-10">
            {SFC.map((item) => (
              <li key={item.id} className="pl-2 text-gray-500">
                <span className="font-semibold">{item.head} </span>
                {item.body}
                <span className="text-orange-400">
                  <a target="_blank" rel="noopener noreferrer" href={item.link}>
                    {item.link ? " " : ""}
                    {item.link}
                  </a>
                </span>
                .
              </li>
            ))}
          </ol>
        </div>
        <div
          className={`animate__animated animate__slow ${
            animate ? "animate__fadeInRight opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="mt-5 font-semibold text-xl text-primary-accent">
            Using PDF eXpress:
          </h3>
          <ol className="mt-2 list-decimal list-outside leading-relaxed text-start pl-10">
            {UPE.map((item) => (
              <li key={item.id} className="pl-2 text-gray-500">
                <span>
                  {item.head} {item.head ? " " : ""}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item.link1}
                    className="text-orange-400"
                  >
                    {item.link1}
                    {item.link1 ? " " : ""}
                  </a>
                </span>
                {item.body}
                <span className="font-bold">
                  {item.code ? " " : ""}
                  {item.code}
                  {item.code ? " " : ""}
                </span>
                <span className="text-orange-400">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item.link2}
                  >
                    {item.tail1 ? " " : ""}
                    {item.tail1}
                  </a>
                </span>
                {item.tail2 ? " " : ""}
                {item.tail2}.
              </li>
            ))}
          </ol>
        </div> */}

        {/* ATA */}
        <div
          className={`animate__animated animate__slow ${
            animate ? "animate__fadeInRight opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="mt-5 font-semibold text-xl text-primary-accent">
            Advantages to authors:
          </h3>

          <ol className="mt-2 list-decimal list-outside leading-relaxed text-start pl-10">
            {data.ATA.length === 0 ? (
              <li className="text-gray-400 text-sm font-semibold list-none">
                No Data
              </li>
            ) : (
              data.ATA.map((item) =>
                htmlToLines(item.content).map((line, i) => (
                  <li key={`${item._id}-${i}`} className="pl-2 text-gray-500">
                    <span dangerouslySetInnerHTML={{ __html: line }} />.
                  </li>
                )),
              )
            )}
          </ol>
        </div>

        {/* SFC */}
        <div
          className={`animate__animated animate__slow ${
            animate ? "animate__fadeInLeft opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="mt-5 font-semibold text-xl text-primary-accent">
            Steps for creating your Xplore compliant PDF file:
          </h3>

          <ol className="mt-2 list-decimal list-outside leading-relaxed text-start pl-10">
            {data.SFC.length === 0 ? (
              <li className="text-gray-400 text-sm font-semibold list-none">
                No Data
              </li>
            ) : (
              data.SFC.map((item) =>
                htmlToLines(item.content).map((line, i) => (
                  <li key={`${item._id}-${i}`} className="pl-2 text-gray-500">
                    <span dangerouslySetInnerHTML={{ __html: line }} />.
                  </li>
                )),
              )
            )}
          </ol>
        </div>

        {/* UPE */}
        <div
          className={`animate__animated animate__slow ${
            animate ? "animate__fadeInRight opacity-100" : "opacity-0"
          }`}
        >
          <h3 className="mt-5 font-semibold text-xl text-primary-accent">
            Using PDF eXpress:
          </h3>

          <ol className="mt-2 list-decimal list-outside leading-relaxed text-start pl-10">
            {data.UPE.length === 0 ? (
              <li className="text-gray-400 text-sm font-semibold list-none">
                No Data
              </li>
            ) : (
              data.UPE.map((item) =>
                htmlToLines(item.content).map((line, i) => (
                  <li key={`${item._id}-${i}`} className="pl-2 text-gray-500">
                    <span dangerouslySetInnerHTML={{ __html: line }} />.
                  </li>
                )),
              )
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SpeakersAdditional_A;
