import { forwardRef, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Button from "../button";

interface AnimatedInputProps {
  label?: string;
  value?: string;
  className?: string;
  id?: string;
  triggerAimationOnAnimatedInput?: boolean;
  setAntimatedInputAnimationComplete?: (value: boolean) => void;
}

const AnimatedInput = forwardRef<HTMLDivElement, AnimatedInputProps>(
  (
    {
      label,
      value = "",
      className = "",
      triggerAimationOnAnimatedInput = false,
      setAntimatedInputAnimationComplete,
      ...props
    },
    ref
  ) => {
    const labelRef = useRef<HTMLDivElement>(null);
    const inputTextRef = useRef<HTMLSpanElement>(null);
    const changeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      // Only run animation when trigger is true
      if (triggerAimationOnAnimatedInput) {
        const tl = gsap.timeline({
          onComplete: () => {
            if (setAntimatedInputAnimationComplete) {
              setAntimatedInputAnimationComplete(true);
            }
          },
        });

        // Animate label in, then animate input text and change button
        tl.to(inputTextRef.current, {
          duration: 0.5,
          x: 70,
          ease: "power2.in",
        })
          .to(
            labelRef.current,
            {
              duration: 0.5,
              opacity: 1,
              x: 2,
              ease: "power2.in",
            },
          )
          .to(inputTextRef.current, {
            onStart: () => {
              if (inputTextRef.current) {
                inputTextRef.current.classList.add("shine-text");
              }
            },
          }, "+=0.5")
          .to(changeButtonRef.current, {
            duration: 1,
            opacity: 1,
            ease: "power2.in",
          },"-=1");
      }
    }, [triggerAimationOnAnimatedInput]);

    return (
      <div
        className="relative"
        data-animated="input-container"
        ref={ref}
        {...props}
      >
        <div
          className={`
              w-full h-12 px-4 border-none transition-all
              bg-primary/10 
              border-transparent
              ${className}
              flex items-center
              relative
            `}
        >
          {/* Label inside input box, hidden until animation triggers */}
          {label && (
            <div
              ref={labelRef}
              className="absolute left-6 top-3 text-16px text-primary pointer-events-none select-none opacity-0"
              data-animated="label"
              aria-hidden={!triggerAimationOnAnimatedInput}
            >
              {label}
            </div>
          )}

          {/* Text content - animated with GSAP */}
          <span
            ref={inputTextRef}
            className="text-primary leading-6 flex-1 font-bold text-[16px]"
            data-animated="input-text"
          >
            {value}
          </span>

          <Button
            variant="ghost"
            size="small"
            onClick={() => {}}
            className="!hover:no-underline opacity-0"
            ref={changeButtonRef}
          >
            <span className="text-text font-normal border-b-2 border-dotted border-text pb-0.5 transition-colors">
              Change
            </span>
          </Button>
        </div>
      </div>
    );
  }
);

AnimatedInput.displayName = "AnimatedInput";

export default AnimatedInput;
