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
        <Heading size="lg" color="whiteAlpha.900">
          {title.toUpperCase()}
        </Heading>
        <Image src="/logo.png" alt="Logo" h="90px" objectFit="contain" />
        
      </Flex>

      <Button
        variant="metal-white"
        color="black"
        leftIcon={<ChevronLeft className="w-4 h-4" />}
        justifyContent="flex-start"
        px={3}
        py={13}
        size="xs"
        onClick={() => router.back()}
      >
        VOLTAR
      </Button>
    </Box>
  );
}
