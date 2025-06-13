import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalogClock } from "@/components/AnalogClock";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Analog Clock</CardTitle>
          <CardDescription className="text-center">A beautiful analog clock component</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <AnalogClock size={250} />
        </CardContent>
      </Card>
    </main>
  );
}