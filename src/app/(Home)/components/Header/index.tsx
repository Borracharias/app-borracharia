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
          src="/logo.png"
          alt="Logo Borracharia"
          fill
          sizes="140px"
          style={{ objectFit: "contain", objectPosition: "left" }}
          priority
        />
      </Box>
      <Button
        onClick={handleLogout}
        rightIcon={<LogOut size={16} />}
        size="sm"
        bg="red.600"
        borderColor="red.600"
        fontWeight="bold"
        color="white"
        _hover={{ bg: "red.700", borderColor: "red.700" }}
      >
        Sair
      </Button>
    </Flex>
  );
}
