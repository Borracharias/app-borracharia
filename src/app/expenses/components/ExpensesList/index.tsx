"use client";

import { Box, Text, Flex } from "@chakra-ui/react";
import { DataTable } from "@/components/DataTable";
import { useExpenses } from "../../hooks/useExpenses";
import { formatCurrency } from "@/utils/utils";
import { useState, useMemo } from "react";
import { Filter } from "../../../finance/components/Filter";

export function ExpensesList() {
  const { expenses, isLoading } = useExpenses();
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`,
  );

  const filteredExpenses = useMemo(() => {
    if (!expenses) return [];

    const [year, month] = selectedMonth.split("-").map(Number);

    return expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.createdAt);
        return (
          expenseDate.getFullYear() === year &&
          expenseDate.getMonth() + 1 === month
        );
      })
      .sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
  }, [expenses, selectedMonth]);

  // Calcular total do mês
  const monthTotal = useMemo(() => {
    return filteredExpenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  }, [filteredExpenses]);

  return (
    <DataTable
      title="DESPESAS"
      data={filteredExpenses}
      isLoading={isLoading}
      emptyMessage="Nenhuma despesa encontrada neste mês."
      filterComponent={
        <Filter value={selectedMonth} onChange={setSelectedMonth} />
      }
      headerRight={
        <Flex gap={2} align="center">
          <Box
            bg="linear-gradient(180deg, #FFFFFF 0%, #E6E8EB 45%, #BFC3C9 100%)"
            px={3}
            py={2}
            borderRadius="14px"
            boxShadow="inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(0, 0, 0, 0.08), 0 6px 16px rgba(0, 0, 0, 0.25)"
            textAlign="right"
            minW="120px"
          >
            <Text fontSize="xs" color="black" mb={0} fontWeight="bold">
              TOTAL
            </Text>
            <Text fontSize="md" fontWeight="bold" color="black">
              {formatCurrency(monthTotal)}
            </Text>
          </Box>
        </Flex>
      }
      columns={[
        {
          header: "Data",
          accessor: (item) =>
            new Date(item.createdAt).toLocaleDateString("pt-BR"),
        },
        {
          header: "Descrição",
          accessor: (item) => item.description || "-",
        },
        {
          header: "Valor",
          accessor: (item) => formatCurrency(item.amount),
          isNumeric: true,
        },
      ]}
    />
  );
}
