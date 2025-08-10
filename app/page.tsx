import Input from "@/app/components/input";
import Loader from "@/app/components/loader";
import Button from "./components/button";
import Image from "next/image";
import ChevronLeftIcon from "@/public/icons/chevronLeft.svg";

export default function Home() {
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
          rightIcon={Loader}
          className="mb-4"
        />
        <div className="flex flex-row justify-between mt-2">
          <Button variant="ghost">
            <Image src={ChevronLeftIcon} alt="Back" className="mr-2 w-2 h-2 inline" />
            Back
          </Button>
          <Button disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}
