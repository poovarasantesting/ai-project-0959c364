import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnalogClockProps {
  className?: string;
  size?: number;
  hourHandColor?: string;
  minuteHandColor?: string;
  secondHandColor?: string;
  faceColor?: string;
  borderColor?: string;
  numberColor?: string;
  showNumbers?: boolean;
}

export function AnalogClock({
  className,
  size = 200,
  hourHandColor = "#555",
  minuteHandColor = "#333",
  secondHandColor = "#f00",
  faceColor = "white",
  borderColor = "#333",
  numberColor = "#333",
  showNumbers = true,
}: AnalogClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Calculate clock hand angles
  const secondAngle = (time.getSeconds() / 60) * 360;
  const minuteAngle = (time.getMinutes() / 60) * 360 + (time.getSeconds() / 60) * 6;
  const hourAngle = (time.getHours() % 12 / 12) * 360 + (time.getMinutes() / 60) * 30;

  // Clock numbers
  const clockNumbers = showNumbers ? Array.from({ length: 12 }, (_, i) => {
    const angle = ((i + 1) / 12) * 360;
    const radian = ((angle - 90) * Math.PI) / 180;
    const radius = size / 2 - 25;
    const x = size / 2 + radius * Math.cos(radian);
    const y = size / 2 + radius * Math.sin(radian);

    return (
      <text
        key={i}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={numberColor}
        fontSize={size / 15}
        fontWeight="bold"
      >
        {i + 1}
      </text>
    );
  }) : null;

  // Clock ticks
  const clockTicks = Array.from({ length: 60 }, (_, i) => {
    const angle = (i / 60) * 360;
    const radian = ((angle - 90) * Math.PI) / 180;
    const isMajorTick = i % 5 === 0;
    const outerRadius = size / 2 - (isMajorTick ? 10 : 5);
    const innerRadius = size / 2 - (isMajorTick ? 20 : 10);
    
    const x1 = size / 2 + outerRadius * Math.cos(radian);
    const y1 = size / 2 + outerRadius * Math.sin(radian);
    const x2 = size / 2 + innerRadius * Math.cos(radian);
    const y2 = size / 2 + innerRadius * Math.sin(radian);

    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={borderColor}
        strokeWidth={isMajorTick ? 2 : 1}
      />
    );
  });

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Clock face */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 2}
          fill={faceColor}
          stroke={borderColor}
          strokeWidth="4"
        />
        
        {/* Clock ticks */}
        {clockTicks}
        
        {/* Clock numbers */}
        {clockNumbers}
        
        {/* Center point */}
        <circle 
          cx={size / 2} 
          cy={size / 2} 
          r={size / 30} 
          fill={borderColor} 
        />
        
        {/* Hour hand */}
        <line
          x1={size / 2}
          y1={size / 2}
          x2={size / 2 + (size / 3 - 20) * Math.cos((hourAngle - 90) * Math.PI / 180)}
          y2={size / 2 + (size / 3 - 20) * Math.sin((hourAngle - 90) * Math.PI / 180)}
          stroke={hourHandColor}
          strokeWidth={size / 25}
          strokeLinecap="round"
        />
        
        {/* Minute hand */}
        <line
          x1={size / 2}
          y1={size / 2}
          x2={size / 2 + (size / 2 - 20) * Math.cos((minuteAngle - 90) * Math.PI / 180)}
          y2={size / 2 + (size / 2 - 20) * Math.sin((minuteAngle - 90) * Math.PI / 180)}
          stroke={minuteHandColor}
          strokeWidth={size / 40}
          strokeLinecap="round"
        />
        
        {/* Second hand */}
        <line
          x1={size / 2}
          y1={size / 2}
          x2={size / 2 + (size / 2 - 15) * Math.cos((secondAngle - 90) * Math.PI / 180)}
          y2={size / 2 + (size / 2 - 15) * Math.sin((secondAngle - 90) * Math.PI / 180)}
          stroke={secondHandColor}
          strokeWidth={size / 80}
          strokeLinecap="round"
        />
        
        {/* Center cap over hands */}
        <circle 
          cx={size / 2} 
          cy={size / 2} 
          r={size / 50} 
          fill={secondHandColor} 
        />
      </svg>
    </div>
  );
}