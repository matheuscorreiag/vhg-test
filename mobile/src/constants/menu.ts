import { Href } from "expo-router";

interface MenuItems {
  title: string;
  route?: Href;
}
export const menus: MenuItems[] = [
  {
    title: "Test Flows",
  },
  {
    title: "Adicionar ao fluxo do carrinho",
    route: "/(tabs)",
  },
  {
    title: "Checkout Flow",
    route: "/(tabs)",
  },
  {
    title: "Login Flow",
    route: "/(tabs)",
  },
  {
    title: "QR Code Scanner",
    route: "/qrcode",
  },
  {
    title: "Desenho",
    route: "/(tabs)",
  },
  { title: "Actions" },
  {
    title: "Log Out",
    route: "/+not-found", // Hack para facilitar o logout
  },
  {
    title: "Reset App State",
    route: "/(tabs)",
  },
  { title: "About" },
  {
    title: "API Calls",
    route: "/(tabs)",
  },
  {
    title: "Report A Bug",
    route: "/(tabs)",
  },
  {
    title: "About",
    route: "/about",
  },
];
