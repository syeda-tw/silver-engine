import { forwardRef, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Button from "../button";

interface AnimatedInputProps {
  label?: string;
  value?: string;
  className?: string;
  id?: string;
  triggerAimationOnAnimatedInput?: boolean;
  setTriggerAimationOnAnimatedInput: (value: boolean) => void;
  setAntimatedInputAnimationComplete: (value: boolean) => void;
  stopAnimation?: () => void;
}

const AnimatedInput = forwardRef<HTMLDivElement, AnimatedInputProps>(
  (
    {
      label,
      value = "",
      className = "",
      triggerAimationOnAnimatedInput = false,
      setTriggerAimationOnAnimatedInput,
      setAntimatedInputAnimationComplete,
      stopAnimation,
      ...props
    },
    ref
  ) => {
    const labelRef = useRef<HTMLDivElement>(null);
    const inputTextRef = useRef<HTMLSpanElement>(null);
    const changeButtonRef = useRef<HTMLButtonElement>(null);

    const stopAnimationInternal = () => {
      gsap
        .timeline({
          onComplete: () => {
            stopAnimation?.();
          },
        })
        .to(
          labelRef.current,
          {
            duration: 0.5,
            opacity: 0,
            x: -100,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(inputTextRef.current, {
          duration: 0.5,
          x: 0,
          ease: "power2.out",
          onStart: () => {
            if (inputTextRef.current) {
              inputTextRef.current.classList.remove("shine-text");
            }
          },
        })
        .to(
          changeButtonRef.current,
          {
            duration: 1,
            opacity: 0,
            ease: "power2.out",
          },
          "-=0.5"
        );
    };

    useEffect(() => {
      // Only run animation when trigger is true
      if (triggerAimationOnAnimatedInput) {
        const tl = gsap.timeline({
          onComplete: () => {
            if (setTriggerAimationOnAnimatedInput) {
              setTriggerAimationOnAnimatedInput(false);
            }
            setAntimatedInputAnimationComplete(true);
          },
        });

        // Animate label in, then animate input text and change button
        tl.to(inputTextRef.current, {
          duration: 1,
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
            "-=0.5"
          )

          .to(
            changeButtonRef.current,
            {
              duration: 0.5,
              opacity: 1,
              ease: "power2.in",
            },
            "-=1"
          )
          .to(
            inputTextRef.current,
            {
              onStart: () => {
                if (inputTextRef.current) {
                  inputTextRef.current.classList.add("shine-text");
                }
              },
            },
            "+=1"
          );
      }
    }, [triggerAimationOnAnimatedInput, setTriggerAimationOnAnimatedInput, setAntimatedInputAnimationComplete]);

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
            onClick={() => {
              stopAnimationInternal();
            }}
            className="!hover:no-underline opacity-0 z-10"
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
