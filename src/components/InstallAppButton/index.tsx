"use client";

import { useEffect, useState } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { Download } from "lucide-react";

export function InstallAppButton(props: ButtonProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detecta se é iOS
    const isIosDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIosDevice);

    // Captura o evento beforeinstallprompt (Android/Desktop Chrome)
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  // Se for iOS, não mostramos botão automático pois a API não suporta.
  // Poderíamos mostrar um modal com instruções (Share -> Add to Home Screen),
  // mas por enquanto vamos focar no fluxo padrão Android/Chrome.
  if (!deferredPrompt && !isIOS) return null;

  // Se for iOS ou se já estiver instalado (standalone), também podemos esconder ou adaptar.
  // Para simplificar, vamos exibir apenas se tivermos o prompt capturado (Android/Chrome).
  if (!deferredPrompt) return null;

  return (
    <Button
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
  );
}
