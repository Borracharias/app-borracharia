import { Box, Button, Flex } from "@chakra-ui/react";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { api } from "@/lib/api";

export function Header() {
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
        onClick={handleLogout}
        rightIcon={<LogOut size={16} />}
        size="sm"
      >
        SAIR
      </Button>
    </Flex>
  );
}
