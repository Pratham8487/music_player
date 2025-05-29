import { IoHomeOutline } from "react-icons/io5";
import { MdQueueMusic } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import { useEffect, useState } from "react";
import Tooltip from "./common/TooltipWrapper";
import { MdCancel } from "react-icons/md";

const Navbar = () => {
  const { setQuery } = useSearch();
  const [input, setInput] = useState("");
  const [inputLength, setInputLength] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(input);
    }, 2500);

    return () => clearTimeout(timer);
  }, [input, setQuery]);

  useEffect(() => {
    setInputLength(input.length > 0);
  }, [input]);

  // useEffect(() => {
  //   const gotoHome = setTimeout(() => {
  //     navigate(`/`);
  //   }, 2500);
  //   return () => clearTimeout(gotoHome);
  // }, [input]);

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
              className="bg-zinc-900 border border-zinc-700 text-white text-sm rounded-full block w-full pl-10 pr-9 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-500 text-pretty "
              placeholder="What do you want to play?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus={true}
            />
          </div>
          {inputLength && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
              <MdCancel
                className="w-5 h-5 text-gray-400 hover:text-white"
                onClick={() => setInput("")}
              />
            </div>
          )}
        </div>

        <Link to={`/yourqueue`}>
          <Tooltip
            children={<MdQueueMusic className="w-7 h-7 text-white" />}
            tooltipText="Queue"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
