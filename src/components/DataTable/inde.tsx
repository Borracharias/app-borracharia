"use client";

import {
  Box,
  Container,
  Flex,
  Text,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { PageHeader } from "@/components/Header";
import { ReactNode } from "react";

interface Column<T> {
  header: string;
  accessor: (item: T) => ReactNode;
  isNumeric?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  headerRight?: ReactNode;
  filterComponent?: ReactNode;
  showTableHeader?: boolean;
}

export function DataTable<T extends { id?: string | number }>({
  title,
  data,
  columns,
  isLoading = false,
  emptyMessage = "Nenhum registro encontrado.",
  onRowClick,
  headerRight,
  filterComponent,
  showTableHeader = true,
}: DataTableProps<T>) {
  return (
    <Container
      maxW="md"
      h="100vh"
      bg="black"
      color="white"
      p={4}
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <PageHeader title={title} />

      {/* Filtros e Info Adicional */}
      {(filterComponent || headerRight) && (
        <Flex justify="space-between" align="center" mb={6} gap={2}>
          {filterComponent}
          {headerRight}
        </Flex>
      )}

      {/* Tabela */}
      <Box
        border="1px solid"
        borderColor="whiteAlpha.300"
        borderRadius="xl"
        flex={1}
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        {/* Cabeçalho da Tabela */}
        {showTableHeader && (
          <Flex
            px={6}
            py={3}
            borderBottom="1px solid"
            borderColor="whiteAlpha.300"
            justify="space-between"
            bg="whiteAlpha.50"
          >
            {columns.map((column, index) => (
              <Text
                key={index}
                fontWeight="bold"
                fontSize="sm"
                color="gray.300"
                textAlign={column.isNumeric ? "right" : "left"}
                flex={column.width || "1"}
              >
                {column.header}
              </Text>
            ))}
          </Flex>
        )}

        {/* Conteúdo */}
        {isLoading ? (
          <Center flex={1}>
            <Spinner color="green.400" />
          </Center>
        ) : data.length === 0 ? (
          <Center flex={1}>
            <Text color="gray.500">{emptyMessage}</Text>
          </Center>
        ) : (
          <Box overflowY="auto" flex={1}>
            <Table variant="unstyled" size="sm">
              {!showTableHeader && (
                <Thead>
                  <Tr>
                    {columns.map((column, index) => (
                      <Th
                        key={index}
                        color="white"
                        isNumeric={column.isNumeric}
                      >
                        {column.header}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
              )}
              <Tbody>
                {data.map((item, rowIndex) => (
                  <Tr
                    key={item.id || rowIndex}
                    _hover={{
                      bg: "whiteAlpha.50",
                      cursor: onRowClick ? "pointer" : "default",
                    }}
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.100"
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((column, colIndex) => (
                      <Td
                        key={colIndex}
                        pl={colIndex === 0 ? 6 : undefined}
                        py={3}
                        fontSize="md"
                        isNumeric={column.isNumeric}
                        color={column.isNumeric ? "green.300" : undefined}
                        fontWeight={column.isNumeric ? "bold" : undefined}
                      >
                        {column.accessor(item)}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>
    </Container>
  );
}
