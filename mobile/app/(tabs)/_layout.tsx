import React from "react";
import { Tabs } from "expo-router";
import { Header } from "@/src/components/header";
import { CartIcon } from "@/components/icons/cart";
import { Text } from "react-native";
import { HomeIcon } from "@/components/icons/home";
import { MenuIcon } from "@/components/icons/menu";

type TabBarIconProps = {
  label: string;
};

function TabBarLabel({ label }: TabBarIconProps) {
  return <Text className="text-sm">{label}</Text>;
}
export default function TabLayout() {
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
          tabBarIcon: ({ focused }) => <CartIcon isFocused={focused} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          tabBarLabel: () => <TabBarLabel label="Menu" />,
          tabBarIcon: ({ focused }) => <MenuIcon isFocused={focused} />,
        }}
      />
    </Tabs>
  );
}
