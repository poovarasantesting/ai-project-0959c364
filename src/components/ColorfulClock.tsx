import { useState, useEffect } from 'react';

export function ColorfulClock() {
  const [time, setTime] = useState(new Date());
  const [hue, setHue] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      // Increment hue for color cycling (0-360)
      setHue((prevHue) => (prevHue + 1) % 360);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  
  // Generate different colors for each digit
  const baseHue = hue;
  const hourColor = `hsl(${baseHue}, 80%, 60%)`;
  const minuteColor = `hsl(${(baseHue + 120) % 360}, 80%, 60%)`;
  const secondColor = `hsl(${(baseHue + 240) % 360}, 80%, 60%)`;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-6 rounded-xl bg-slate-900 shadow-xl">
      <h2 className="text-white text-2xl mb-4 font-light">Colorful Digital Clock</h2>
      <div className="flex items-center justify-center text-7xl font-bold font-mono">
        <span style={{ color: hourColor }} className="transition-colors duration-500">{hours}</span>
        <span className="text-white mx-2 animate-pulse">:</span>
        <span style={{ color: minuteColor }} className="transition-colors duration-500">{minutes}</span>
        <span className="text-white mx-2 animate-pulse">:</span>
        <span style={{ color: secondColor }} className="transition-colors duration-500">{seconds}</span>
      </div>
      <div className="mt-6 text-gray-400">
        {time.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
}