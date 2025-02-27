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
    route: "/",
  },
  {
    title: "Checkout Flow",
    route: "/",
  },
  {
    title: "Login Flow",
    route: "/",
  },
  {
    title: "QR Code Scanner",
    route: "/qrcode",
  },
  {
    title: "Desenho",
    route: "/",
  },
  { title: "Actions" },
  {
    title: "Log Out",
    route: "/+not-found", // Hack para facilitar o logout
  },
  {
    title: "Reset App State",
    route: "/",
  },
  { title: "About" },
  {
    title: "API Calls",
    route: "/",
  },
  {
    title: "Report A Bug",
    route: "/",
  },
  {
    title: "About",
    route: "/",
  },
];
