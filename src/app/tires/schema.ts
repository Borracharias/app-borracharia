import { z } from "zod";
import {
  CreatePneuDtoTypeEnum,
  CreatePneuDtoRimEnum,
  CreatePneuDtoSizeEnum,
} from "@/lib/api-client";
import {
  enumNumberValues,
  enumStringValues,
  buildSizesByRim,
  toZodEnumTuple,
} from "@/utils/utils";

export const VALID_RIMS = enumNumberValues(CreatePneuDtoRimEnum);
export const ALL_SIZES = enumStringValues(CreatePneuDtoSizeEnum);

export const VALID_SIZES_BY_RIM = buildSizesByRim(VALID_RIMS, ALL_SIZES);

const SIZE_ENUM = z.enum(toZodEnumTuple(ALL_SIZES));

const ALL_TYPES = enumStringValues(CreatePneuDtoTypeEnum);
const TYPE_ENUM = z.enum(toZodEnumTuple(ALL_TYPES));

const baseTireSchema = z.object({
  model: z.string().optional(),
  rim: z.coerce
    .number()
    .refine((v) => VALID_RIMS.includes(v), { message: "Aro inválido" }),
  size: SIZE_ENUM,
  quantity: z.coerce.number().min(1, "Quantidade mínima é 1"),
  price: z.coerce.number().min(0, "Preço inválido"),
  type: TYPE_ENUM.default(CreatePneuDtoTypeEnum.Novo),
});

export const tireSchema = baseTireSchema.superRefine((data, ctx) => {
  const { rim, size } = data;

  const allowed = VALID_SIZES_BY_RIM[rim];
  if (!allowed) {
    ctx.addIssue({
      code: "custom",
      path: ["rim"],
      message: "Aro inválido",
    });
    return;
  }

  if (!allowed.includes(size)) {
    ctx.addIssue({
      code: "custom",
      path: ["size"],
      message: `Numeração inválida para aro ${rim}`,
    });
  }
});

export type TireForm = z.infer<typeof tireSchema>;
