import { GiHamburgerMenu } from "react-icons/gi";
import logo_1 from "../assets/logo/Logo-Vertikal-Telkom-University.png";
import { useEffect, useRef, useState } from "react";

type NavbarProps = {
  children: React.ReactNode;
};

const Navbar = ({ children }: NavbarProps) => {
  const [active, setActive] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setActive((prev) => !prev);
  };

  const handleNavClickCapture = (e: React.SyntheticEvent) => {
    if (!active) return;
    const target = e.target as HTMLElement | null;
    if (!target) return;
    if (target.closest('[data-nav-no-close="true"]')) return;
    const clickable = target.closest(
      'a, button, [role="button"], [data-nav-close="true"]'
    ) as HTMLElement | null;
    if (!clickable) return;
    const isDisabled =
      clickable.getAttribute("aria-disabled") === "true" ||
      (clickable as HTMLButtonElement).disabled === true;
    if (isDisabled) return;
    setActive(false);
  };

  useEffect(() => {
    if (!active) return;
    const handler = (e: MouseEvent) => {
      const menu = navbarRef.current;
      const burger = burgerRef.current;
      const target = e.target as Node;
      if (menu && menu.contains(target)) return;
      if (burger && burger.contains(target)) return;
      setActive(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [active]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-20 bg-white/90 backdrop-blur border-b-2 border-primary-accent">
      <div className="hidden lg:mx-auto lg:flex h-full lg:max-w-6xl lg:items-center lg:justify-between">
        <div className="flex items-center">
          <img src={logo_1} alt="" className="object-cover h-20" />
        </div>
        <nav className="lg:flex hidden items-center gap-8 font-semibold">
          {children}
        </nav>
      </div>

      <div className="lg:hidden flex justify-between items-center w-full h-full">
        <div className="pl-10">
          <button
            ref={burgerRef}
            className="w-12 h-12 bg-neutral-dark text-secondary-accent flex items-center justify-center rounded-md cursor-pointer hover:bg-orange-400 hover:text-white"
            onClick={handleClick}
            aria-expanded={active}
            aria-label="Toggle menu"
          >
            <GiHamburgerMenu className="w-7 h-7" />
          </button>
        </div>

        <div className="flex items-center">
          <img src={logo_1} alt="" className="object-cover h-20 pr-5" />
        </div>
      </div>

      <div
        ref={navbarRef}
        className={`flex flex-col lg:hidden border-2 border-secondary-accent bg-white relative ${
          active ? "block" : "hidden"
        }`}
        onClickCapture={handleNavClickCapture}
      >
        {children}
      </div>
    </header>
  );
};

export default Navbar;
