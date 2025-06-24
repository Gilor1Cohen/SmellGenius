import type {
  FieldError,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import type { AuthData } from "./Auth.types";

export interface GoldBtnProps {
  text: string;
  type: "button" | "submit" | "reset";
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface FormInputProps {
  name: keyof AuthData;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  register: UseFormRegister<AuthData>;
  validation: RegisterOptions<AuthData, keyof AuthData>;
  error?: FieldError;
}
