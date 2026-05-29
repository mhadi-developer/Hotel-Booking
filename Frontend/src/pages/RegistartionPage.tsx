import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "../types/schema/registrationFormSchema";

import "../styles/registerForm.css";

import { Link, useNavigate } from "react-router-dom";

import axiosInstance from "../resources/axios.Instance.create";

import {
  Bounce,
  toast,
  ToastContainer,
} from "react-toastify";

const RegisterForm = () => {
  const navigate = useNavigate();

  // ─────────────────────────────────────────────
  // LOCAL STATE
  // ─────────────────────────────────────────────

  const [formValues, setFormValues] =
    useState<RegisterFormData>({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      avatar: "",
    });

  // ─────────────────────────────────────────────
  // REACT HOOK FORM
  // ─────────────────────────────────────────────

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      avatar: "",
    },
  });

  // ─────────────────────────────────────────────
  // HANDLE CHANGE
  // ─────────────────────────────────────────────

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    // Update local state
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update RHF state
    setValue(name as keyof RegisterFormData, value);
  };

  // ─────────────────────────────────────────────
  // SUBMIT
  // ─────────────────────────────────────────────

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      console.log("User Data:", data);

      const response =
        await axiosInstance.post(
          "/register",
          data
        );

      if (
        response.status === 200 ||
        response.status === 201
      ) {
        toast.success(
          "Account created successfully! Redirecting to login..."
        );

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }

      if (response.status === 402) {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────

  return (
    <div className="auth-wrapper d-flex justify-content-center align-items-center min-vh-100">

      <div className="auth-card card border-0 shadow-lg p-4">

        <div className="glow-layer"></div>

        {/* HEADER */}
        <div className="text-center mb-4 position-relative">
          <div className="brand-badge mb-3">
            🏨
          </div>

          <h3 className="fw-bold text-white">
            Create Account
          </h3>

          <p className="text-muted small">
            Join to manage your hotel bookings
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="position-relative"
        >

          {/* FIRST NAME */}
          <div className="mb-3">
            <label className="form-label text-light">
              First Name
            </label>

            <input
              type="text"
              placeholder="John"
              className={`form-control  ${
                errors.firstName
                  ? "is-invalid"
                  : ""
              }`}
              {...register("firstName")}
              name="firstName"
              value={formValues.firstName}
              onChange={handleChange}
            />

            <div className="invalid-feedback">
              {errors.firstName?.message}
            </div>
          </div>

          {/* LAST NAME */}
          <div className="mb-3">
            <label className="form-label text-light">
              Last Name
            </label>

            <input
              type="text"
              placeholder="Doe"
              className={`form-control  ${
                errors.lastName
                  ? "is-invalid"
                  : ""
              }`}
              {...register("lastName")}
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
            />

            <div className="invalid-feedback">
              {errors.lastName?.message}
            </div>
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label text-light">
              Email
            </label>

            <input
              type="email"
              placeholder="john@example.com"
              className={`form-control  ${
                errors.email
                  ? "is-invalid"
                  : ""
              }`}
              {...register("email")}
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />

            <div className="invalid-feedback">
              {errors.email?.message}
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label className="form-label text-light">
              Password
            </label>

            <input
              type="password"
              placeholder="********"
              className={`form-control  ${
                errors.password
                  ? "is-invalid"
                  : ""
              }`}
              {...register("password")}
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />

            <div className="invalid-feedback">
              {errors.password?.message}
            </div>
          </div>

          {/* AVATAR */}
          <div className="mb-3">
            <label className="form-label text-light">
              Avatar URL (optional)
            </label>

            <input
              type="text"
              placeholder="https://image.com/avatar.jpg"
              className={`form-control  ${
                errors.avatar
                  ? "is-invalid"
                  : ""
              }`}
              {...register("avatar")}
              name="avatar"
              value={formValues.avatar || ""}
              onChange={handleChange}
            />

            <div className="invalid-feedback">
              {errors.avatar?.message}
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="btn btn-gradient w-100 py-2 fw-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Creating..."
              : "Create Account"}
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-center mt-3 mb-0 text-muted small">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-info"
          >
            Login
          </Link>
        </p>

      </div>

      {/* TOAST */}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />

    </div>
  );
};

export default RegisterForm;