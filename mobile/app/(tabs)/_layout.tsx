import React from "react";
import { Tabs, useRouter } from "expo-router";
import { Header } from "@/src/components/common/header";
import { CartIcon } from "@/src/components/icons/cart";
import { Text } from "react-native";
import { HomeIcon } from "@/src/components/icons/home";
import { MenuIcon } from "@/src/components/icons/menu";
import { Label } from "@/src/components/common/label";

type TabBarIconProps = {
  label: string;
};

function TabBarLabel({ label }: TabBarIconProps) {
  return <Label className="text-sm">{label}</Label>;
}
export default function TabLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Catálogo",
          tabBarLabel: () => <TabBarLabel label="Catálogo" />,
          tabBarIcon: ({ focused }) => <HomeIcon isFocused={focused} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: () => <TabBarLabel label="Carrinho" />,
          tabBarIcon: ({ focused }) => (
            <CartIcon showCount isFocused={focused} />
          ),
          headerShown: false,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("cart", { screen: "index" });
          },
        })}
      />
      <Tabs.Screen
        name="menu"
        options={{
          tabBarLabel: () => <TabBarLabel label="Menu" />,
          tabBarIcon: ({ focused }) => <MenuIcon isFocused={focused} />,
        }}
        listeners={({}) => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push("/menu-modal");
          },
        })}
      />
    </Tabs>
  );
}
