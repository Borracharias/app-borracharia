import { useMemo } from "react";
import type { Pedido } from "@/lib/api-client";
import { formatCurrency } from "@/utils/utils";

type PeriodoFaturamento = "dia" | "mes" | "ano";

export function useFinance(
  pedidos: Pedido[] | undefined,
  periodo: PeriodoFaturamento = "dia",
) {
  const faturamento = useMemo(() => {
    if (!pedidos) return 0;

    const hoje = new Date();

    return pedidos
      .filter((pedido) => {
        const dataPedido = new Date(pedido.createdAt);

        switch (periodo) {
          case "dia":
            return (
              dataPedido.getFullYear() === hoje.getFullYear() &&
              dataPedido.getMonth() === hoje.getMonth() &&
              dataPedido.getDate() === hoje.getDate()
            );
          case "mes":
            return (
              dataPedido.getFullYear() === hoje.getFullYear() &&
              dataPedido.getMonth() === hoje.getMonth()
            );
          case "ano":
            return dataPedido.getFullYear() === hoje.getFullYear();
          default:
            return false;
        }
      })
      .reduce((total, pedido) => total + Number(pedido.total || 0), 0);
  }, [pedidos, periodo]);

  const faturamentoFormatado = useMemo(() => {
    return formatCurrency(faturamento);
  }, [faturamento]);

  return { faturamento, faturamentoFormatado };
}
