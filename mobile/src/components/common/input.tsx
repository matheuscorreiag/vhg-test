import { forwardRef } from "react";
import { TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  placeholder: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ placeholder, ...props }, ref) => {
    return (
      <View className="gap-x-4 flex-col">
        <TextInput
          ref={ref}
          className="font-sans border-b-2 border-b-gray-300 p-2.5"
          placeholder={placeholder}
          placeholderTextColor="#000"
          {...props}
        />
      </View>
    );
  }
);

Input.displayName = "Input";
