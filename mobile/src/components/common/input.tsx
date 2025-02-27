import { Label } from "@/src/components/common/label";
import { forwardRef } from "react";
import { Control, Controller } from "react-hook-form";
import { TextInput, TextInputProps, View } from "react-native";
import { twMerge } from "tailwind-merge";

interface InputProps<T> extends TextInputProps {
  placeholder: string;
  required?: boolean;
  label?: string;
  error?: boolean;
  name: string;
  control: T;
  type?: "text" | "date";
}

export const Input = forwardRef<TextInput, InputProps<Control<any>>>(
  (
    {
      placeholder,
      label,
      name,
      control,
      className,
      error,
      required,
      onChangeText,
      type = "text",
      ...props
    },
    ref
  ) => {
    return (
      <Controller
        control={control}
        name={name}
        rules={{ required }}
        render={({ field: { onChange } }) => (
          <View className="gap-x-4 flex-col flex-1">
            {label && (
              <Label className="  font-semibold">
                {label}
                {required && " *"}
              </Label>
            )}
            <TextInput
              ref={ref}
              className={twMerge(
                "border-b-2 border-b-gray-300 p-2.5 text-black",
                className,
                error && "border-red-400"
              )}
              placeholder={placeholder}
              placeholderTextColor="#000"
              onChangeText={onChange}
              {...props}
            />
          </View>
        )}
      />
    );
  }
);

Input.displayName = "Input";
