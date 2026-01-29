"use client";

import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@chakra-ui/react";
import { PageHeader } from "@/components/Header";
import { DataForm } from "@/components/DataForm/DataForm";
import { DataField } from "@/components/DataField";
import { DataButton } from "@/components/DataButton";
import { serviceSchema, ServicoForm } from "./schema";
import { useCreateService } from "./hooks/useCreateOrder";

export default function ServicesPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServicoForm>({
    resolver: zodResolver(serviceSchema) as Resolver<ServicoForm>,
  });

  const { createServico, isCreating } = useCreateService();

  return (
    <Container maxW="container.md" py={6}>
      <PageHeader title="ADICIONAR SERVIÇO" />

      <DataForm onSubmit={handleSubmit((data) => createServico(data))}>
        <DataField
          label="Nome"
          register={register("name")}
          placeholder="Ex: Alinhamento"
          error={errors.name}
        />

        <DataField
          label="Descrição (Opcional)"
          type="textarea"
          register={register("description")}
          placeholder="Detalhes do serviço"
          error={errors.description}
        />

        <DataButton isLoading={isCreating}>CONFIRMAR</DataButton>
      </DataForm>
    </Container>
  );
}
