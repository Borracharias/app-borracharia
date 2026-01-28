import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

import { api } from "@/lib/api";
import type { CreateServicoDto } from "@/lib/api-client";
import { ServicoForm } from "../schema";

export function useCreateService() {
  const router = useRouter();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: (data: ServicoForm) => {
      const payload: CreateServicoDto = {
        name: data.name,
        description: data.description,
      };

      return api.servicos.servicosControllerCreate(payload);
    },
    onSuccess: () => {
      toast({ title: "Serviço cadastrado", status: "success" });
      router.push("/");
    },
    onError: (err: Error) => {
      toast({
        title: "Erro ao cadastrar",
        description: err.message,
        status: "error",
      });
    },
  });

  return {
    createServico: mutation.mutate,
    isCreating: mutation.isPending,
  };
}
