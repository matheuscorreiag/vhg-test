import { Button } from "@/src/components/common/button";
import { Input } from "@/src/components/common/input";
import { Label } from "@/src/components/common/label";
import { PageContainer } from "@/src/components/common/page-container";
import { PageHeader } from "@/src/components/common/page-header";
import { useLogin } from "@/src/hooks/user/useLogin";
import { useForm } from "react-hook-form";
import { View } from "react-native";

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

      <Label>
        Selecione um nome de usuário e uma senha na lista abaixo ou clique no
        nome de usuário para preencher automaticamente o nome de usuário e a
        senha.
      </Label>

      <View className="flex-1 mt-12">
        <View className="flex-1 flex-col gap-y-3">
          <Input
            name="email"
            placeholder="E-mail"
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
            secure
            Entry
            required
          />
        </View>

        <Button
          className="mt-8"
          title="Entrar"
          onPress={handleSubmit(onSubmit)}
        />

        <View className="rounded-lg bg-gray-200 mt-12 p-4">
          <Label className="text-bold">Nomes de usuários aceitos</Label>
          <Label className="text-sm">example@example.com</Label>

          <Label className="text-bold mt-6">
            Senha para todos os usuários listados acima
          </Label>
          <Label className="text-sm ">123456</Label>
        </View>
      </View>
    </PageContainer>
  );
}
