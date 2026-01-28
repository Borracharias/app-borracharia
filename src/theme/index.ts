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
      },
      body: {
        bg: "black",
        color: "white",
        fontFamily: "sans-serif",
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
            bg: "black",
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
