import  { useEffect, useState } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="mb-12 flex items-center">
        <h1 className="text-4xl font-bold">
          <span className="text-red-500">U</span>
          <span className="text-white">-Tube</span>
        </h1>
      </div>

      <div className="flex items-end mb-10 h-20">
        {[...Array(12)].map((_, i) => {
          const barHeight = 20 + Math.sin(progress / 10 + i / 2) * 40;
          const delay = i * 0.05;

          return (
            <div
              key={i}
              className="w-3 mx-1 bg-red-500 rounded-t-sm"
              style={{
                height: `${barHeight}px`,
                animation: `equalizer 1s ${delay}s ease-in-out infinite alternate`,
                opacity: progress > 20 ? 1 : progress / 20,
              }}
            />
          );
        })}
      </div>

      <div className="w-64 h-2 bg-gray-800 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-red-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-gray-400 text-sm">
        {progress < 100 ? "Loading ..." : "Ready to play!"}
      </p>

      <div className="mt-12 relative">
        <div
          className="w-32 h-32 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 border-4 border-gray-700 flex items-center justify-center"
          style={{
            animation: "spin 3s linear infinite",
            opacity: progress > 40 ? 1 : progress / 40,
          }}
        >
          <div className="w-8 h-8 rounded-full bg-gray-900 border-2 border-gray-700" />
        </div>

        <div
          className="absolute top-10 -right-6 w-16 h-2 bg-gray-600 rounded-r-full origin-left"
          style={{
            transform: `rotate(${Math.min(45, progress / 2 - 5)}deg)`,
            opacity: progress > 60 ? 1 : progress / 60,
          }}
        >
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-4 bg-red-500" />
        </div>
      </div>

      <style>{`
        @keyframes equalizer {
          0% {
            height: 10px;
          }
          100% {
            height: 60px;
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
