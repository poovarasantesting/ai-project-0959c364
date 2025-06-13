import { AuthForm } from "./components/auth/AuthForm";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <main>
      <Toaster />
      <AuthForm />
    </main>
  );
}

export default App;