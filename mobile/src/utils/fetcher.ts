import AsyncStorage from "@react-native-async-storage/async-storage";

interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}
export async function fetcher<T>(endpoint: string, options?: RequestInit) {
  const token = await AsyncStorage.getItem("token");

  const request: Response<T> = await fetch(
    process.env.EXPO_PUBLIC_API_URL + endpoint,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  ).then((res) => res.json());

  if (!request.success) {
    throw new Error(request.message);
  }

  return request.data;
}
