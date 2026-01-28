import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Pneu, Servico } from "@/lib/api-client";

export function useOrderData() {
  const pneus = useQuery({
    queryKey: ["pneus"],
    queryFn: () =>
      api.pneus.pneusControllerFindAll().then((res) => res.data as Pneu[]),
  });

  const servicos = useQuery({
    queryKey: ["servicos"],
    queryFn: () =>
      api.servicos
        .servicosControllerFindAll()
        .then((res) => res.data as Servico[]),
  });

  return {
    pneus: pneus.data,
    servicos: servicos.data,
    isLoading: pneus.isLoading || servicos.isLoading,
  };
}
