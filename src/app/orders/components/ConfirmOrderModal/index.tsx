"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Divider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import { OrderForm } from "../../schema";
import { formatCurrency } from "@/utils/utils";
import type { Pneu, Servico } from "@/lib/api-client";

interface ConfirmOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: OrderForm | null;
  isLoading?: boolean;
  pneus?: Pneu[];
  servicos?: Servico[];
}

export function ConfirmOrderModal({
  isOpen,
  onClose,
  onConfirm,
  data,
  isLoading,
  pneus = [],
  servicos = [],
}: ConfirmOrderModalProps) {
  if (!data) return null;

  const total = data.itens.reduce(
    (acc, item) => acc + item.quantidade * item.precoUnitario,
    0,
  );

  const getItemName = (item: OrderForm["itens"][number]) => {
    if (item.tipo === "PNEU") {
      return `Pneu ${item.numeracaoFilter || ""} (Aro ${item.aroFilter || ""})`;
    }
    const servico = servicos.find((s) => s.id === item.itemId);
    return servico ? `Serviço: ${servico.name}` : "Serviço";
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent
        bg="linear-gradient(180deg, #0F2A44 0%, #0B3C6D 45%, #061B33 100%)"
        borderColor="whiteAlpha.300"
        borderWidth={1}
        color="white"
        mx={4}
      >
        <ModalHeader borderBottomWidth={1} borderColor="whiteAlpha.200">
          CONFIRMAR PEDIDO
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={4}>
          <VStack align="stretch" spacing={4}>
            <Box>
              <Text fontWeight="bold" color="green.300">
                CLIENTE
              </Text>
              <Text fontSize="lg">{data.nomeCliente}</Text>
              <Text color="whiteAlpha.700">{data.telefoneCliente}</Text>
            </Box>

            <Divider borderColor="whiteAlpha.200" />

            <Box>
              <Text fontWeight="bold" color="green.300" mb={2}>
                ITENS
              </Text>
              <Table size="sm" variant="unstyled">
                <Thead borderBottomWidth={1} borderColor="whiteAlpha.100">
                  <Tr>
                    <Th color="whiteAlpha.600">ITEM</Th>
                    <Th color="whiteAlpha.600" isNumeric>
                      QTD
                    </Th>
                    <Th color="whiteAlpha.600" isNumeric>
                      PREÇO
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.itens.map((item, index) => (
                    <Tr key={index}>
                      <Td>{getItemName(item)}</Td>
                      <Td isNumeric>{item.quantidade}</Td>
                      <Td isNumeric>{formatCurrency(item.precoUnitario)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            <Divider borderColor="whiteAlpha.200" />

            <HStack justify="space-between">
              <Text fontSize="xl" fontWeight="bold">
                TOTAL
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="green.300">
                {formatCurrency(total)}
              </Text>
            </HStack>
          </VStack>
        </ModalBody>

        <ModalFooter borderTopWidth={1} borderColor="whiteAlpha.200" gap={3}>
          <Button variant="ghost" onClick={onClose} colorScheme="whiteAlpha">
            CANCELAR
          </Button>
          <Button
            colorScheme="green"
            onClick={onConfirm}
            isLoading={isLoading}
            px={8}
          >
            CONFIRMAR E SALVAR
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
