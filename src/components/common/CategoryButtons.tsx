import React from "react";

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
  animate = false,
}) => {
  return (
    <div
      className={`flex flex-wrap gap-3 p-2 justify-center md:justify-start ${
        animate ? "animate-pulse" : ""
      }`}
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
    </div>
  );
};

export default CategoryButtons;
