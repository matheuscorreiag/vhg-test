import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export function useLogout() {
  const { mutateAsync: logout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => AsyncStorage.removeItem("token"),
    onError: (error) => {
      Toast.show({ type: "error", text1: "Erro ao deslogar" });
    },
  });

  return { logout };
}
