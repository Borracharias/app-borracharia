"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Button,
  ButtonProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import { Download, Share, PlusSquare } from "lucide-react";

/**
 * Tipagem do evento beforeinstallprompt (não existe no DOM lib por padrão)
 */
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function InstallAppButton(props: ButtonProps) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // ✅ iOS é derivado (não precisa de state)
  const isIOS = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as unknown as { MSStream?: unknown }).MSStream
    );
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      onOpen();
      return;
    }

    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  // Android/Desktop: só mostra quando tiver prompt
  // iOS: mostra sempre (não existe beforeinstallprompt)
  if (!deferredPrompt && !isIOS) return null;

  return (
    <>
      <Button
        type="button"
        leftIcon={<Download size={18} />}
        onClick={handleInstallClick}
        variant="outline"
        colorScheme="whiteAlpha"
        color="white"
        size="sm"
        w="full"
        {...props}
      >
        Instalar App
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
        <ModalOverlay />
        <ModalContent mx={4} my="auto">
          <ModalHeader>Instalar no iPhone</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="start">
              <Text>
                Para instalar este aplicativo no seu iPhone, siga os passos:
              </Text>

              <Box display="flex" alignItems="center" gap={2}>
                <Text fontWeight="bold">1.</Text>
                <Text>Toque no botão de compartilhamento</Text>
                <Share size={20} />
                <Text>na barra inferior.</Text>
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <Text fontWeight="bold">2.</Text>
                <Text>Role para baixo e toque em</Text>
                <Text fontWeight="bold">Adicionar à Tela de Início</Text>
                <PlusSquare size={20} />
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
