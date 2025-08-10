'use client';

import { useState } from 'react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`
      relative bg-background-alt transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-16' : 'w-64'}
      min-h-screen
    `}>
      {/* Toggle Button */}
      {/*<button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-primary/80 transition-colors md:hidden"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? '→' : '←'}
      </button>*/}

      {/* Sidebar Content */}
      <div className="p-4">
        {!isCollapsed && (
          <div className="text-text">
            {/* Sidebar content will go here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;