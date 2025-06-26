import type { SelectGenderProps } from "../../../types/UI.types";
import type { FieldValues } from "react-hook-form";
import "./SelectGender.css";

export default function SelectGender<TFieldValues extends FieldValues>({
  name,
  register,
  validation,
  errors,
}: SelectGenderProps<TFieldValues>) {
  return (
    <div className="select">
      <select id="gender-box" defaultValue="" {...register(name, validation)}>
        <option value="" hidden disabled>
          Select Gender
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      {errors && <p className="Gender-error">{errors.message}</p>}
    </div>
  );
}
