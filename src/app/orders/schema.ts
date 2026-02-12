import { z } from "zod";

export const orderSchema = z
  .object({
    nomeCliente: z.string().min(1, "Nome do cliente é obrigatório"),
    telefoneCliente: z
      .string()
      .min(1, "Telefone é obrigatório")
      .regex(/^\d{11}$/, "Telefone deve ter 11 dígitos (xxXXXXXXXXX)"),
    itens: z
      .array(
        z.object({
          tipo: z.enum(["PNEU", "SERVICO"]),
          itemId: z.string().min(1, "Selecione um item válido"),
          quantidade: z.coerce.number().min(1),
          precoUnitario: z.coerce.number().min(0),
          tipoPneuFilter: z
            .enum(["novo", "usado", "remold"])
            .or(z.literal(""))
            .optional(),
          aroFilter: z.coerce.number().optional(),
          numeracaoFilter: z.string().optional(),
          garantia: z
            .object({
              hasWarranty: z.boolean(),
              placa: z.string().optional(),
              quilometragem: z.coerce.number().optional(),
              condicao: z.string().optional(),
            })
            .optional(),
        }),
      )
      .min(1, "Adicione pelo menos um item"),
  })
  .refine(
    (data) => {
      const total = data.itens.reduce(
        (acc, item) => acc + item.quantidade * item.precoUnitario,
        0,
      );
      return total > 0;
    },
    {
      message: "O valor total do pedido deve ser maior que zero",
      path: ["itens"],
    },
  );

export type OrderForm = z.infer<typeof orderSchema>;
