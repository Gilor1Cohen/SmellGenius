import { useContext, useState } from "react";

import { useForm } from "react-hook-form";

import FormInput from "../input/input";
import GoldBtn from "../goldBtn/goldBtn";

import type { EditPasswordProps } from "../../../types/UI.types";
import type {
  editPasswordForm,
  editPasswordRes,
} from "../../../types/Auth.types";

import { UserContext } from "../../../contexts/UserContext";

import axios from "axios";

import "./editPassword.css";

export default function EditPassword({
  setEditPassword,
  editPasswordLoading,
  setEditPasswordLoading,
}: EditPasswordProps) {
  const [editPasswordError, setEditPasswordError] = useState<string | null>(
    null
  );

  const { user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<editPasswordForm>({ mode: "all" });

  const Password = watch("Password");
  const PasswordAgain = watch("PasswordAgain");

  async function onEdit(data: editPasswordForm): Promise<void> {
    try {
      setEditPasswordLoading(true);
      const res = await axios.patch<editPasswordRes>(
        "http://localhost:5174/Auth/EditPassword",
        {
          _id: user?._id,
          NewPassword: data.Password,
        },
        { withCredentials: true }
      );

      if (res.status !== 200) {
        throw new Error("Try again later");
      }

      setEditPassword(false);
    } catch (error) {
      setEditPasswordError("Try again later");
    } finally {
      setEditPasswordLoading(false);
    }
  }

  return (
    <form id="editPasswordForm" onSubmit={handleSubmit(onEdit)}>
      <FormInput
        name="Password"
        type="password"
        register={register}
        placeholder={"Edit your Password"}
        validation={{
          required: "Password is required",
          minLength: { value: 8, message: "Must be at least 8 characters" },
          pattern: {
            value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
            message: "Include at least one uppercase letter and one number",
          },
        }}
        error={errors.Password}
      />

      <FormInput
        name="PasswordAgain"
        type="password"
        register={register}
        placeholder={"Confirm your Password"}
        validation={{
          required: "Please confirm your password",
          minLength: { value: 8, message: "Must be at least 8 characters" },
          validate: (value) =>
            value === Password || "The passwords do not match",
          pattern: {
            value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/,
            message: "Include at least one uppercase letter and one number",
          },
        }}
        error={errors.PasswordAgain}
      />

      <GoldBtn
        text={editPasswordLoading ? "Loading" : "Edit"}
        type="submit"
        isDisabled={
          !isValid || editPasswordLoading || Password !== PasswordAgain
        }
      />

      <p id="Error">{editPasswordError}</p>
    </form>
  );
}
