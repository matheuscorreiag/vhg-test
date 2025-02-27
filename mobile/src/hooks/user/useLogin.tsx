import { User } from "@/src/data/user";
import { fetcher } from "@/src/utils/fetcher";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

interface UseLoginProps {
  email: string;
  password: string;
}

function login({ email, password }: UseLoginProps) {
  return fetcher<User>("/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function useLogin() {
  const router = useRouter();
  const { mutateAsync: loginUser } = useMutation({
    mutationKey: ["login"],
    mutationFn: (body: UseLoginProps) => login(body),
    onSuccess: async ({ token }) => {
      await AsyncStorage.setItem("token", token);
      router.push("/(tabs)");
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Erro ao logar" });
    },
  });

  return { loginUser };
}
