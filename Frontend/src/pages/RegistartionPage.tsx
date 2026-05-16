import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../types/schema/registrationFormSchema";
import "../styles/registerForm.css"
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../resources/axios.Instance.create";
import { Bounce, toast, ToastContainer } from "react-toastify";

const RegisterForm = () => {

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      avatar: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log("User Data:", data);

    const response = await axiosInstance.post("/register", data);
    if (response.statusText === "OK") {
      toast.success("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        
        navigate("/login");
      }, 2000)
    }
   

    
  };

 return (
  <div className="auth-wrapper d-flex justify-content-center align-items-center min-vh-100">
    <div className="auth-card card border-0 shadow-lg p-4">

      {/* Glow background effect */}
      <div className="glow-layer"></div>

      {/* Header */}
      <div className="text-center mb-4 position-relative">
        <div className="brand-badge mb-3">🏨</div>
        <h3 className="fw-bold text-white">Create Account</h3>
        <p className="text-muted small">
          Join to manage your hotel bookings
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="position-relative">

        {/* Name */}
        <div className="mb-3">
          <label className="form-label text-light">First Name</label>
          <input
            type="text"
            className={`form-control glass-input ${
              errors.firstName ? "is-invalid" : ""
            }`}
            placeholder="John Doe"
            {...register("firstName")}
          />
          <div className="invalid-feedback">
            {errors.firstName?.message}
          </div>
         </div>
         
         <div className="mb-3">
          <label className="form-label text-light">Last Name</label>
          <input
            type="text"
            className={`form-control glass-input ${
              errors.lastName ? "is-invalid" : ""
            }`}
            placeholder="John Doe"
            {...register("lastName")}
          />
          <div className="invalid-feedback">
            {errors.lastName?.message}
          </div>
         </div>

        {/* password */}
        <div className="mb-3">
          <label className="form-label text-light">Password</label>
          <input
            type="password"
            className={`form-control glass-input ${
              errors.password ? "is-invalid" : ""
            }`}
            placeholder="john@example.com"
            {...register("password")}
          />
          <div className="invalid-feedback">
            {errors.password?.message}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label text-light">Email</label>
          <input
            type="email"
            className={`form-control glass-input ${
              errors.email ? "is-invalid" : ""
            }`}
            placeholder="john@example.com"
            {...register("email")}
          />
          <div className="invalid-feedback">
            {errors.email?.message}
          </div>
        </div>
               
        {/* Avatar */}
        <div className="mb-3">
          <label className="form-label text-light">
            Avatar URL (optional)
          </label>
          <input
            type="text"
            className={`form-control glass-input ${
              errors.avatar ? "is-invalid" : ""
            }`}
            placeholder="https://image.com/avatar.jpg"
            {...register("avatar")}
          />
          <div className="invalid-feedback">
            {errors.avatar?.message}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-gradient w-100 py-2 fw-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center mt-3 mb-0 text-muted small">
        Already have an account?{" "}
        <Link to="/login" className="text-info">
          Login
        </Link>
      </p>
     </div>
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