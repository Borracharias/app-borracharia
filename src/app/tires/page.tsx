"use client";

import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@chakra-ui/react";
import { CreatePneuDtoTypeEnum } from "@/lib/api-client";
import { PageHeader } from "@/components/Header";
import { DataForm } from "@/components/DataForm/DataForm";
import { DataField } from "@/components/DataField";
import { DataButton } from "@/components/DataButton";
import { tireSchema, TireForm, VALID_RIMS } from "./schema";
import { useRimSize } from "./hooks/useRimSize";
import { useCreateTires } from "./hooks/useCreatePneu";

export default function TiresPage() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
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

  return (
    <Container maxW="container.md" py={6}>
      <PageHeader title="ADICIONAR PNEU" />

      <DataForm
        onSubmit={handleSubmit((data) => {
          createPneu(data);
        })}
      >
        <DataField
          label="tipo"
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
          label="modelo"
          register={register("model")}
          placeholder="Ex: Pirelli Scorpion"
          error={errors.model}
        />

        <DataField
          label="aro"
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
          label="numeração"
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
          label="quantidade"
          type="number"
          register={register("quantity")}
          error={errors.quantity}
        />

        <DataField
          label="custo"
          type="number"
          inputProps={{ step: "0.01" }}
          register={register("price")}
          error={errors.price}
        />

        <DataButton isLoading={isCreating}>confirmar</DataButton>
      </DataForm>
    </Container>
  );
}
