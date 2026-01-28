export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const formatDateFull = (dateString: string | Date) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};


export const enumNumberValues = <T extends Record<string, string | number>>(e: T) =>
  Object.values(e).filter((v): v is number => typeof v === "number");

export const enumStringValues = <T extends Record<string, string | number>>(e: T) =>
  Object.values(e).filter((v): v is string => typeof v === "string");

export const buildSizesByRim = <Rim extends number, Size extends string>(
  rims: readonly Rim[],
  sizes: readonly Size[],
) =>
  Object.fromEntries(
    rims.map((rim) => [rim, sizes.filter((s) => s.endsWith(`R${rim}`))]),
  ) as Record<Rim, Size[]>;

export const toZodEnumTuple = <T extends string>(values: readonly T[]) => {
  if (!values.length) throw new Error("toZodEnumTuple: lista vazia");
  return values as [T, ...T[]];
};