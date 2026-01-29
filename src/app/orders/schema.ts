import { z } from "zod";

export const orderSchema = z.object({
  nomeCliente: z.string().min(1),
  telefoneCliente: z.string().min(1),
  itens: z.array(
    z.object({
      tipo: z.enum(["PNEU", "SERVICO"]),
      itemId: z.string().min(1, "Selecione um item válido"),
      quantidade: z.coerce.number().min(1),
      precoUnitario: z.coerce.number().min(0),
      tipoPneuFilter: z.enum(["novo", "usado", "remold"]).optional(),
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
  ),
});

export type OrderForm = z.infer<typeof orderSchema>;
