import React from "react";
import Tooltip from "./TooltipWrapper";
import { RiErrorWarningLine } from "react-icons/ri";

type Category = {
  label: string;
  query: string;
};

type CategoryButtonsProps = {
  categories: Category[];
  onCategoryClick: (query: string) => void;
  animate?: boolean;
};

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  categories,
  onCategoryClick,
}) => {
  return (
    <div
      className={`flex flex-wrap gap-3 p-2 justify-center md:justify-start
  `}
    >
      {categories.map((category, index) => (
        <div
          key={index}
          className="border px-4 py-2 rounded-xl bg-white font-bold text-gray-600 cursor-pointer text-sm sm:text-base"
          onClick={() => onCategoryClick(category.query)}
        >
          <span>{category.label}</span>
        </div>
      ))}
      <Tooltip
        children={<RiErrorWarningLine className="w-5 h-5" />}
        tooltipText={
          <p className="whitespace-nowrap text-[0.65rem] md:text-xs animate-bounce">
            Showing the Best Results !!
          </p>
        }
      />
    </div>
  );
};

export default CategoryButtons;
