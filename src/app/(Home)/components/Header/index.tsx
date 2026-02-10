import { Box, Button, Flex } from "@chakra-ui/react";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const { logout, isLogoutLoading } = useAuth();

  return (
    <Flex justify="space-between" align="center" mb={10}>
      <Box position="relative" w="140px" h="140px">
        <Image
          src="/logo.svg"
          alt="Logo Borracharia"
          fill
          sizes="140px"
          style={{
            objectFit: "contain",
            objectPosition: "left",
            filter:
              "drop-shadow(0 0 10px rgba(255, 255, 255, 0.2)) brightness(1.2) contrast(1.1)",
          }}
          priority
        />
      </Box>
      <Button
        variant="metal-red"
        onClick={() => logout()}
        isLoading={isLogoutLoading}
        rightIcon={<LogOut size={16} />}
        size="sm"
      >
        SAIR
      </Button>
    </Flex>
  );
}
