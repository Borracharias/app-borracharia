"use client";

import { FormProvider } from "react-hook-form";
import { Container, Button, Text } from "@chakra-ui/react";
import { Plus } from "lucide-react";

import { PageHeader } from "@/components/Header";
import { DataForm } from "@/components/DataForm/DataForm";
import { DataField } from "@/components/DataField";
import { DataButton } from "@/components/DataButton";
import { useOrderData } from "@/app/orders/hooks/useOrderData";
import { useOrderForm } from "@/app/orders/hooks/useOrderForm";
import { OrderItem } from "../OrderItem";
import { ConfirmOrderModal } from "../ConfirmOrderModal";

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
    modal,
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
            placeholder="xxXXXXXXXXX"
            inputProps={{ maxLength: 11 }}
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

          {errors.itens && (
            <Text
              color="red.500"
              fontSize="sm"
              textAlign="center"
              fontWeight="bold"
            >
              {errors.itens.message}
            </Text>
          )}

          <DataButton isLoading={isCreating}>CONFIRMAR</DataButton>
        </DataForm>
      </FormProvider>

      <ConfirmOrderModal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        onConfirm={modal.confirmAndCreate}
        data={modal.formData}
        isLoading={isCreating}
        pneus={pneus}
        servicos={servicos}
      />
    </Container>
  );
}
