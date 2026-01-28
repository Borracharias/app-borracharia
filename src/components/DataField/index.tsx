import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Checkbox,
  FormErrorMessage,
  InputProps,
  SelectProps,
  TextareaProps,
  CheckboxProps,
  FormControlProps,
} from "@chakra-ui/react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { ReactNode } from "react";

interface DataFieldProps extends FormControlProps {
  label?: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  type?: "text" | "number" | "select" | "textarea" | "password" | "email" | "checkbox";
  options?: { value: string | number; label: string }[];
  placeholder?: string;
  inputProps?: InputProps;
  selectProps?: SelectProps;
  textareaProps?: TextareaProps;
  checkboxProps?: CheckboxProps;
  children?: ReactNode;
}

export function DataField({
  label,
  error,
  register,
  type = "text",
  options,
  placeholder,
  inputProps,
  selectProps,
  textareaProps,
  checkboxProps,
  children,
  ...rest
}: DataFieldProps) {
  const isCheckbox = type === "checkbox";

  if (isCheckbox) {
    return (
      <FormControl isInvalid={!!error} display="flex" alignItems="center" {...rest}>
        <Checkbox
          colorScheme="green"
          {...register}
          {...checkboxProps}
        >
          {label}
        </Checkbox>
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </FormControl>
    );
  }

  return (
    <FormControl isInvalid={!!error} {...rest}>
      {label && <FormLabel>{label}</FormLabel>}
      
      {type === "select" ? (
        <Select
          placeholder={placeholder}
          {...register}
          sx={{ "> option": { bg: "gray.800", color: "white" } }}
          {...selectProps}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </Select>
      ) : type === "textarea" ? (
        <Textarea
          placeholder={placeholder}
          {...register}
          {...textareaProps}
        />
      ) : (
        <Input
          type={type}
          placeholder={placeholder}
          {...register}
          {...inputProps}
        />
      )}
      
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}
