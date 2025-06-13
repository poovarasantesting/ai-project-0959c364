import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function Clock() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  
  return (
    <Card className="w-fit mx-auto shadow-lg">
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="text-5xl font-mono font-semibold tracking-widest">
            {hours}:{minutes}:<span className="text-muted-foreground">{seconds}</span>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {time.toLocaleDateString(undefined, { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}