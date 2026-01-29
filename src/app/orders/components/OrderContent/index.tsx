"use client";

import { FormProvider } from "react-hook-form";
import { Container, Button } from "@chakra-ui/react";
import { Plus } from "lucide-react";

import { PageHeader } from "@/components/Header";
import { DataForm } from "@/components/DataForm/DataForm";
import { DataField } from "@/components/DataField";
import { DataButton } from "@/components/DataButton";
import { useOrderData } from "@/app/orders/hooks/useOrderData";
import { useOrderForm } from "@/app/orders/hooks/useOrderForm";
import { OrderItem } from "../OrderItem";

export function OrderContent() {
  const { pneus, servicos } = useOrderData();

  const {
    methods,
    register,
    handleSubmit,
    errors,
    fields,
    appendItem,
    removeItem,
    isCreating,
  } = useOrderForm();

  return (
    <Container maxW="container.md" py={6}>
      <PageHeader title="NOVO PEDIDO" />

      <FormProvider {...methods}>
        <DataForm onSubmit={handleSubmit}>
          <DataField
            label="Cliente"
            register={register("nomeCliente")}
            error={errors.nomeCliente}
          />
          <DataField
            label="Telefone"
            register={register("telefoneCliente")}
            error={errors.telefoneCliente}
          />

          {fields.map((field, index) => (
            <OrderItem
              key={field.id}
              index={index}
              remove={removeItem}
              pneus={pneus}
              servicos={servicos}
            />
          ))}

          <Button onClick={appendItem} variant="outline" mx="auto">
            <Plus />
          </Button>

          <DataButton isLoading={isCreating}>CONFIRMAR</DataButton>
        </DataForm>
      </FormProvider>
    </Container>
  );
}
