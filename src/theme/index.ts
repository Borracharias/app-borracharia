import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  styles: {
    global: {
      "html, body": {
        fontSize: { base: "sm", md: "md" },
        height: "100%",
      },
      body: {
        bg: "linear-gradient(180deg, #0F2A44 0%, #0B3C6D 45%, #061B33 100%)",
        bgAttachment: "fixed",
        bgRepeat: "no-repeat",
        color: "white",
        fontFamily: "var(--font-roboto), sans-serif",
        minHeight: "100dvh",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        rounded: "xl",
        fontWeight: "normal",
      },
      variants: {
        outline: {
          border: "1px solid white",
          color: "white",
          _hover: {
            bg: "whiteAlpha.200",
          },
        },
        solid: {
          bg: "white",
          color: "black",
          _hover: {
            bg: "gray.200",
          },
        },
        ghost: {
          color: "white",
          _hover: {
            bg: "whiteAlpha.200",
          },
        },
        "metal-blue-dark": {
          position: "relative",
          overflow: "hidden",
          bg: "linear-gradient(180deg, #0F2A44 0%, #0B3C6D 45%, #061B33 100%)",
          color: "#ffffff",
          borderRadius: "14px",
          padding: "14px 20px",
          fontWeight: "600",
          letterSpacing: "0.5px",
          boxShadow:
            "inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 6px 18px rgba(0, 0, 0, 0.6)",
          transition: "all 0.2s ease",
          _hover: {
            bg: "linear-gradient(180deg, #163D63 0%, #105294 45%, #0A2647 100%)",
            transform: "translateY(-1px)",
          },
        },
        "metal-white": {
          bg: "linear-gradient(180deg, #FFFFFF 0%, #E6E8EB 45%, #BFC3C9 100%)",
          color: "#1A1A1A",
          // border: "1px solid #C9CDD3",
          borderRadius: "14px",
          fontWeight: "600",
          boxShadow:
            "inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(0, 0, 0, 0.08), 0 6px 16px rgba(0, 0, 0, 0.25)",
          transition: "all 0.2s ease",
          _hover: {
            bg: "linear-gradient(180deg, #FFFFFF 0%, #F0F2F5 45%, #CDD1D6 100%)",
            transform: "translateY(-1px)",
          },
        },
        "metal-red": {
          bg: "linear-gradient(180deg, #E36A6A 0%, #B11212 45%, #5A0505 100%)",
          color: "#FFFFFF",
          borderRadius: "14px",
          fontWeight: "600",
          boxShadow:
            "inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 0 rgba(0, 0, 0, 0.4), 0 6px 18px rgba(0, 0, 0, 0.45)",
          transition: "all 0.2s ease",
          _hover: {
            bg: "linear-gradient(180deg, #F07F7F 0%, #C51616 45%, #6E0707 100%)",
            transform: "translateY(-1px)",
          },
        },
      },
      defaultProps: {
        variant: "outline",
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: "transparent",
            borderColor: "white",
            borderWidth: "1px",
            rounded: "xl",
            _hover: { borderColor: "gray.300" },
            _focus: { borderColor: "white", boxShadow: "none" },
            _placeholder: { color: "gray.500" },
          },
        },
      },
      defaultProps: {
        variant: "outline",
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            bg: "transparent",
            borderColor: "white",
            borderWidth: "1px",
            rounded: "xl",
            _hover: { borderColor: "gray.300" },
            _focus: { borderColor: "white", boxShadow: "none" },
          },
          icon: {
            color: "white",
          },
        },
      },
      defaultProps: {
        variant: "outline",
      },
    },
    Textarea: {
      variants: {
        outline: {
          bg: "transparent",
          borderColor: "white",
          borderWidth: "1px",
          rounded: "xl",
          _hover: { borderColor: "gray.300" },
          _focus: { borderColor: "white", boxShadow: "none" },
        },
      },
    },
  },
});
