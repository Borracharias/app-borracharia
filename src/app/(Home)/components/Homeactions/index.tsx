"use client";

import { Box, Button, Flex, Heading, Text, Grid } from "@chakra-ui/react";
import { Plus } from "lucide-react";

interface HomeActionsProps {
  faturamento: string;
  isLoading: boolean;
  onStock: () => void;
  onFinanceMounth: () => void;
  onFinanceDay: () => void;
  onTires: () => void;
  onServices: () => void;
  onOrders: () => void;
}

export function HomeActions({
  faturamento,
  isLoading,
  onStock,
  onFinanceMounth,
  onFinanceDay,
  onTires,
  onServices,
  onOrders,
}: HomeActionsProps) {
  return (
    <Flex flex={1} direction="column">
      <Heading size="sm" mb={3} fontWeight="bold" color="white">
        ATENDIMENTO
      </Heading>
      <Box
        border="1px solid"
        borderColor="gray.900"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        borderRadius="2xl"
        p={4}
        mb={8}
      >
        <Grid templateColumns="1fr 1fr" gap={4} alignItems="center">
          <Button
            h="160px"
            bg="green.500"
            border="1px solid"
            borderColor="green.500"
            color="white"
            _hover={{ bg: "green.600", borderColor: "green.600" }}
            fontSize="xl"
            fontWeight="bold"
            onClick={onOrders}
            borderRadius="xl"
          >
            NOVO PEDIDO
          </Button>
          <Box
            h="80px"
            p={4}
            border="1px solid"
            borderColor="white"
            borderRadius="xl"
            bg="white"
            color="black"
            fontWeight="bold"
            cursor="pointer"
            onClick={onFinanceDay}
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Text fontSize="xs" mb={2} fontWeight="bold" color="black">
              FINANCEIRO (DIA)
            </Text>
            <Heading size="sm">{isLoading ? "R$ --" : faturamento}</Heading>
          </Box>
        </Grid>
      </Box>

      <Heading size="sm" mb={3} fontWeight="bold" color="white">
        ADICIONAR ITENS
      </Heading>
      <Box
        border="2px solid"
        borderColor="gray.900"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        borderRadius="2xl"
        p={4}
        mb={8}
      >
        <Flex gap={4} justify="space-between">
          <Button
            w="150px"
            h="120px"
            variant="outline"
            flexDirection="column"
            gap={2}
            onClick={onTires}
            bg="green.500"
            border="1px solid"
            borderColor="green.500"
            color="white"
            _hover={{ bg: "green.600", borderColor: "green.600" }}
            borderRadius="xl"
          >
            <Plus size={25} strokeWidth={5} />
            <Text fontSize="sm" fontWeight="bold">
              PNEUS
            </Text>
          </Button>
          <Button
            w="150px"
            h="120px"
            variant="outline"
            flexDirection="column"
            bg="green.500"
            border="1px solid"
            borderColor="green.500"
            color="white"
            _hover={{ bg: "green.600", borderColor: "green.600" }}
            gap={2}
            onClick={onServices}
            borderRadius="xl"
          >
            <Plus size={25} strokeWidth={5} />
            <Text fontSize="sm" fontWeight="bold">
              SERVIÇOS
            </Text>
          </Button>
        </Flex>
      </Box>

      <Box mt="auto">
        <Heading size="sm" mb={3} fontWeight="bold" color="white">
          GESTÃO
        </Heading>
        <Box
          border="2px solid"
          borderColor="gray.900"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          borderRadius="2xl"
          p={4}
        >
          <Flex gap={4}>
            <Button
              flex={1}
              h="60px"
              variant="outline"
              borderColor="white"
              borderRadius="xl"
              bg="white"
              color="black"
              _hover={{ bg: "white", borderColor: "white" }}
              fontWeight="bold"
              onClick={onStock}
            >
              ESTOQUE
            </Button>
            <Button
              flex={1}
              h="60px"
              variant="outline"
              borderColor="white"
              borderRadius="xl"
              bg="white"
              color="black"
              _hover={{ bg: "white", borderColor: "white" }}
              fontWeight="bold"
              onClick={onFinanceMounth}
            >
              FINANCEIRO
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
