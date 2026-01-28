import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

import { api } from "@/lib/api";
import type { CreatePneuDto } from "@/lib/api-client";
import { TireForm } from "../schema";

export function useCreateTires() {
  const router = useRouter();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: (data: TireForm) =>
      api.pneus.pneusControllerCreate(data as CreatePneuDto),
    onSuccess: () => {
      toast({ title: "Pneu cadastrado", status: "success" });
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
    createPneu: mutation.mutate,
    isCreating: mutation.isPending,
  };
}
