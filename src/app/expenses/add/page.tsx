"use client";

import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, useDisclosure, Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/Header";
import { DataForm } from "@/components/DataForm/DataForm";
import { DataField } from "@/components/DataField";
import { DataButton } from "@/components/DataButton";
import { expenseSchema, ExpenseForm, EXPENSE_TYPES } from "../schema";
import { useExpenses } from "../hooks/useExpenses";
import { ConfirmActionModal } from "@/components/ConfirmActionModal";
import { useState } from "react";
import { formatCurrency } from "@/utils/utils";

export default function AddExpensePage() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<ExpenseForm | null>(null);
  const { createExpense, isCreating } = useExpenses();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseForm>({
    resolver: zodResolver(expenseSchema) as Resolver<ExpenseForm>,
  });

  const onSubmit = (data: ExpenseForm) => {
    setFormData(data);
    onOpen();
  };

  const handleConfirm = () => {
    if (formData) {
      createExpense(formData, {
        onSuccess: () => {
          reset({ description: "", amount: 0 });
          onClose();
          router.push("/expenses");
        },
      });
    }
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

      <ConfirmActionModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirm}
        title="CONFIRMAR CADASTRO DE DESPESA"
        isLoading={isCreating}
      >
        {formData && (
          <Box>
            <Text>
              <strong>Tipo:</strong> {formData.type}
            </Text>
            <Text>
              <strong>Descrição:</strong> {formData.description}
            </Text>
            <Text>
              <strong>Valor:</strong> {formatCurrency(formData.amount)}
            </Text>
          </Box>
        )}
      </ConfirmActionModal>
    </Container>
  );
}
