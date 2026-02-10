"use client";

import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState, useMemo, useEffect } from "react";
import { formatCurrency, formatDate } from "@/utils/utils";
import type { Pedido } from "@/lib/api-client";
import { Filter } from "../Filter";
import { OrdersModal } from "@/components/OrdersModal";
import { DataTable } from "../../../../components/DataTable/index";

interface DadosDia {
  dia: string;
  valor: number;
}

export default function PageFinanceMounth() {
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const today = new Date();
    // eslint-disable-next-line
    setSelectedMonth(
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`,
    );
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const { startDate, endDate } = useMemo(() => {
    if (!selectedMonth) return { startDate: "", endDate: "" };
    const [year, month] = selectedMonth.split("-").map(Number);
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);
    return {
      startDate: formatDate(start),
      endDate: formatDate(end),
    };
  }, [selectedMonth]);

  const { data: pedidos = [], isLoading } = useQuery({
    queryKey: ["pedidos", startDate, endDate],
    queryFn: async () => {
      try {
        const response = await api.pedidos.pedidosControllerFindAll({
          startDate,
          endDate,
        });
        return response.data || [];
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        return [];
      }
    },
    enabled: !!startDate && !!endDate,
  });

  const dadosAgrupados = useMemo(() => {
    const agrupado: Record<string, number> = {};

    pedidos.forEach((pedido) => {
      if (!pedido.createdAt) return;

      const dataPedido = new Date(pedido.createdAt as string);
      const dia = String(dataPedido.getDate()).padStart(2, "0");

      const total = Number(pedido.total || 0);
      if (agrupado[dia]) {
        agrupado[dia] += total;
      } else {
        agrupado[dia] = total;
      }
    });

    return Object.entries(agrupado)
      .map(([dia, valor]) => ({ dia, valor, id: dia }))
      .sort((a, b) => Number(a.dia) - Number(b.dia));
  }, [pedidos]);

  const valorTotalMes = useMemo(() => {
    return dadosAgrupados.reduce((acc, item) => acc + item.valor, 0);
  }, [dadosAgrupados]);

  const pedidosDoDiaSelecionado = useMemo(() => {
    if (!selectedDay) return [];
    return pedidos.filter((pedido) => {
      if (!pedido.createdAt) return false;
      const dataPedido = new Date(pedido.createdAt as string);
      const dia = String(dataPedido.getDate()).padStart(2, "0");
      return dia === selectedDay;
    }) as Pedido[];
  }, [pedidos, selectedDay]);

  const formatDiaCompleto = (dia: string) => {
    if (!selectedMonth) return dia;
    const [year, month] = selectedMonth.split("-").map(Number);
    const date = new Date(year, month - 1, Number(dia));
    return date.toLocaleDateString("pt-BR");
  };

  const handleDayClick = (item: DadosDia) => {
    setSelectedDay(item.dia);
    onOpen();
  };

  return (
    <>
      <DataTable
        title="FINANCEIRO"
        data={dadosAgrupados}
        isLoading={isLoading}
        emptyMessage="Nenhum registro neste mês."
        onRowClick={handleDayClick}
        filterComponent={
          <Filter value={selectedMonth} onChange={setSelectedMonth} />
        }
        headerRight={
          <Box
            bg="linear-gradient(180deg, #FFFFFF 0%, #E6E8EB 45%, #BFC3C9 100%)"
            px={3}
            py={2}
            borderRadius="14px"
            boxShadow="inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(0, 0, 0, 0.08), 0 6px 16px rgba(0, 0, 0, 0.25)"
            textAlign="right"
          >
            <Text fontSize="xs" color="black" mb={0} fontWeight="bold">
              VALOR TOTAL MÊS
            </Text>
            <Text fontSize="md" fontWeight="bold" color="black">
              {formatCurrency(valorTotalMes)}
            </Text>
          </Box>
        }
        columns={[
          {
            header: "DIA",
            accessor: (item) => formatDiaCompleto(item.dia),
          },
          {
            header: "VALOR",
            accessor: (item) => formatCurrency(item.valor),
            isNumeric: true,
          },
        ]}
      />

      <OrdersModal
        isOpen={isOpen}
        onClose={onClose}
        date={`${selectedMonth}-${selectedDay}`}
        pedidos={pedidosDoDiaSelecionado}
      />
    </>
  );
}
