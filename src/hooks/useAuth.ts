import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth-store";

interface LoginCredentials {
  email: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const toast = useToast();
  const {
    isAuthenticated,
    user,
    setAuthenticated,
    logout: logoutStore,
  } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (data: LoginCredentials) =>
      api.auth.authControllerLogin(data, { format: "json" }),

    onSuccess: () => {
      setAuthenticated(true);

      toast({
        title: "Login realizado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push("/");
    },

    onError: (error: Error) => {
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Credenciais inválidas",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => api.auth.authControllerLogout(),

    onSettled: () => {
      logoutStore();
      router.push("/login");
    },
  });

  return {
    isAuthenticated,
    user,

    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,

    isLoginLoading: loginMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,

    loginError: loginMutation.error,
  };
}
