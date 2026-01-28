"use client";

import { Select } from "@chakra-ui/react";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Borracharia } from "@/lib/api-client";

interface FilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function Filter({ value, onChange }: FilterProps) {
  const { data: borracharias } = useQuery({
    queryKey: ["borracharias", "meta"],
    queryFn: async () => {
      const response = await api.borracharias.borrachariasControllerFindAll();
      return response.data as Borracharia[];
    },
  });

  const monthOptions = useMemo(() => {
    const options: { value: string; label: string }[] = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    let startYear = currentYear - 1;
    let startMonth = 0;

    if (borracharias && borracharias.length > 0) {
      const createdAt = new Date(borracharias[0].createdAt);
      if (!Number.isNaN(createdAt.getTime())) {
        startYear = createdAt.getFullYear();
        startMonth = createdAt.getMonth();
      }
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

    return options.sort((a, b) => b.value.localeCompare(a.value));
  }, [borracharias]);

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
    >
      {monthOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Select>
  );
}
