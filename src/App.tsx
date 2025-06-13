import { ThemeProvider } from "@/components/theme-provider";
import { Clock } from "./components/Clock";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <main className="container mx-auto p-4 flex min-h-screen items-center justify-center">
        <Clock />
      </main>
    </ThemeProvider>
  );
}

export default App;