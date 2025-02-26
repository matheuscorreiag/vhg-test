import { Button } from "@/src/components/common/button";
import { Input } from "@/src/components/common/input";
import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { useLogin } from "@/src/hooks/user/useLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Controller, Form, useForm } from "react-hook-form";
import { Text, View } from "react-native";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onSubmit",
  });

  const { loginUser } = useLogin();

  async function onSubmit(data: LoginForm) {
    console.log(data);
    await loginUser(data);
  }
  return (
    <PageContainer>
      <PageHeader title="Login" className="flex-col" />

      <Text className="text-base font-sans">
        Selecione um nome de usuário e uma senha na lista abaixo ou clique no
        nome de usuário para preencher automaticamente o nome de usuário e a
        senha.
      </Text>

      <View className="flex-1 mt-12">
        <View className="gap-y-6">
          <Controller
            render={({ field: { onChange } }) => (
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={onChange}
                placeholder="Email"
              />
            )}
            name="email"
            control={control}
          />
          <Controller
            render={({ field: { onChange } }) => (
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={onChange}
                placeholder="Senha"
              />
            )}
            name="password"
            control={control}
          />
        </View>

        <Button
          className="mt-8"
          title="Entrar"
          onPress={handleSubmit(onSubmit)}
        />

        <View className="rounded-lg bg-gray-200 mt-12 p-4">
          <View>
            <Text className="text-bold text-base font-sans">
              Nomes de usuários aceitos
            </Text>
            <Text className="text-sm font-sans">example@example.com</Text>
          </View>

          <View className="mt-6">
            <Text className="text-bold text-base font-sans">
              Senha para todos os usuários
            </Text>
            <Text className="text-sm font-sans">123456</Text>
          </View>
        </View>
      </View>
    </PageContainer>
  );
}
