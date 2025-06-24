import { memo } from "react";
import type { FormInputProps } from "../../../types/UI.types";

import "./input.css";

const FormInput = memo(function ({
  type,
  placeholder,
  register,
  name,
  error,
  validation,
}: FormInputProps) {
  return (
    <div className="inputBox">
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
});

export default FormInput;
