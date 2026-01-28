import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface DataButtonProps extends ButtonProps {
  children: ReactNode;
}

export function DataButton({ children, ...props }: DataButtonProps) {
  return (
    <Button
      type="submit"
      size="lg"
      w="full"
      mt={4}
      bg="green.500"
      border="1px solid"
      borderColor="green.500"
      color="white"
      _hover={{ bg: "green.600", borderColor: "green.600" }}
      {...props}
    >
      {children}
    </Button>
  );
}
