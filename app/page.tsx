"use client";

import { useState, useEffect } from "react";
import Input from "@/app/components/input";
import Loader from "@/app/components/loader";
import Button from "./components/button";
import Image from "next/image";
import ChevronLeftIcon from "@/public/icons/chevronLeft.svg";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isLoaderShown, setIsLoaderShown] = useState(false);
  const [isInputChangeDisabled, setIsInputChangeDisabled] = useState(false);
  const []


  const startAnimation = () => {
    setTimeout(() => {
      setIsLoaderShown(false);
    }, 1000);
  }

  // Function that runs 1 seconds after email changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(email);
      if(isValid) {
          setIsEmailValid(isValid);
          setIsLoaderShown(true);
          setIsInputChangeDisabled(true);
          startAnimation();
      } else {
        setIsEmailValid(false);
        setIsLoaderShown(false);
        setIsInputChangeDisabled(false);
      }
    }, 1000);

    // Cleanup function to clear timeout if email changes again
    return () => clearTimeout(timeoutId);
  }, [email]);

  useEffect(() => {
    if(isEmailValid) {
      setIsLoaderShown(true);
    } else {
      setIsLoaderShown(false);
    }
  }, [isEmailValid]);


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
        <Input
          type="text"
          placeholder="Enter your email"
          rightIcon={isLoaderShown ? Loader : undefined}
          className="mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isInputChangeDisabled}
        />
        <div className="flex flex-row justify-between mt-2">
          <Button variant="ghost">
            <Image src={ChevronLeftIcon} alt="Back" className="mr-2 w-2 h-2 inline" />
            Back
          </Button>
          <Button disabled={!isEmailValid}>Next</Button>
        </div>
      </div>
    </div>
  );
}
