import { useContext, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import GoldBtn from "../../ui/goldBtn/goldBtn";

import { Link } from "react-router-dom";

import Input from "../../ui/input/input";

import { useForm } from "react-hook-form";
import type { AuthData, AuthRes } from "../../../types/Auth.types";
import axios from "axios";
import { UserContext } from "../../../contexts/UserContext";
import "./AuthPage.css";
import SelectGender from "../../ui/SelectGender/SelectGender";

export default function AuthPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isLogin: boolean = location.pathname === "/LogIn";

  const { setAuth, setUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AuthData>({ mode: "all" });

  async function onFormSubmit(data: AuthData): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post<AuthRes>(
        `http://localhost:5174/Auth/${isLogin ? "LogIn" : "SignUp"}`,
        data,
        { withCredentials: true }
      );
      setAuth(true);

      setUser({
        _id: res.data.data.data._id,
        Name: res.data.data.data.Name,
        YearOfBirth: res.data.data.data.YearOfBirth,
        FavoritePerfumes: res.data.data.data.FavoritePerfumes,
        Gender: res.data.data.data.Gender,
        Email: res.data.data.data.Email,
      });
      navigate("/");
    } catch (error: any) {
      setError(
        error.response.data.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="auth-page">
      <div id="auth-box">
        {isLogin ? (
          <h1 className="auth-h">Log In</h1>
        ) : (
          <h1 className="auth-h">Sign Up</h1>
        )}

        <form id="auth-form" onSubmit={handleSubmit(onFormSubmit)}>
          <Input
            type="email"
            placeholder="Email"
            register={register}
            name="Email"
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
            error={errors.Email}
          />
          <Input
            type="password"
            placeholder="Password"
            register={register}
            name="Password"
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

          {!isLogin && (
            <>
              <Input
                type="text"
                placeholder="Name"
                register={register}
                name="Name"
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
                error={errors.Name}
              />
              <Input
                type="text"
                placeholder="Year of Birth"
                register={register}
                name="YearOfBirth"
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
                error={errors.YearOfBirth}
              />

              <SelectGender
                name="Gender"
                register={register}
                validation={{
                  required: "Gender is required",
                }}
                errors={errors.Gender}
              />
            </>
          )}

          <GoldBtn
            text={loading ? "Loading..." : isLogin ? "Log In" : "Sign Up"}
            type="submit"
            isDisabled={!isValid || loading}
          />

          {error && (
            <p id="error" className="error">
              {error}
            </p>
          )}
        </form>

        {isLogin ? (
          <>
            <p className="auth-page-text">
              Don't have an account?
              <Link
                to="/SignUp"
                className="link"
                onClick={() => {
                  setError(null);
                  reset();
                }}
              >
                Sign Up
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className="auth-page-text">
              Already have an account?
              <Link
                to="/LogIn"
                className="link"
                onClick={() => {
                  setError(null);
                  reset();
                }}
              >
                Log In
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
