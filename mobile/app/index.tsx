import { Button } from "@/src/components/common/button";
import { Input } from "@/src/components/common/input";
import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { useLogin } from "@/src/hooks/user/useLogin";
import { useForm } from "react-hook-form";
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
        <View className="flex-1 flex-col">
          <Input
            name="email"
            placeholder="Email"
            control={control}
            error={!!errors.email}
            autoCapitalize="none"
            autoCorrect={false}
            required
          />

          <Input
            name="password"
            placeholder="Password"
            control={control}
            error={!!errors.password}
            required
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
              Senha para todos os usuários listados acima
            </Text>
            <Text className="text-sm font-sans">123456</Text>
          </View>
        </View>
      </View>
    </PageContainer>
  );
}
