"use client";

import { Select } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Borracharia } from "@/lib/api-client";

interface FilterProps {
  value: string;
  onChange: (value: string) => void;
}

type MonthOption = { value: string; label: string };

export function Filter({ value, onChange }: FilterProps) {
  const { data: borracharias } = useQuery({
    queryKey: ["borracharias", "meta"],
    queryFn: async () => {
      const response = await api.borracharias.borrachariasControllerFindAll();
      return response.data as Borracharia[];
    },
  });

  const [monthOptions, setMonthOptions] = useState<MonthOption[]>([]);

  const startInfo = useMemo(() => {
    // Define um fallback se ainda não carregou
    let startYear = 0;
    let startMonth = 0;

    if (borracharias && borracharias.length > 0) {
      const createdAt = new Date(borracharias[0].createdAt);
      if (!Number.isNaN(createdAt.getTime())) {
        startYear = createdAt.getFullYear();
        startMonth = createdAt.getMonth();
      }
    }

    return { startYear, startMonth };
  }, [borracharias]);

  useEffect(() => {
    // roda só no client
    const options: MonthOption[] = [];

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // fallback: últimos 12 meses se não tiver data válida ainda
    let startYear = currentYear - 1;
    let startMonth = currentMonth;

    if (startInfo.startYear) {
      startYear = startInfo.startYear;
      startMonth = startInfo.startMonth;
    }

    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    for (let year = startYear; year <= currentYear; year++) {
      const fromMonth = year === startYear ? startMonth : 0;
      const toMonth = year === currentYear ? currentMonth : 11;

      for (let month = fromMonth; month <= toMonth; month++) {
        options.push({
          value: `${year}-${String(month + 1).padStart(2, "0")}`,
          label: `${monthNames[month]} ${year}`,
        });
      }
    }

    options.sort((a, b) => b.value.localeCompare(a.value));
    setMonthOptions(options);
  }, [startInfo.startYear, startInfo.startMonth]);

  // garante que sempre exista um valor selecionado quando as opções carregarem
  useEffect(() => {
    if (!value && monthOptions.length > 0) {
      onChange(monthOptions[0].value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthOptions]);

  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      w="150px"
      bg="gray.800"
      borderColor="gray.700"
      color="white"
      size="sm"
      borderRadius="md"
      sx={{
        "> option": {
          bg: "gray.800",
          color: "white",
        },
      }}
      isDisabled={monthOptions.length === 0}
    >
      {monthOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Select>
  );
}
