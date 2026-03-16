import React from "react";

type ButtonNavProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: React.ReactNode;
  active?: boolean;
  b_classname?: string;
  className?: string;
  additionalClassName?: string;
  children?: React.ReactNode;
};

const ButtonNav = React.forwardRef<HTMLButtonElement, ButtonNavProps>(
  (
    {
      onClick,
      active = false,
      label,
      b_classname,
      className,
      additionalClassName,
      children,
      type,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        {...rest}
        type={type ?? "button"}
        ref={ref}
        aria-current={active ? "page" : undefined}
        onClick={onClick}
        className={[
          `group relative px-1 py-2 h-full ${b_classname}`,
          "cursor-pointer select-none flex items-center justify-center",
          "transition-colors duration-200",
          "transition-all duration-200 ease-in-out active:shadow-sm active:scale-[0.95] active:translate-y-px",
          active
            ? `text-orange-400  ${className}`
            : `text-primary-accent hover:text-orange-400 ${additionalClassName}`,
        ].join(" ")}
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
  },
);

export default ButtonNav;
