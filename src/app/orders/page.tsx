"use client";

import { Suspense } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import { OrderContent } from "./components/OrderContent";

export default function OrderPage() {
  return (
    <Suspense
      fallback={
        <Center h="100vh">
          <Spinner size="xl" color="blue.500" />
        </Center>
      }
    >
      <OrderContent />
    </Suspense>
  );
}
