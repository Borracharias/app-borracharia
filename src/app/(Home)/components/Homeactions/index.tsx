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
} from "@chakra-ui/react";
import { Menu } from "lucide-react";
import { useRef } from "react";

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

export function HomeActions(props: HomeActionsProps) {
  const {
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
  } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  const openDrawer = () => {
    (document.activeElement as HTMLElement | null)?.blur();
    onOpen();
  };

  // garante que fecha o drawer antes de qualquer ação (ex: router.push)
  const runAndClose = (fn: () => void) => () => {
    onClose();
    // pequena folga pro foco/aria finalizar antes de navegar
    setTimeout(() => fn(), 0);
  };

  return (
    <Flex flex={1} direction="column" position="relative">
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

      <Flex mt="auto" justify="center" pb={6}>
        <Button
          ref={menuBtnRef}
          w="90px"
          h="90px"
          borderRadius="full"
          variant="metal-blue-dark"
          onClick={openDrawer}
          flexDirection="column"
          p={0}
        >
          <Menu size={40} />
        </Button>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="xs"
        finalFocusRef={menuBtnRef} // ✅ devolve foco corretamente
      >
        <DrawerOverlay backdropFilter="blur(2px)" bg="blackAlpha.600" />
        <DrawerContent
          bg="linear-gradient(180deg, #0F2A44 0%, #0B3C6D 45%, #061B33 100%)"
          color="white"
          borderColor="#0B3C6D"
        >
          <DrawerCloseButton />
          <DrawerBody pt={6} px={6} display="flex" flexDirection="column">
            <VStack align="stretch" mt={14} spacing={6} flex={1}>
              <Button
                variant="unstyled"
                display="flex"
                justifyContent="flex-start"
                fontSize="xl"
                onClick={runAndClose(onTires)}
              >
                ADICIONAR PNEU
              </Button>

              <Button
                variant="unstyled"
                display="flex"
                justifyContent="flex-start"
                fontSize="xl"
                onClick={runAndClose(onServices)}
              >
                ADICIONAR SERVIÇO
              </Button>

              <Button
                variant="unstyled"
                display="flex"
                justifyContent="flex-start"
                fontSize="xl"
                onClick={runAndClose(onFinanceMounth)}
              >
                FINANCEIRO (MÊS)
              </Button>

              <Button
                variant="unstyled"
                display="flex"
                justifyContent="flex-start"
                fontSize="xl"
                onClick={runAndClose(onStock)}
              >
                ESTOQUE
              </Button>

              <Button
                variant="unstyled"
                display="flex"
                justifyContent="flex-start"
                fontSize="xl"
                onClick={runAndClose(onAddExpense)}
              >
                ADICIONAR DESPESAS
              </Button>

              <Button
                variant="unstyled"
                display="flex"
                justifyContent="flex-start"
                fontSize="xl"
                onClick={runAndClose(onExpenses)}
              >
                DESPESAS
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
