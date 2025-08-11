"use client";

import { useState, useEffect, useRef } from "react";
import Input from "@/app/components/input";
import Loader from "@/app/components/animatedComponents/loader";
import Button from "./components/button";
import Image from "next/image";
import ChevronLeftIcon from "@/public/icons/chevronLeft.svg";
import AnimatedInput from "./components/animatedComponents/animatedInput";
import gsap from "gsap";
import OTPInput from "./components/otpInput";

export default function Home() {
  const [email, setEmail] = useState("");
  //state that manipulate the real input
  const [isLoaderShown, setIsLoaderShown] = useState(false);
  const [isInputChangeDisabled, setIsInputChangeDisabled] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const realInput = useRef<HTMLInputElement>(null);
  const animatedInput = useRef<HTMLInputElement>(null);
  const otpDiv = useRef<HTMLDivElement>(null);
  const animatedInputWrapper = useRef<HTMLDivElement>(null);

  //state that manipulate the animated input
  const [triggerAimationOnAnimatedInput, setTriggerAimationOnAnimatedInput] =
    useState(false);
  const [antimatedInputAnimationComplete, setAntimatedInputAnimationComplete] =
    useState(false);

  useEffect(() => {
    if (antimatedInputAnimationComplete) {
      gsap
        .timeline()
        .to(otpDiv.current, {
          height: 200,
          display: "block",
          ease: "power2.out",
        })
        .to(animatedInputWrapper.current, {
          height: "100%",
          duration: 0.5,
          ease: "power2.in",
        });
    }
  }, [antimatedInputAnimationComplete]);

  const startAnimation = () => {
    //hide loader
    setTimeout(() => {
      setIsLoaderShown(false);
    }, 1000);

    gsap
      .timeline({
        onComplete: () => {
          setTriggerAimationOnAnimatedInput(true);
        },
      })
      //bring animated input into the DOM
      .to(animatedInput.current, {
        display: "block",
        ease: "power2.in",
        duration: 0,
      })
      //fade out real input
      .to(
        realInput.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        },
        ""
      )
      //show animated input wrapper
      .to(animatedInputWrapper.current, {
        borderColor: "rgba(75, 85, 99, 0.2)",
        duration: 0.5,
        ease: "power2.in",
      })
      //Fade in animated input
      .to(
        animatedInput.current,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.in",
        },
        ""
      )
      //remove real input from the DOM
      .to(realInput.current, {
        display: "none",
        ease: "power2.out",
        duration: 0,
      });
  };

  // Function that runs 1 seconds after email changes. It makes the email valid in 10seconds
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    //if email is not valid, remove loader instantly
    if (!isValid) {
      setIsEmailValid(false);
      setIsLoaderShown(false);
      setIsInputChangeDisabled(false);
    } else {
      const timeoutId = setTimeout(() => {
        setIsEmailValid(isValid);
        setIsLoaderShown(true);
        setIsInputChangeDisabled(true);
        startAnimation();
        return () => clearTimeout(timeoutId);
      }, 1000);
    }
  }, [email]);

  const stopAnimation = () => {};

  return (
    <div className="flex h-full w-full items-center justify-center px-2">
      <div className="flex flex-col w-[660px] max-w-full">
        <div className="font-bold text-20px line-height-26px">
          <span className="text-primary">Step 3</span> /9
        </div>
        <div className="font-bold text-32px line-height-48px">
          What is your email?
        </div>
        <div className="text-16px line-height-24px text-text-light-2 mb-4">
          This is where we send the note
        </div>

        {/* Input Container with cross-fade animation */}
        <div
          className="rounded-lg border border-text-light/0 overflow-hidden"
          ref={animatedInputWrapper}
        >
          <div className="relative h-12">
            {" "}
            {/* Fixed height to prevent layout shift */}
            {/* Regular Input */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 opacity-100`}
              ref={realInput}
            >
              <Input
                type="text"
                placeholder="Enter your email"
                rightIcon={isLoaderShown ? Loader : undefined}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isInputChangeDisabled}
              />
            </div>
            {/* Animated Input - only render when transitioning */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 hidden opacity-0`}
              ref={animatedInput}
            >
              <AnimatedInput
                label="Email"
                value={email}
                triggerAimationOnAnimatedInput={triggerAimationOnAnimatedInput}
                setAntimatedInputAnimationComplete={
                  setAntimatedInputAnimationComplete
                }
              />
            </div>
          </div>
          <div ref={otpDiv} className="overflow-hidden h-0">
            <div className="p-4 h-full">
              <div className="font-bold text-16px line-height-24px">
                Enter verification code
              </div>
              <div className="text-14px line-height-20px text-text-light-2 mb-4">
                Enter the code sent to {email} to use your saved
                information.
              </div>
              <OTPInput
                className="mb-4"
                value={otpValue}
                onChange={(value) => setOtpValue(value)}
              />
              <span className="text-14px line-height-20px text-text-light-2">
                Didn’t receive a code?
              </span>
              <span className="text-14px line-height-20px text-primary">
                {" "}
                Send again
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between mt-2">
          <Button variant="ghost">
            <Image
              src={ChevronLeftIcon}
              alt="Back"
              className="mr-2 w-2 h-2 inline"
            />
            Back
          </Button>
          <Button disabled={otpValue.length !== 5}>Next</Button>
        </div>
      </div>
    </div>
  );
}
