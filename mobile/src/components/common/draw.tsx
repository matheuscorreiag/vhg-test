import React, { useRef } from "react";
import { View, Button } from "react-native";

const Desenho = () => {
  const canvasRef = useRef<any>(null);

  const limpar = () => {
    canvasRef.current.clear();
  };

  const salvar = () => {
    canvasRef.current.getBase64(
      "png",
      false,
      false,
      false,
      false,
      (base64: string) => {
        console.log("Imagem salva em Base64:", base64);
      }
    );
  };

  return <View className="bg-red-600"></View>;
};

export default Desenho;
