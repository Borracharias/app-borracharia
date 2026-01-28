"use client";

import { useForm, useFieldArray, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

import { api } from "@/lib/api";
import type { CreatePedidoDto } from "@/lib/api-client";
import { OrderForm, orderSchema } from "../schema";

function defaultItem(): OrderForm["itens"][number] {
  return {
    tipo: "PNEU",
    quantidade: 1,
    precoUnitario: 0,
    itemId: "",
    garantia: { hasWarranty: false },
  };
}

function toPayload(data: OrderForm): CreatePedidoDto {
  const itemComGarantia = data.itens.find((i) => i.garantia?.hasWarranty);

  return {
    clientName: data.nomeCliente,
    clientPhone: data.telefoneCliente,
    items: data.itens.map((item) => ({
      pneuId: item.tipo === "PNEU" && item.itemId ? item.itemId : undefined,
      servicoId:
        item.tipo === "SERVICO" && item.itemId ? item.itemId : undefined,
      quantity: item.quantidade,
      unitPrice: item.precoUnitario,
    })),
    hasWarranty: Boolean(itemComGarantia),
    garantia: itemComGarantia
      ? {
          carPlate: itemComGarantia.garantia?.placa || "",
          mileage: itemComGarantia.garantia?.quilometragem || 0,
          terms: itemComGarantia.garantia?.condicao || "",
        }
      : undefined,
  };
}

export function useOrderForm() {
  const router = useRouter();
  const toast = useToast();

  const methods = useForm<OrderForm>({
    resolver: zodResolver(orderSchema) as Resolver<OrderForm>,
    defaultValues: {
      nomeCliente: "",
      telefoneCliente: "",
      itens: [defaultItem()],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itens",
  });

  const mutation = useMutation({
    mutationFn: (payload: CreatePedidoDto) =>
      api.pedidos.pedidosControllerCreate(payload),
    onSuccess: () => {
      toast({ title: "Pedido criado com sucesso", status: "success" });
      router.push("/");
    },
    onError: (err: Error) => {
      toast({
        title: "Erro ao criar pedido",
        description: err.message,
        status: "error",
      });
    },
  });

  const onSubmit = (data: OrderForm) => {
    const payload = toPayload(data);
    mutation.mutate(payload);
  };

  return {
    methods,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    fields,
    appendItem: () => append(defaultItem()),
    removeItem: remove,
    isCreating: mutation.isPending,
  };
}
