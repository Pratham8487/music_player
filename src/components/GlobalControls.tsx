import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { ImPrevious } from "react-icons/im";
import { BiSkipNextCircle } from "react-icons/bi";
import { useVideoControl } from "../context/VideoControlContext";

const GlobalControls = () => {
  const { isPlaying, play, pause, next, previous, hasNext, hasPrevious } =
    useVideoControl();

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-zinc-800 text-white px-4 py-2 rounded-xl shadow-md flex gap-4 items-center">
      <button
        onClick={previous}
        disabled={!hasPrevious}
        className="text-xl disabled:opacity-30"
      >
        <ImPrevious />
      </button>
      <button onClick={isPlaying ? pause : play} className="text-2xl">
        {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
      </button>
      <button
        onClick={next}
        disabled={!hasNext}
        className="text-xl disabled:opacity-30"
      >
        <BiSkipNextCircle />
      </button>
    </div>
  );
};

export default GlobalControls;
