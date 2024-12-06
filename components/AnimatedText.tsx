""
<label className="text-[30px] font-bold">Make</label>
            <div className="w-32 mx-2 block font-semibold">
              <div className="text-green-600">outstanding</div>
              <div className="text-rose-600">dynamic</div>
              <div className="text-sky-700">powerful</div>
              <div className="text-amber-500">friendly</div>
            </div>
            <label className="text-[30px] font-bold">reports.</label>
          </div>
import React, { useEffect, useState } from "react";

const AnimatedText = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = ["Make", "outstanding", "reports", "dynamic", "powerful", "friendly"];

  // Change the active word every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Cleanup interval
  }, [words.length]);

  return (
    <div className="relative flex items-center justify-center text-4xl font-bold">
      {words.map((word, index) => {
        const isActive = index === currentWordIndex;

        return (
          <div
            key={index}
            className={`transition-all duration-1000 ease-in-out absolute 
            ${isActive ? "opacity-100 transform" : "opacity-0"}
            ${isActive && index === 1 ? "translate-y-[-20px]" : ""}
            ${isActive && index === 3 ? "translate-y-[20px]" : ""}
            ${isActive && index === 4 ? "translate-x-[-20px]" : ""}
            ${isActive && index === 5 ? "translate-x-[20px]" : ""}
            `}
          >
            {word}
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedText;
