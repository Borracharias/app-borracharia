import { Api } from "./api-client";
import { useAuthStore } from "@/stores/auth-store";
import Cookies from "js-cookie";

export const api = new Api({
  baseUrl: typeof window === "undefined" ? process.env.NEXT_PUBLIC_API_URL : "/api/proxy",
  securityWorker: () => {
    const token = Cookies.get("access_token");
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
  },
  customFetch: async (input, init) => {
    try {
      const response = await fetch(input, {
        ...init,
        credentials: "include", // Permite enviar e receber cookies do backend
      });

      if (response.status === 401) {
        Cookies.remove("access_token");
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
