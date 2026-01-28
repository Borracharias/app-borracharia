import { VStack, StackProps } from "@chakra-ui/react";
import { ReactNode, FormEventHandler } from "react";

interface DataFormProps extends StackProps {
  children: ReactNode;
  onSubmit?: FormEventHandler<HTMLDivElement>;
}

export function DataForm({ children, onSubmit, ...props }: DataFormProps) {
  return (
    <VStack
      as="form"
      onSubmit={onSubmit}
      spacing={6}
      align="stretch"
      {...props}
    >
      {children}
    </VStack>
  );
}
