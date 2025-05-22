import { IoHomeOutline } from "react-icons/io5";
// import { SlPlaylist } from "react-icons/sl";
import { MdQueueMusic } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { setQuery } = useSearch();
  const [input, setInput] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const handleToolTip = () => setShowTooltip(true);
  const hideToolTip = () => setShowTooltip(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(input);
    }, 2500);

    return () => clearTimeout(timer);
  }, [input, setQuery]);

  // console.log("query:- ", query);
  return (
    <nav className="shadow-sm sticky top-0 z-50 border-b border-gray-800 bg-black">
      <div className="px-5 py-3 flex justify-between items-center">
        <Link to={`/`}>
          <div className="flex items-center gap-3 border border-gray-700 rounded-xl hover:rounded-2xl p-3 space-x-4 hover:scale-105 cursor-pointer transition-all duration-300">
            <h1 className="text-lg font-bold tracking-wider hidden sm:block text-red-200 ">
              <span className="text-red-700 ">U</span>-Tube{" "}
              <span className="text-zinc-600 font-semibold">Music</span>
            </h1>
            <IoHomeOutline className="w-8 h-8 text-white" />
          </div>
        </Link>

        <div className="relative flex-1 mx-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IoSearchOutline className="w-5 h-5 text-red-500 shadow-red-400" />
          </div>
          <div className="">
            <input
              type="text"
              className="bg-zinc-900 border border-zinc-700 text-white text-sm rounded-full block w-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
              placeholder="What do you want to play?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>

        <Link to={`/queue`}>
          <div
            className="relative"
            onMouseEnter={handleToolTip}
            onMouseLeave={hideToolTip}
          >
            <div className="flex items-center space-x-4 gap-3 border border-gray-700 rounded-xl p-3 hover:scale-110 transition-all duration-300 hover:rounded-2xl cursor-pointer">
              <MdQueueMusic className="w-7 h-7 text-white" />
            </div>

            {showTooltip && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-black text-white text-md font-mono rounded-lg shadow-lg z-10">
                Queue
              </div>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
