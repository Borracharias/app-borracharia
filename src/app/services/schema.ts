import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  description: z.string().optional(),
});

export type ServicoForm = z.infer<typeof serviceSchema>;
