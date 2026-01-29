"use client";

import { useState } from "react";
import { useToast, Text, Input } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { DataTable } from "../../components/DataTable/index";

export default function StockPage() {
  const [searchSize, setSearchSize] = useState("");
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

  // Filtrar e ordenar pneus
  const filteredPneus = pneus
    ?.filter((pneu) =>
      pneu.size.toLowerCase().includes(searchSize.toLowerCase()),
    )
    .sort((a, b) => {
      if (a.rim !== b.rim) {
        return a.rim - b.rim;
      }
      return a.size.localeCompare(b.size);
    });

  return (
    <DataTable
      title="ESTOQUE"
      data={filteredPneus || []}
      isLoading={isLoading}
      emptyMessage="Nenhum pneu encontrado no estoque."
      showTableHeader={true}
      filterComponent={
        <Text fontSize="lg" fontWeight="bold">
          PNEUS
        </Text>
      }
      headerRight={
        <Input
          placeholder="Numeração"
          value={searchSize}
          onChange={(e) => setSearchSize(e.target.value)}
          variant="filled"
          bg="whiteAlpha.200"
          _hover={{ bg: "whiteAlpha.300" }}
          _focus={{ bg: "whiteAlpha.300" }}
          _placeholder={{ color: "whiteAlpha.600" }}
          color="white"
          width="150px"
          size="sm"
          borderRadius="md"
        />
      }
      columns={[
        {
          header: "Tipo",
          accessor: (pneu) =>
            pneu.type
              ? pneu.type.charAt(0).toUpperCase() + pneu.type.slice(1)
              : "-",
        },
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
