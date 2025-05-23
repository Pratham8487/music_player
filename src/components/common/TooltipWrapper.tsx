import React, { useState } from "react";

type TooltipWrapperProps = {
  children: React.ReactNode;
  tooltipText: string | React.ReactNode;
  position?: "top" | "bottom"; 
  onClick?: () => void;
};

const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  children,
  tooltipText,
  position = "bottom",
  onClick,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative flex justify-center items-center"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={onClick}
    >
      <div className="flex items-center border border-gray-700 rounded-xl p-3 hover:scale-110 transition-all duration-300 hover:rounded-2xl cursor-pointer">
        {children}
      </div>

      {showTooltip && (
        <div
          className={`absolute ${
            position === "top" ? "bottom-full mb-2" : "top-full mt-2"
          } left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black text-white text-sm font-mono rounded-lg shadow-lg z-10`}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default TooltipWrapper;
