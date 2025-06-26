import { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import type { AuthRes, User, UserEdit } from "../../../types/Auth.types";

import FormInput from "../../ui/input/input";
import SelectGender from "../../ui/SelectGender/SelectGender";
import GoldBtn from "../../ui/goldBtn/goldBtn";

import axios from "axios";

import { UserContext } from "../../../contexts/UserContext";

import type { EditProfileProps } from "../../../types/UI.types";

import "./editProfile.css";

export default function EditProfile({ setEditUserDetail }: EditProfileProps) {
  const { user, setUser, setAuth } = useContext(UserContext);

  const [editUserLoading, setUserDetailLoading] = useState<boolean>(false);
  const [editUserError, setEditUserError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>({ mode: "all" });

  async function onEdit(data: UserEdit): Promise<void> {
    try {
      setUserDetailLoading(true);

      const res = await axios.patch<AuthRes>(
        "http://localhost:5174/Auth/UpdateUser",
        {
          _id: user?._id,
          ...data,
        },
        { withCredentials: true }
      );

      setUser({
        _id: res.data.data.data._id,
        Name: res.data.data.data.Name,
        YearOfBirth: res.data.data.data.YearOfBirth,
        FavoritePerfumes: res.data.data.data.FavoritePerfumes,
        Gender: res.data.data.data.Gender,
        Email: res.data.data.data.Email,
      });

      setEditUserDetail(false);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;

        if ([400, 500].includes(status)) {
          setEditUserError(
            data.message || "Error while editing, try again later."
          );
        }

        if ([401, 403].includes(status)) {
          setAuth(false);
          setUser(null);
        }
      }
    } finally {
      setUserDetailLoading(false);
    }
  }

  return (
    <form id="ProfileDetailForm" onSubmit={handleSubmit(onEdit)}>
      <p id="ProfileDetailForm-p">
        Edit (Fill in all details, change only the values you want to update)
      </p>
      <FormInput
        name="Name"
        type="text"
        register={register}
        placeholder={"Edit your name"}
        error={errors.Name}
        defaultValue={user?.Name}
        validation={{
          required: "Name is required",
          minLength: {
            value: 2,
            message: "Must be at least 2 characters",
          },
          pattern: {
            value: /^[A-Za-z\u0590-\u05FF ]+$/,
            message: "Name can only contain letters",
          },
        }}
      />

      <FormInput
        name="Email"
        type="email"
        register={register}
        defaultValue={user?.Email}
        placeholder={"Edit your email"}
        error={errors.Email}
        validation={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          },
        }}
      />

      <FormInput
        name="YearOfBirth"
        type="number"
        register={register}
        defaultValue={user?.YearOfBirth}
        placeholder={"Edit your year of birth"}
        error={errors.YearOfBirth}
        validation={{
          required: "Year of Birth is required",
          valueAsNumber: true,
          min: {
            value: 1905,
            message: "Year must be 1905 or later",
          },
          max: {
            value: new Date().getFullYear(),
            message: `Year cannot exceed ${new Date().getFullYear()}`,
          },
        }}
      />

      <SelectGender
        name="Gender"
        register={register}
        validation={{
          required: "Gender is required",
        }}
        errors={errors.Gender}
      />

      <GoldBtn
        text={editUserLoading ? "Loading..." : "Edit"}
        type="submit"
        isDisabled={!isValid}
      />

      {editUserError && <p>{editUserError}</p>}
    </form>
  );
}
