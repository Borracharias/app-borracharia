import { useMemo, useState, useEffect } from "react";
import type { Pedido } from "@/lib/api-client";
import { formatCurrency } from "@/utils/utils";

type PeriodoFaturamento = "dia" | "mes" | "ano";

export function useFinance(
  pedidos: Pedido[] | undefined,
  periodo: PeriodoFaturamento = "dia",
) {
  const [hoje, setHoje] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line
    setHoje(new Date());
  }, []);

  const faturamento = useMemo(() => {
    if (!pedidos || !hoje) return 0;

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
  }, [pedidos, periodo, hoje]);

  const faturamentoFormatado = useMemo(() => {
    return formatCurrency(faturamento);
  }, [faturamento]);

  return { faturamento, faturamentoFormatado };
}
