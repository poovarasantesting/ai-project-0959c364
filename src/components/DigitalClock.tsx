import { useEffect, useState } from "react";

export function DigitalClock() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="text-6xl font-bold font-mono bg-black text-white p-6 rounded-xl shadow-lg">
        <span>{hours}</span>
        <span className="animate-pulse">:</span>
        <span>{minutes}</span>
        <span className="animate-pulse">:</span>
        <span>{seconds}</span>
      </div>
      <p className="mt-4 text-gray-500">Current Time</p>
    </div>
  );
}