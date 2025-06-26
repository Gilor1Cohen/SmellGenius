import { memo } from "react";
import type { FormInputProps } from "../../../types/UI.types";
import "./input.css";

function FormInput<TFieldValues extends object>({
  name,
  register,
  validation,
  type,
  placeholder,
  error,
  defaultValue,
}: FormInputProps<TFieldValues>) {
  return (
    <div className="inputBox">
      <input
        id={String(name)}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
      />
      {error && <p className="inputBox-error">{error.message}</p>}
    </div>
  );
}

export default memo(FormInput) as typeof FormInput;
