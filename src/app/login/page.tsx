"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  Heading,
  Container,
} from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, type LoginForm } from "./schema";

export default function LoginPage() {
  const { login, isLoginLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    login(data);
  };

  return (
    <Container
      maxW="container.sm"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="white"
    >
      <Box
        w="full"
        p={8}
        bg="linear-gradient(180deg, #0F2A44 0%, #0B3C6D 45%, #061B33 100%)"
        borderWidth={1}
        borderRadius="2xl"
        borderColor="white"
      >
        <VStack spacing={6} as="form" onSubmit={handleSubmit(onSubmit)}>
          <Box position="relative" w="200px" h="80px">
            <Image
              src="/logo.png"
              alt="Logo Borracharia"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </Box>

          <Heading size="lg" display="none">
            Login
          </Heading>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              {...register("email")}
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              autoFocus
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Senha</FormLabel>
            <Input
              {...register("password")}
              type="password"
              placeholder="******"
              autoComplete="current-password"
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            color="black"
            width="full"
            isLoading={isLoginLoading}
            variant="metal-white"
          >
            Entrar
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}
