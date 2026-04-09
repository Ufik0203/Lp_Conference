import React from "react";

type BaseProps = {
  label: React.ReactNode;
  active?: boolean;
  b_classname?: string;
  className?: string;
  additionalClassName?: string;
  children?: React.ReactNode;
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  BaseProps & {
    href?: undefined;
  };

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  BaseProps & {
    href: string;
  };

type ButtonNavProps = ButtonProps | AnchorProps;

const ButtonNav = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonNavProps
>((props, ref) => {
  const {
    active = false,
    label,
    b_classname,
    className,
    additionalClassName,
    children,
    ...rest
  } = props;

  const baseClass = [
    `group relative px-1 py-2 h-full ${b_classname ?? ""}`,
    "cursor-pointer select-none flex items-center justify-center",
    "transition-colors duration-200",
    "transition-all duration-200 ease-in-out active:shadow-sm active:scale-[0.95] active:translate-y-px",
    active
      ? `text-orange-400 ${className ?? ""}`
      : `text-primary-accent hover:text-orange-400 ${
          additionalClassName ?? ""
        }`,
  ].join(" ");

  // 🔥 Kalau ada href → pakai <a>
  if ("href" in props && props.href) {
    return (
      <a
        {...(rest as AnchorProps)}
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={props.href}
        aria-current={active ? "page" : undefined}
        className={baseClass}
      >
        {label}
        {children}
        <span
          className={[
            "pointer-events-none absolute",
            "left-1/2 -translate-x-1/2 -bottom-1",
            "h-1 w-full bg-orange-400",
            "origin-center transform transition-transform duration-300 ease-out",
            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
          ].join(" ")}
        />
      </a>
    );
  }

  // 🔥 Default → button
  return (
    <button
      {...(rest as ButtonProps)}
      ref={ref as React.Ref<HTMLButtonElement>}
      type={(props as ButtonProps).type ?? "button"}
      aria-current={active ? "page" : undefined}
      className={baseClass}
    >
      {label}
      {children}
      <span
        className={[
          "pointer-events-none absolute",
          "left-1/2 -translate-x-1/2 -bottom-1",
          "h-1 w-full bg-orange-400",
          "origin-center transform transition-transform duration-300 ease-out",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        ].join(" ")}
      />
    </button>
  );
});

export default ButtonNav;