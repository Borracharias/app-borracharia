import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ExpenseForm } from "../schema";
import { useToast } from "@chakra-ui/react";

export function useExpenses() {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: expenses, isLoading } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await api.despesas.despesasControllerFindAll();
      return response.data;
    },
  });

  const { mutate: createExpense, isPending: isCreating } = useMutation({
    mutationFn: async (data: ExpenseForm) => {
      return api.despesas.despesasControllerCreate({
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      toast({
        title: "Despesa adicionada com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      console.error(error);
      toast({
        title: "Erro ao adicionar despesa",
        description: "Tente novamente mais tarde.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  return {
    expenses,
    isLoading,
    createExpense,
    isCreating,
  };
}
