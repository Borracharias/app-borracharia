"use client";

import { Text, useDisclosure } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Pedido } from "@/lib/api-client";
import { formatCurrency } from "@/utils/utils";
import { OrdersModal } from "@/components/OrdersModal";
import { useFinance } from "@/hooks/useFinance";
import { DataTable } from "@/components/DataTable/inde";

export default function PageFinanceDay() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);

  const { data: pedidos, isLoading } = useQuery({
    queryKey: ["pedidos", "faturamento"],
    queryFn: () =>
      api.pedidos
        .pedidosControllerFindAll()
        .then((res) => res.data as Pedido[]),
  });

  const { faturamentoFormatado } = useFinance(pedidos, "dia");

  const pedidosDoDia = useMemo(() => {
    if (!pedidos) return [];

    const hoje = new Date();

    return pedidos.filter((pedido) => {
      const dataPedido = new Date(pedido.createdAt);
      return (
        dataPedido.getFullYear() === hoje.getFullYear() &&
        dataPedido.getMonth() === hoje.getMonth() &&
        dataPedido.getDate() === hoje.getDate()
      );
    });
  }, [pedidos]);

  const handleRowClick = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    onOpen();
  };

  return (
    <>
      <DataTable
        title="FATURAMENTO"
        data={pedidosDoDia}
        isLoading={isLoading}
        emptyMessage="Nenhum pedido encontrado para hoje."
        onRowClick={handleRowClick}
        showTableHeader={false}
        headerRight={
          <Text fontWeight="bold">
            {isLoading ? "R$ --" : faturamentoFormatado}
          </Text>
        }
        filterComponent={<Text fontSize="sm">Pedidos do dia</Text>}
        columns={[
          {
            header: "Data",
            accessor: (pedido) =>
              new Date(pedido.createdAt).toLocaleDateString("pt-BR"),
          },
          {
            header: "Cliente",
            accessor: (pedido) => pedido.cliente?.name || "-",
          },
          {
            header: "Valor",
            accessor: (pedido) => formatCurrency(pedido.total || 0),
            isNumeric: true,
          },
        ]}
      />

      <OrdersModal isOpen={isOpen} onClose={onClose} pedido={selectedPedido} />
    </>
  );
}
