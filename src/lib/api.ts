import { Api } from "./api-client";
import { useAuthStore } from "@/stores/auth-store";

export const api = new Api({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003",
  customFetch: async (input, init) => {
    try {
      const response = await fetch(input, {
        ...init,
        credentials: "include", // Permite enviar e receber cookies do backend
      });

      if (response.status === 401) {
        useAuthStore.getState().logout();
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.includes("/login")
        ) {
          window.location.href = "/login";
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  },
});
