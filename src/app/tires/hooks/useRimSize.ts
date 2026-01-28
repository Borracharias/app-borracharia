import { useEffect, useMemo } from "react";
import {
  type Control,
  useWatch,
  type UseFormSetValue,
  type UseFormClearErrors,
} from "react-hook-form";
import { TireForm, VALID_SIZES_BY_RIM } from "../schema";

type Params = {
  control: Control<TireForm>;
  setValue: UseFormSetValue<TireForm>;
  clearErrors: UseFormClearErrors<TireForm>;
};

export function useRimSize({ control, setValue, clearErrors }: Params) {
  const selectedRim = useWatch({ control, name: "rim" });

  const availableSizes = useMemo(() => {
    if (!selectedRim) return [];
    return VALID_SIZES_BY_RIM[selectedRim] ?? [];
  }, [selectedRim]);

  useEffect(() => {
    if (!selectedRim) {
      setValue("size", undefined as unknown as TireForm["size"]);
      return;
    }

    const first = availableSizes[0];

    clearErrors("size");
    setValue("size", (first ?? undefined) as unknown as TireForm["size"], {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [selectedRim, availableSizes, setValue, clearErrors]);

  return { selectedRim, availableSizes };
}
