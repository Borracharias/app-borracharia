"use client";

import {
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Box,
} from "@chakra-ui/react";
import { Menu, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { api } from "@/lib/api";

interface HomeActionsProps {
  faturamento: string;
  isLoading: boolean;
  onStock: () => void;
  onFinanceMounth: () => void;
  onFinanceDay: () => void;
  onTires: () => void;
  onServices: () => void;
  onOrders: () => void;
  onExpenses: () => void;
  onAddExpense: () => void;
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
  onExpenses,
  onAddExpense,
}: HomeActionsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await api.auth.authControllerLogout();
    } catch (error) {
      console.error("Erro ao realizar logout no servidor:", error);
    } finally {
      logout();
      router.push("/login");
    }
  };

  return (
    <Flex flex={1} direction="column" position="relative">
      {/* Topo: Atendimento e Financeiro */}
      <Flex justify="space-between" align="flex-end" mb={6}>
        <Heading size="sm" fontWeight="bold" color="white" mb={2}></Heading>

        <Button
          variant="metal-white"
          minW="140px"
          h="auto"
          onClick={onFinanceDay}
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          py={4}
        >
          <Text fontSize="xs" fontWeight="bold" mb={1}>
            FINANCEIRO (DIA)
          </Text>
          <Heading size="md">
            {isLoading ? "R$ --" : `R$ ${faturamento}`}
          </Heading>
        </Button>
      </Flex>

      {/* Botão Novo Pedido */}
      <Button
        w="100%"
        h="220px"
        variant="metal-blue-dark"
        fontSize="2xl"
        fontWeight="bold"
        onClick={onOrders}
        mb={8}
      >
        NOVO PEDIDO
      </Button>

      {/* Botão Menu Rodapé */}
      <Flex mt="auto" justify="center" pb={6}>
        <Button
          w="90px"
          h="90px"
          borderRadius="full"
          variant="metal-blue-dark"
          onClick={onOpen}
          flexDirection="column"
          p={0}
        >
          <Menu size={40} />
        </Button>
      </Flex>

      {/* Drawer do Menu */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay backdropFilter="blur(2px)" bg="blackAlpha.600" />
        <DrawerContent
          bg="linear-gradient(180deg, #0F2A44 0%, #0B3C6D 45%, #061B33 100%)"
          color="white"
          borderColor="#0B3C6D"
        >
          <DrawerCloseButton />
          <DrawerBody pt={6} px={6} display="flex" flexDirection="column">
            <Flex justify="center" mb={8} mt={8}>
              {/* <Box position="relative" w="120px" h="120px">
                <Image
                  src="/logo.png"
                  alt="Logo Borracharia"
                  fill
                  sizes="120px"
                  style={{
                    objectFit: "contain",
                  }}
                  priority
                />
              </Box> */}
            </Flex>

            <VStack align="stretch" spacing={6} flex={1}>
              <Button
                variant="unstyled"
                display="flex"
                justifyContent="flex-start"
                fontSize="xl"
                fontWeight="normal"
                _hover={{ color: "whiteAlpha.800" }}
                onClick={onTires}
              >
                ADICIONAR PNEU
              </Button>
              <Button
                variant="unstyled"
                display="flex"
                justifyContent="flex-start"
                fontSize="xl"
                fontWeight="normal"
                _hover={{ color: "whiteAlpha.800" }}
                onClick={onServices}
              >
                ADICIONAR SERVIÇO
              </Button>
              <Button
                variant="unstyled"
                display="flex"
                justifyContent="flex-start"
                fontSize="xl"
                fontWeight="normal"
                _hover={{ color: "whiteAlpha.800" }}
                onClick={onFinanceMounth}
              >
                FINANCEIRO (MÊS)
              </Button>
              <Button
                variant="unstyled"
                display="flex"
                justifyContent="flex-start"
                fontSize="xl"
                fontWeight="normal"
                _hover={{ color: "whiteAlpha.800" }}
                onClick={onStock}
              >
                ESTOQUE
              </Button>
              <Button
                variant="unstyled"
                display="flex"
                justifyContent="flex-start"
                fontSize="xl"
                fontWeight="normal"
                _hover={{ color: "whiteAlpha.800" }}
                onClick={onAddExpense}
              >
                ADICIONAR DESPESAS
              </Button>
              <Button
                variant="unstyled"
                display="flex"
                justifyContent="flex-start"
                fontSize="xl"
                fontWeight="normal"
                _hover={{ color: "whiteAlpha.800" }}
                onClick={onExpenses}
              >
                DESPESAS
              </Button>
            </VStack>

            {/* <Button
              variant="metal-red"
              onClick={handleLogout}
              rightIcon={<LogOut size={16} />}
              size="sm"
              mt={6}
              mb={4}
              w="full"
            >
              SAIR
            </Button> */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
