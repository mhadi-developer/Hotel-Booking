/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/immutability */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router";
import axiosInstance from "../resources/axios.Instance.create";
import { Bounce, ToastContainer , toast } from "react-toastify";

 const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  rememberMe: z.boolean().optional(),
});



type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
const onSubmit = async (data: LoginFormData) => {
  try {
    const response = await axiosInstance.post(
      "/login",
      data
    );

    if (
      response.status === 200 ||
      response.status === 201
    ) {
      toast.success(
        "Login successfully redirecting..."
      );

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }

  } catch (error: any) {

    const message =
      error?.response?.data?.message ||
      "Something went wrong";


    toast.error(message);
  }
};

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #334155 100%)",
      }}
    >
      {/* Background Glow */}
      <div
        className="position-absolute rounded-circle"
        style={{
          width: "350px",
          height: "350px",
          background: "rgba(255,255,255,0.06)",
          top: "-100px",
          left: "-100px",
          filter: "blur(40px)",
        }}
      />

      <div
        className="position-absolute rounded-circle"
        style={{
          width: "300px",
          height: "300px",
          background: "rgba(255,215,0,0.08)",
          bottom: "-80px",
          right: "-80px",
          filter: "blur(40px)",
        }}
      />

      <div
        className="card border-0 shadow-lg p-4 p-md-5"
        style={{
          width: "100%",
          maxWidth: "460px",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          color: "#fff",
        }}
      >
        {/* Logo / Title */}
        <div className="text-center mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center mb-3"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, #f59e0b 0%, #facc15 100%)",
              fontSize: "30px",
            }}
          >
            🏨
          </div>

          <h2 className="fw-bold mb-1">Welcome Back</h2>

          <p className="text-light opacity-75 mb-0">
            Login to your hotel booking account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              className={`form-control form-control-lg ${
                errors.email ? "is-invalid" : ""
              }`}
              style={{
                borderRadius: "14px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
              }}
              {...register("email")}
            />

            {errors.email && (
              <div className="invalid-feedback">
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className={`form-control form-control-lg ${
                errors.password ? "is-invalid" : ""
              }`}
              style={{
                borderRadius: "14px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
              }}
              {...register("password")}
            />

            {errors.password && (
              <div className="invalid-feedback">
                {errors.password.message}
              </div>
            )}
          </div>

          {/* Remember Me */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                {...register("rememberMe")}
              />

              <label
                className="form-check-label text-light opacity-75"
                htmlFor="rememberMe"
              >
                Remember me
              </label>
            </div>

            <button
              type="button"
              className="btn btn-link text-warning text-decoration-none p-0"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn w-100 fw-bold py-3"
            style={{
              borderRadius: "14px",
              background:
                "linear-gradient(135deg, #f59e0b 0%, #facc15 100%)",
              border: "none",
              color: "#111827",
              fontSize: "17px",
              transition: "0.3s ease",
            }}
          >
            {isSubmitting ? "Signing In..." : "Login Account"}
          </button>

          {/* Divider */}
          <div className="text-center my-4">
            <span className="text-light opacity-50">
              ───── or continue with ─────
            </span>
          </div>

          {/* Social Buttons */}
          <div className="row g-2">
            <div className="col-6">
              <button
                type="button"
                className="btn btn-outline-light w-100 py-2"
                style={{ borderRadius: "12px" }}
              >
                Google
              </button>
            </div>

            <div className="col-6">
              <button
                type="button"
                className="btn btn-outline-light w-100 py-2"
                style={{ borderRadius: "12px" }}
              >
                Facebook
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center mt-4 mb-0 text-light opacity-75">
            Don&apos;t have an account?{" "}
            <Link to={"/register"}
              className="fw-bold text-warning"
              style={{ cursor: "pointer" }}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer
position="top-center"
autoClose={5000}
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

