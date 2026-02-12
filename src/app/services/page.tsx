"use client";

import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, useDisclosure, Box, Text } from "@chakra-ui/react";
import { PageHeader } from "@/components/Header";
import { DataForm } from "@/components/DataForm/DataForm";
import { DataField } from "@/components/DataField";
import { DataButton } from "@/components/DataButton";
import { serviceSchema, ServicoForm } from "./schema";
import { useCreateService } from "@/app/services/hooks/useCreateService";
import { ConfirmActionModal } from "@/components/ConfirmActionModal";
import { useState } from "react";
import { formatCurrency } from "@/utils/utils";

export default function ServicesPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<ServicoForm | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServicoForm>({
    resolver: zodResolver(serviceSchema) as Resolver<ServicoForm>,
  });

  const { createService, isCreating } = useCreateService();

  const onSubmit = (data: ServicoForm) => {
    setFormData(data);
    onOpen();
  };

  const handleConfirm = () => {
    if (formData) {
      createService(formData, {
        onSuccess: () => {
          reset({ name: "", description: "" });
          onClose();
        },
      });
    }
  };

  return (
    <Container maxW="container.md" py={6}>
      <PageHeader title="ADICIONAR SERVIÇO" />

      <DataForm onSubmit={handleSubmit(onSubmit)}>
        <DataField
          label="Nome do Serviço"
          register={register("name")}
          placeholder="Ex: Vulcanização"
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

      <ConfirmActionModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirm}
        title="CONFIRMAR CADASTRO DE SERVIÇO"
        isLoading={isCreating}
      >
        {formData && (
          <Box>
            <Text>
              <strong>Serviço:</strong> {formData.name}
            </Text>
            {formData.description && (
              <Text>
                <strong>Descrição:</strong> {formData.description}
              </Text>
            )}
          </Box>
        )}
      </ConfirmActionModal>
    </Container>
  );
}
