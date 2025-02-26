import { queryClient } from "@/src/libs/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toast />
    </QueryClientProvider>
  );
}
