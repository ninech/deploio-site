import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { config } from "config";

import { Home } from "./pages/home";

const queryClient = new QueryClient();

const App = () => {
  const environment = config.VITE_APP_ENVIRONMENT;

  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      {environment === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default App;
