import React, { useEffect, useState } from 'react';

const AnimatedText = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = ["Make", "outstanding", "reports", "dynamic", "powerful", "friendly"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(prevIndex => (prevIndex + 1) % words.length);
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [words.length]);

  return (
    <div className="relative flex items-center justify-center space-x-4 text-4xl font-bold">
      {words.map((word, index) => {
        const isActive = index === currentWordIndex;
        return (
          <div
            key={index}
            className={`transition-transform duration-1000 ease-in-out absolute 
              ${isActive ? "opacity-100" : "opacity-0"} 
              ${isActive && index === 1 ? "animate-up" : ""}
              ${isActive && index === 3 ? "animate-down" : ""}
              ${isActive && index === 4 ? "animate-left" : ""}
              ${isActive && index === 5 ? "animate-right" : ""}
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
