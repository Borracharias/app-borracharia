"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  HStack,
  Divider,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from "@chakra-ui/react";
import type { Pedido } from "@/lib/api-client";
import { formatCurrency, formatDateFull } from "@/utils/utils";
import { useState } from "react";
import { ChevronLeft, Download, MessageCircle } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderPdf from "../OrderPdf";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  date?: string; // Opcional: se fornecido, mostra lista do dia
  pedidos?: Pedido[]; // Opcional: lista de pedidos do dia
  pedido?: Pedido | null; // Opcional: se fornecido, mostra detalhes direto
}

export function OrdersModal({
  isOpen,
  onClose,
  date,
  pedidos = [],
  pedido: initialPedido,
}: OrderModalProps) {
  const [localSelectedPedido, setLocalSelectedPedido] = useState<Pedido | null>(
    null,
  );
  const currentPedido = localSelectedPedido ?? initialPedido ?? null;

  const handleBack = () => setLocalSelectedPedido(null);

  const handleClose = () => {
    setLocalSelectedPedido(null);
    onClose();
  };

  const handleWhatsApp = () => {
    if (!currentPedido || !currentPedido.cliente?.phone) return;

    // Remove caracteres não numéricos
    const phoneRaw = currentPedido.cliente.phone.replace(/\D/g, "");
    // Adiciona 55 se parecer um número brasileiro sem DDI
    const phone =
      phoneRaw.length >= 10 && phoneRaw.length <= 11
        ? `55${phoneRaw}`
        : phoneRaw;

    const message = `Olá ${currentPedido.cliente.name}, segue os detalhes do seu pedido #${currentPedido.id.slice(0, 8).toUpperCase()} no valor de ${formatCurrency(currentPedido.total || 0)}.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleRowClick = (pedido: Pedido) => {
    setLocalSelectedPedido(pedido);
  };

  // Se tem pedido selecionado, mostra detalhes
  const showDetails = currentPedido !== null;

  // Se não tem pedido selecionado e tem data, mostra lista do dia
  const showDayList = !showDetails && date;

  const totalDia = pedidos.reduce((acc, p) => acc + Number(p.total || 0), 0);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl" isCentered>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent
        bg="linear-gradient(180deg, #0F2A44 0%, #0B3C6D 45%, #061B33 100%)"
        borderColor="whiteAlpha.300"
        borderWidth={1}
        maxW={{ base: "90%", md: "xl" }}
      >
        <ModalHeader>
          <HStack spacing={2}>
            {showDetails && date && (
              <IconButton
                aria-label="Voltar"
                icon={<ChevronLeft />}
                size="sm"
                variant="ghost"
                onClick={handleBack}
              />
            )}
            <Box>
              {showDetails ? (
                "Detalhes do Pedido"
              ) : showDayList ? (
                <>
                  Pedidos do dia {formatDateFull(date)}
                  <Text
                    fontSize="sm"
                    fontWeight="normal"
                    color="gray.400"
                    mt={1}
                  >
                    Total: {formatCurrency(totalDia)}
                  </Text>
                </>
              ) : (
                "Detalhes do Pedido"
              )}
            </Box>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {showDayList && (
            <Box overflowX="auto">
              <Table variant="simple" size="sm" colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th color="gray.400">Hora</Th>
                    <Th color="gray.400">Cliente</Th>
                    <Th color="gray.400" isNumeric>
                      Valor
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {pedidos.length === 0 ? (
                    <Tr>
                      <Td colSpan={3} textAlign="center" py={4}>
                        Nenhum pedido encontrado.
                      </Td>
                    </Tr>
                  ) : (
                    pedidos.map((pedido) => (
                      <Tr
                        key={pedido.id}
                        _hover={{ bg: "whiteAlpha.100", cursor: "pointer" }}
                        onClick={() => handleRowClick(pedido)}
                      >
                        <Td>
                          {new Date(pedido.createdAt).toLocaleTimeString(
                            "pt-BR",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </Td>
                        <Td>{pedido.cliente?.name}</Td>
                        <Td isNumeric fontWeight="bold" color="green.300">
                          {formatCurrency(pedido.total || 0)}
                        </Td>
                      </Tr>
                    ))
                  )}
                </Tbody>
              </Table>
            </Box>
          )}

          {showDetails && currentPedido && (
            <VStack align="stretch" spacing={6}>
              <Box>
                <Text color="gray.400" fontSize="sm">
                  Cliente
                </Text>
                <Heading size="md">{currentPedido.cliente?.name}</Heading>
                <Text fontSize="sm" mt={1}>
                  {new Date(currentPedido.createdAt).toLocaleString("pt-BR")}
                </Text>
              </Box>

              <Divider borderColor="whiteAlpha.300" />

              <Box>
                <Text color="gray.400" fontSize="sm" mb={3}>
                  Itens do Pedido
                </Text>
                <VStack align="stretch" spacing={3}>
                  {currentPedido.itens?.map((item) => (
                    <HStack
                      key={item.id}
                      justify="space-between"
                      p={3}
                      bg="whiteAlpha.100"
                      rounded="md"
                    >
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="bold">
                          {item.pneu
                            ? `${item.pneu.model} (${item.pneu.size})`
                            : item.servico?.name || "Item desconhecido"}
                        </Text>
                        <HStack spacing={2}>
                          <Badge
                            colorScheme={item.pneu ? "blue" : "purple"}
                            fontSize="xs"
                          >
                            {item.pneu ? "PNEU" : "SERVIÇO"}
                          </Badge>
                          <Text fontSize="xs" color="gray.400">
                            {item.quantity}x {formatCurrency(item.unitPrice)}
                          </Text>
                        </HStack>
                      </VStack>
                      <Text fontWeight="bold">
                        {formatCurrency(item.subTotal)}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              <Divider borderColor="whiteAlpha.300" />

              <Flex justify="space-between" align="center">
                <Text fontSize="lg">Total</Text>
                <Heading size="lg" color="green.400">
                  {formatCurrency(currentPedido.total || 0)}
                </Heading>
              </Flex>
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          {showDetails && currentPedido && (
            <HStack spacing={4} mr="auto">
              <Button
                leftIcon={<MessageCircle size={18} />}
                colorScheme="whatsapp"
                onClick={handleWhatsApp}
                isDisabled={!currentPedido.cliente?.phone}
                size="sm"
              >
                WhatsApp
              </Button>
              <PDFDownloadLink
                document={<OrderPdf pedido={currentPedido} />}
                fileName={`pedido-${currentPedido.cliente?.name?.replace(/\s+/g, "_") || "cliente"}-${currentPedido.cliente.phone}.pdf`}
              >
                {({ loading }) => (
                  <Button
                    leftIcon={<Download size={18} />}
                    colorScheme="blue"
                    isLoading={loading}
                    loadingText="Gerando PDF..."
                    size="sm"
                  >
                    Baixar PDF
                  </Button>
                )}
              </PDFDownloadLink>
            </HStack>
          )}
          <Button onClick={handleClose} variant="ghost">
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
