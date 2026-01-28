import { Box, Flex, Heading, Button, Image } from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  const router = useRouter();

  return (
    <Box mb={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Image src="/logo.png" alt="Logo" h="40px" objectFit="contain" />
        <Heading size="md" color="green.400">
          {title.toUpperCase()}
        </Heading>
      </Flex>

      <Button
        variant="ghost"
        color="white"
        leftIcon={<ChevronLeft />}
        justifyContent="flex-start"
        px={0}
        w="fit-content"
        onClick={() => router.back()}
        _hover={{ bg: "transparent", color: "gray.300" }}
      >
        voltar
      </Button>
    </Box>
  );
}
