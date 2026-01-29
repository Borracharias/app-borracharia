import { z } from "zod";
import { CreateDespesaDtoTypeEnum } from "@/lib/api-client";

// Excluir 'Pneus' das opções
export const EXPENSE_TYPES = Object.values(CreateDespesaDtoTypeEnum).filter(
  (type) => type !== CreateDespesaDtoTypeEnum.Pneus
);

export const expenseSchema = z.object({
  type: z.nativeEnum(CreateDespesaDtoTypeEnum).refine(
    (val) => val !== CreateDespesaDtoTypeEnum.Pneus,
    {
      message: "Tipo inválido para despesas manuais",
    }
  ),
  description: z.string().optional(),
  amount: z.coerce.number().min(0.01, "Valor deve ser maior que zero"),
});

export type ExpenseForm = z.infer<typeof expenseSchema>;
