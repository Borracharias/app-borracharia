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
      variant="metal-blue-dark"
      {...props}
    >
      {children}
    </Button>
  );
}
