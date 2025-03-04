import { Button } from "@/src/components/common/button";
import { Label } from "@/src/components/common/label";
import { PageContainer } from "@/src/components/common/page-container";
import { menus } from "@/src/constants/menu";
import { useLogout } from "@/src/hooks/user/useLogout";
import { Href, useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";

export default function MenuModal() {
  const router = useRouter();
  const { logout } = useLogout();

  function onPressMenuOption(route: Href) {
    router.dismissAll();

    if (route === "/+not-found") {
      router.push("/");
      return logout();
    }

    router.push(route);
  }

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <PageContainer>
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          {menus.map((item, index) => (
            <View
              key={index}
              className={twMerge(
                "my-3",
                item.route && "border-b-2 border-gray-200"
              )}
            >
              {/* Foi feito duas condicionais separadas para melhor leitura  */}
              {item.route && (
                <Button
                  title={item.title}
                  color="menu"
                  textAlign="left"
                  textSize="large"
                  textWeight="normal"
                  padding="topOnly"
                  className="rounded-none"
                  onPress={() => onPressMenuOption(item.route as Href)}
                />
              )}
              {!item.route && <Label className="text-sm">{item.title}</Label>}
            </View>
          ))}
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
}
