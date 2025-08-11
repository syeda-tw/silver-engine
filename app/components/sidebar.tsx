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
        ${isCollapsed ? "w-0 lg:w-16" : "w-[354px]"}
        min-h-screen overflow-hidden
      `}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`
          fixed top-6 bg-primary text-background rounded-lg w-8 h-8 flex items-center justify-center hover:opacity-80 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20 lg:hidden z-50
          ${isCollapsed ? "left-4" : "right-4"}
        `}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <span className="text-sm font-bold">
          {isCollapsed ? "→" : "←"}
        </span>
      </button>

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
