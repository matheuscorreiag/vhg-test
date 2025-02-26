import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => AsyncStorage.getItem("token"),
  });

  return { token: data };
}
