"use client";

import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, useDisclosure, Box, Text } from "@chakra-ui/react";
import { CreatePneuDtoTypeEnum } from "@/lib/api-client";
import { PageHeader } from "@/components/Header";
import { DataForm } from "@/components/DataForm/DataForm";
import { DataField } from "@/components/DataField";
import { DataButton } from "@/components/DataButton";
import { tireSchema, TireForm, VALID_RIMS } from "./schema";
import { useRimSize } from "./hooks/useRimSize";
import { useCreateTires } from "./hooks/useCreatePneu";
import { ConfirmActionModal } from "@/components/ConfirmActionModal";
import { useState } from "react";
import { formatCurrency } from "@/utils/utils";

export default function TiresPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<TireForm | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<TireForm>({
    resolver: zodResolver(tireSchema) as Resolver<TireForm>,
    defaultValues: { type: CreatePneuDtoTypeEnum.Novo },
  });

  const { selectedRim, availableSizes } = useRimSize({
    control,
    setValue,
    clearErrors,
  });

  const { createPneu, isCreating } = useCreateTires();

  const onSubmit = (data: TireForm) => {
    setFormData(data);
    onOpen();
  };

  const handleConfirm = () => {
    if (formData) {
      createPneu(formData, {
        onSuccess: () => {
          reset({
            type: CreatePneuDtoTypeEnum.Novo,
            model: "",
            rim: undefined,
            size: undefined,
            quantity: 1,
            price: 0,
          });
          onClose();
        },
      });
    }
  };

  return (
    <Container maxW="container.md" py={6}>
      <PageHeader title="ADICIONAR PNEU" />

      <DataForm onSubmit={handleSubmit(onSubmit)}>
        <DataField
          label="Tipo"
          type="select"
          register={register("type")}
          error={errors.type}
        >
          {Object.values(CreatePneuDtoTypeEnum).map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </DataField>

        <DataField
          label="Modelo"
          register={register("model")}
          placeholder="Ex: Pirelli Scorpion"
          error={errors.model}
        />

        <DataField
          label="Aro"
          type="select"
          placeholder="Selecione o aro"
          register={register("rim")}
          error={errors.rim}
        >
          {VALID_RIMS.map((aro) => (
            <option key={aro} value={aro}>
              {aro}
            </option>
          ))}
        </DataField>

        <DataField
          label="Numeração"
          type="select"
          placeholder={
            !selectedRim ? "Selecione o aro primeiro" : "Selecione a numeração"
          }
          selectProps={{ isDisabled: !selectedRim }}
          register={register("size")}
          error={errors.size}
        >
          {availableSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </DataField>

        <DataField
          label="Quantidade"
          type="number"
          register={register("quantity")}
          error={errors.quantity}
        />

        <DataField
          label="Preço Unitário"
          type="number"
          register={register("price")}
          error={errors.price}
          placeholder="0.00"
        />

        <DataButton isLoading={isCreating}>CONFIRMAR</DataButton>
      </DataForm>

      <ConfirmActionModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirm}
        title="CONFIRMAR CADASTRO DE PNEU"
        isLoading={isCreating}
      >
        {formData && (
          <Box>
            <Text>
              <strong>Tipo:</strong> {formData.type}
            </Text>
            {formData.model && (
              <Text>
                <strong>Modelo:</strong> {formData.model}
              </Text>
            )}
            <Text>
              <strong>Aro:</strong> {formData.rim}
            </Text>
            <Text>
              <strong>Numeração:</strong> {formData.size}
            </Text>
            <Text>
              <strong>Quantidade:</strong> {formData.quantity}
            </Text>
            <Text>
              <strong>Preço Unitário:</strong> {formatCurrency(formData.price)}
            </Text>
            <Text fontWeight="bold" mt={2} color="green.300">
              Total: {formatCurrency(formData.quantity * formData.price)}
            </Text>
          </Box>
        )}
      </ConfirmActionModal>
    </Container>
  );
}
