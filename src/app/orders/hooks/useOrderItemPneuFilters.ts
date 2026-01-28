import { useMemo, useEffect } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import type { Pneu } from "@/lib/api-client";
import { OrderForm } from "../schema";

export function useOrderItemTiresFilters({
  index,
  pneus,
  control,
  setValue,
}: {
  index: number;
  pneus?: Pneu[];
  control: Control<OrderForm>;
  setValue: UseFormSetValue<OrderForm>;
}) {
  const tipo = useWatch({ control, name: `itens.${index}.tipo` });
  const hasWarranty = useWatch({
    control,
    name: `itens.${index}.garantia.hasWarranty`,
  });
  const aroFilter = useWatch({ control, name: `itens.${index}.aroFilter` });
  const numeracaoFilter = useWatch({
    control,
    name: `itens.${index}.numeracaoFilter`,
  });

  useEffect(() => {
    if (tipo === "PNEU") {
      if (aroFilter && numeracaoFilter && pneus) {
        const pneu = pneus.find(
          (p) => p.rim === Number(aroFilter) && p.size === numeracaoFilter,
        );

        if (pneu) {
          setValue(`itens.${index}.itemId`, pneu.id);
        } else {
          setValue(`itens.${index}.itemId`, "");
        }
      } else {
        setValue(`itens.${index}.itemId`, "");
      }
    }
  }, [tipo, aroFilter, numeracaoFilter, pneus, setValue, index]);

  const availableRims = useMemo(
    () =>
      Array.from(new Set(pneus?.map((p) => p.rim).filter(Boolean))).sort(
        (a, b) => (a || 0) - (b || 0),
      ),
    [pneus],
  );

  const availableSizes = useMemo(
    () =>
      Array.from(
        new Set(
          pneus
            ?.filter((p) => p.rim === Number(aroFilter))
            .map((p) => p.size)
            .filter(Boolean),
        ),
      ).sort(),
    [pneus, aroFilter],
  );

  return {
    tipo,
    hasWarranty,
    aroFilter,
    availableRims,
    availableSizes,
  };
}
