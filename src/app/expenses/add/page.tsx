"use client";

import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/Header";
import { DataForm } from "@/components/DataForm/DataForm";
import { DataField } from "@/components/DataField";
import { DataButton } from "@/components/DataButton";
import { expenseSchema, ExpenseForm, EXPENSE_TYPES } from "../schema";
import { useExpenses } from "../hooks/useExpenses";

export default function AddExpensePage() {
  const router = useRouter();
  const { createExpense, isCreating } = useExpenses();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseForm>({
    resolver: zodResolver(expenseSchema) as Resolver<ExpenseForm>,
  });

  const onSubmit = (data: ExpenseForm) => {
    createExpense(data, {
      onSuccess: () => {
        router.push("/expenses");
      },
    });
  };

  return (
    <Container maxW="container.md" py={6}>
      <PageHeader title="ADICIONAR DESPESA" />

      <DataForm onSubmit={handleSubmit(onSubmit)}>
        <DataField
          label="Tipo"
          type="select"
          placeholder="Selecione o tipo"
          register={register("type")}
          error={errors.type}
        >
          {EXPENSE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </DataField>

        <DataField
          label="Descrição"
          register={register("description")}
          placeholder="Ex: Conta de luz"
          error={errors.description}
        />

        <DataField
          label="Valor"
          type="number"
          inputProps={{ step: "0.01" }}
          register={register("amount")}
          error={errors.amount}
          placeholder="0.00"
        />

        <DataButton isLoading={isCreating}>CONFIRMAR</DataButton>
      </DataForm>
    </Container>
  );
}
