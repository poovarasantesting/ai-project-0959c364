import { ColorfulClock } from "./components/ColorfulClock";

export default function App() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 p-4">
      <ColorfulClock />
    </main>
  );
}