import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import { RainAnimation } from "@/components/RainAnimation";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Creator Credit */}
      <div className="absolute top-4 left-4 text-sm text-muted-foreground z-50">
        Created and Coded by Noah Perkins
      </div>

      <RainAnimation intensity={0.3} />
      <Home />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;