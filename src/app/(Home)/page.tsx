"use client";

import { useRouter } from "next/navigation";
import { Container } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Pedido } from "@/lib/api-client";
import { Header } from "./components/Header";
import { HomeActions } from "./components/Homeactions";
import { useFinance } from "@/hooks/useFinance";

export default function PageHome() {
  const router = useRouter();

  const { data: pedidos, isLoading } = useQuery({
    queryKey: ["pedidos", "home-faturamento"],
    queryFn: () =>
      api.pedidos
        .pedidosControllerFindAll()
        .then((res) => res.data as Pedido[]),
  });

  const { faturamentoFormatado } = useFinance(pedidos);

  return (
    <Container
      maxW="container.md"
      h="100dvh"
      py={6}
      display="flex"
      flexDirection="column"
    >
      <Header />

      <HomeActions
        faturamento={faturamentoFormatado}
        isLoading={isLoading}
        onOrders={() => router.push("/orders")}
        onStock={() => router.push("/stock")}
        onFinanceMounth={() => router.push("/finance/mounth")}
        onFinanceDay={() => router.push("/finance/day")}
        onTires={() => router.push("/tires")}
        onServices={() => router.push("/services")}
      />
    </Container>
  );
}
