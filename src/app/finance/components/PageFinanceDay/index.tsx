"use client";

import { Text, useDisclosure } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Pedido } from "@/lib/api-client";
import { formatCurrency } from "@/utils/utils";
import { OrdersModal } from "@/components/OrdersModal";
import { useFinance } from "@/app/finance/hooks/useFinance";
import { DataTable } from "@/components/DataTable/index";

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
        showTableHeader={true}
        headerRight={
          <Text
            bg="linear-gradient(180deg, #FFFFFF 0%, #E6E8EB 45%, #BFC3C9 100%)"
            px={3}
            py={2}
            color="black"
            fontSize="xl"
            fontWeight="bold"
            borderRadius="14px"
            boxShadow="inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(0, 0, 0, 0.08), 0 6px 16px rgba(0, 0, 0, 0.25)"
            textAlign="right"
          >
            {isLoading ? "R$ --" : faturamentoFormatado}
          </Text>
        }
        filterComponent={
          <Text
            bg="linear-gradient(180deg, #0F2A44 0%, #0B3C6D 45%, #061B33 100%)"
            px={3}
            py={2}
            color="white"
            fontSize="xl"
            fontWeight="bold"
            borderRadius="14px"
            boxShadow="inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(0, 0, 0, 0.08), 0 6px 16px rgba(0, 0, 0, 0.25)"
            textAlign="right"
          >
            PEDIDOS DO DIA
          </Text>
        }
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
