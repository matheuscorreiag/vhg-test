import React from "react";
import { Tabs } from "expo-router";
import { Header } from "@/src/components/header";
import { MenuIcon } from "@/components/icons/menu";
import { CartIcon } from "@/components/icons/cart";
import { HomeIcon } from "@/components/icons/home";
import { Text } from "react-native";
import { gradientColor } from "@/src/constants/colors";

type TabBarIconProps = {
  label: string;
};

function TabBarLabel({ label }: TabBarIconProps) {
  return <Text className="text-red-600">{label}</Text>;
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
          tabBarIcon: ({ focused }) => (
            <HomeIcon color={focused ? gradientColor.start : "#000"} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: () => <TabBarLabel label="Carrinho" />,
          tabBarIcon: ({ focused }) => (
            <CartIcon color={focused ? gradientColor.start : "#000"} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          tabBarLabel: () => <TabBarLabel label="Menu" />,
          tabBarIcon: ({ focused }) => (
            <MenuIcon color={focused ? gradientColor.start : "#000"} />
          ),
        }}
      />
    </Tabs>
  );
}
