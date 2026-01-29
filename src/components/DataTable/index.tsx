"use client";

import { Box, Container, Flex, Text, Center, Spinner } from "@chakra-ui/react";
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
        // border="1px solid"
        // borderColor="whiteAlpha.700"
        borderRadius="xl"
        flex={1}
        bg="linear-gradient(180deg, #FFFFFF 0%, #E6E8EB 45%, #BFC3C9 100%)"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)"
      >
        {/* Cabeçalho da Tabela */}
        {showTableHeader && (
          <Flex
            px={6}
            py={3}
            borderBottom="1px solid"
            borderColor="black"
            justify="space-between"
            // bg="black"
          >
            {columns.map((column, index) => (
              <Text
                key={index}
                fontWeight="bold"
                fontSize="sm"
                color="black"
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
            <Text color="black">{emptyMessage}</Text>
          </Center>
        ) : (
          <Box overflowY="auto" flex={1}>
            <Flex direction="column">
              {data.map((item, rowIndex) => (
                <Flex
                  key={item.id || rowIndex}
                  px={6}
                  py={3}
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  justify="space-between"
                  align="center"
                  color="black"
                  fontWeight="bold"
                  _hover={{
                    bg: "whiteAlpha.50",
                    cursor: onRowClick ? "pointer" : "default",
                  }}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column, colIndex) => (
                    <Box
                      key={colIndex}
                      flex={column.width || "1"}
                      textAlign={column.isNumeric ? "right" : "left"}
                      fontSize="md"
                      color={column.isNumeric ? "green.500" : undefined}
                      fontWeight={column.isNumeric ? "bold" : undefined}
                    >
                      {column.accessor(item)}
                    </Box>
                  ))}
                </Flex>
              ))}
            </Flex>
          </Box>
        )}
      </Box>
    </Container>
  );
}
