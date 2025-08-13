import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface DrawOutlineButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

const DrawOutlineButton = React.forwardRef<HTMLButtonElement, DrawOutlineButtonProps>(
  ({ children, className, asChild = false, ...rest }, ref) => {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          {...rest}
          className={cn(
            "group relative px-4 py-2 font-medium transition-colors duration-[400ms] text-foreground hover:text-primary",
            className
          )}
        >
          {React.cloneElement(children as React.ReactElement, {
            children: (
              <>
                {(children as React.ReactElement).props.children}
                {/* TOP */}
                <span className="absolute left-0 top-0 h-[2px] w-0 bg-primary transition-all duration-100 group-hover:w-full" />
                {/* RIGHT */}
                <span className="absolute right-0 top-0 h-0 w-[2px] bg-primary transition-all delay-100 duration-100 group-hover:h-full" />
                {/* BOTTOM */}
                <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-primary transition-all delay-200 duration-100 group-hover:w-full" />
                {/* LEFT */}
                <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-primary transition-all delay-300 duration-100 group-hover:h-full" />
              </>
            ),
          })}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        {...rest}
        className={cn(
          "group relative px-4 py-2 font-medium transition-colors duration-[400ms] text-foreground hover:text-primary",
          className
        )}
      >
        {children}

        {/* TOP */}
        <span className="absolute left-0 top-0 h-[2px] w-0 bg-primary transition-all duration-100 group-hover:w-full" />

        {/* RIGHT */}
        <span className="absolute right-0 top-0 h-0 w-[2px] bg-primary transition-all delay-100 duration-100 group-hover:h-full" />

        {/* BOTTOM */}
        <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-primary transition-all delay-200 duration-100 group-hover:w-full" />

        {/* LEFT */}
        <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-primary transition-all delay-300 duration-100 group-hover:h-full" />
      </button>
    );
  }
);

DrawOutlineButton.displayName = "DrawOutlineButton";

export default DrawOutlineButton;
