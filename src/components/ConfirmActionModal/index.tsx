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
  Text,
  Box,
  Divider,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isLoading?: boolean;
  children: ReactNode;
}

export function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  isLoading,
  children,
}: ConfirmActionModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent
        bg="linear-gradient(180deg, #0F2A44 0%, #0B3C6D 45%, #061B33 100%)"
        borderColor="whiteAlpha.300"
        borderWidth={1}
        color="white"
        mx={4}
      >
        <ModalHeader borderBottomWidth={1} borderColor="whiteAlpha.200">
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <VStack align="stretch" spacing={4}>
            {children}
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
            CONFIRMAR
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
