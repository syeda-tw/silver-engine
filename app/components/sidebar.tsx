"use client";

import { useState } from "react";
import Image from "next/image";
import CheckMarkIcon from "@/public/icons/checkMark.svg";
import Testimonials from "./testimonials";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`
        relative bg-background-alt transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-[354px]"}
        min-h-screen
      `}
    >
      {/* Toggle Button */}
      {/*<button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-primary/80 transition-colors md:hidden"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? '→' : '←'}
      </button>*/}

      {/* Sidebar Content */}
      <div className="p-2 h-full">
        {!isCollapsed && (
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="font-bold text-20px mb-8">OnlineMed</div>
              <div className="flex flex-row gap-2 items-center mb-4">
                <Image src={CheckMarkIcon} alt="Check Mark" />
                <span className="text-primary font-bold text-14px">
                  Money Back Guarantee
                </span>
              </div>
              <div className="text-32px font-bold mb-4 line-height-48px">
                Your <span className="text-primary">Work </span>Note is Minutes
                Away
              </div>
              <span className="text-16px line-height-24px">
                Note: Due to capacity we are currently only able to provide a
                limited number of notes per day. To see if you qualify please
                fill out the following short survey!
              </span>
            </div>

            <Testimonials />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
