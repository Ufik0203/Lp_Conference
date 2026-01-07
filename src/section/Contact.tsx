import { MdAttachEmail } from "react-icons/md";
import sl_1 from "/images/slide-1.webp";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

const Contact = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = useState(false);

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
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ backgroundImage: `url(${sl_1})` }}
      className="w-full h-full flex flex-col relative bg-cover bg-center bg-no-repeat border-t-2 border-secondary-accent"
    >
      <div className="w-full h-188 2xl:h-200 absolute bg-linear-to-b sm:bg-linear-to-r from-neutral-dark via-neutral-dark via-70% sm:via-60% to-transparent z-0" />
      <div className="h-20 sm:h-28 2xl:h-40 lg:ml-78 ml-10 flex items-end text-secondary-accent z-20">
        <div
          className={`w-full flex items-center animate__animated animate__slow ${
            animate ? "animate__fadeInRight opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-2xl sm:text-4xl font-bold w-60 sm:w-72 2xl:w-65">
            Get in Touch
          </h1>
          <hr className="sm:h-1 bg-secondary-accent w-full" />
        </div>
      </div>
      <div className="w-full lg:max-w-6xl 2xl:max-w-7xl lg:mx-auto px-5 text-secondary-accent pb-5 sm:pb-0 sm:h-160 z-20 flex flex-col sm:flex-row">
        <div
          className={`animate__animated animate__slow ${
            animate ? "animate__fadeInLeft opacity-100" : "opacity-0"
          } sm:w-1/2 h-full flex flex-col`}
        >
          <div className="mt-10 sm:mt-20 flex w-full items-center">
            <div className="w-10 h-10 sm:w-16 sm:h-16">
              <MdAttachEmail className="w-full h-full" />
            </div>
            <div className="pl-5">
              <h2>Email address</h2>
              <h2 className="sm:text-xl font-bold">Contact@mail.com</h2>
            </div>
          </div>
          <div className="mt-10 flex w-full items-center">
            <div className="w-10 h-10 sm:w-16 sm:h-16">
              <IoLogoWhatsapp className="w-full h-full" />
            </div>
            <div className="pl-5">
              <h2>WhatsApp Chat</h2>
              <h2 className="sm:text-xl font-bold">08213xxxxx</h2>
            </div>
          </div>
          <div className="mt-10 flex w-full items-center">
            <div className="w-10 h-10 sm:w-16 sm:h-16">
              <FaMapLocationDot className="w-full h-full" />
            </div>
            <div className="pl-5">
              <h2>Location</h2>
              <h2 className="sm:text-xl font-bold">Jl. Ketintang, Surabaya</h2>
            </div>
          </div>
        </div>
        <div className="sm:w-1/2 h-full flex flex-col mt-5 sm:mt-0">
          <div
            className={`animate__animated animate__slow ${
              animate ? "animate__fadeInRight opacity-100" : "opacity-0"
            } pt-5`}
          >
            <h2 className="pl-5 underline underline-offset-4 text-3xl font-bold">
              Venue Location
            </h2>
            <p className="text-xl mt-5 sm:mt-8 font-semibold">
              Gedung Aula & SBS
            </p>
            <p className="sm:my-4 pl-5 sm:pl-0">jl. Ketintang, Surabaya</p>
          </div>
          <div
            className={`animate__animated animate__slow ${
              animate ? "animate__zoomIn opacity-100" : "opacity-0"
            } mt-8 sm:mt-5 w-full h-96 rounded-xl border-4`}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.3797874886873!2d112.72634007628974!3d-7.311161171886884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbd1cb925a1d%3A0x1dbecb0b2e9b059f!2sUniversitas%20Telkom%20Surabaya!5e0!3m2!1sid!2sid!4v1767231290685!5m2!1sid!2sid"
              className="w-full h-full border-0 rounded-lg"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-secondary-accent border-t-4 border-primary-accent h-25">
        <div
          className={`animate__animated animate__slow ${
            animate ? "animate__zoomIn opacity-100" : "opacity-0"
          } lg:max-w-310 lg:mx-auto mx-5 h-full flex sm:items-center`}
        >
          <h3 className="text-neutral-dark font-semibold text-xs sm:text-sm pt-3 sm:pt-0">
            &copy; 2026 Mario Achmad Taufik. All rights reserved.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Contact;
