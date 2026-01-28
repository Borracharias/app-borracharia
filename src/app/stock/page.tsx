"use client";

import { useToast, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { DataTable } from "../../components/DataTable/inde";

export default function StockPage() {
  const toast = useToast();

  const {
    data: pneus,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pneus"],
    queryFn: async () => {
      const response = await api.pneus.pneusControllerFindAll();
      return response.data;
    },
  });

  if (error) {
    toast({
      title: "Erro ao carregar Stock",
      description: "Não foi possível carregar a lista de pneus.",
      status: "error",
    });
  }

  // Ordenar pneus por aro e depois por numeração
  const sortedPneus = pneus?.sort((a, b) => {
    if (a.rim !== b.rim) {
      return a.rim - b.rim;
    }
    return a.size.localeCompare(b.size);
  });

  return (
    <DataTable
      title="ESTOQUE"
      data={sortedPneus || []}
      isLoading={isLoading}
      emptyMessage="Nenhum pneu encontrado no estoque."
      showTableHeader={false}
      filterComponent={
        <Text fontSize="lg" fontWeight="bold">
          PNEUS
        </Text>
      }
      columns={[
        {
          header: "Aro",
          accessor: (pneu) => `R${pneu.rim}`,
        },
        {
          header: "Numeração",
          accessor: (pneu) => pneu.size,
        },
        {
          header: "Qtd",
          accessor: (pneu) => pneu.quantity,
          isNumeric: true,
        },
      ]}
    />
  );
}
