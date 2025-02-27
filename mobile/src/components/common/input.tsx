import { forwardRef } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { twMerge } from "tailwind-merge";

interface InputProps extends TextInputProps {
  placeholder: string;
  required?: boolean;
  label?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ placeholder, label, className, required, ...props }, ref) => {
    return (
      <View className="gap-x-4 flex-col flex-1">
        {label && (
          <Text className="text-base font-semibold">
            {label}
            {required && " *"}
          </Text>
        )}
        <TextInput
          ref={ref}
          className={twMerge(
            "font-sans border-b-2 border-b-gray-300 p-2.5",
            className
          )}
          placeholder={placeholder}
          placeholderTextColor="#000"
          {...props}
        />
      </View>
    );
  }
);

Input.displayName = "Input";
