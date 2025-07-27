import { useFormik } from "formik";
import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import User from "../interfaces/User";
import { errorMessage, successMessage } from "../Services/FeedbackService";
import { checkUser } from "../Services/userServices";

interface LoginProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

/**
 * Login form component with validation, loading, and error handling
 */
const Login: FunctionComponent<LoginProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: { email: "admin@gmail.com", password: "adminadmin" },
    enableReinitialize: true,
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email is required")
        .email("Invalid email")
        .min(5),
      password: yup.string().required("Password is required").min(8),
    }),
    onSubmit: async (credentials: User) => {
      setIsLoading(true);
      setError(null);
      const toastId = toast.loading("Please wait...", {
        position: toast.POSITION.TOP_CENTER,
      });
      try {
        const res = await checkUser(credentials);
        setIsLoggedIn(true);
        sessionStorage.setItem("IsLoggedIn", "true");
        sessionStorage.setItem("userName", `${res.data.first_name}`);
        sessionStorage.setItem("Authorization", `${res.data.Authorization}`);
        navigate("/");
        toast.update(toastId, {
          render: "You are logged in!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (e) {
        setError("Wrong email or password");
        toast.update(toastId, {
          render: "Wrong info",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className='container mt-5 col-md-4'>
      <h5 className='display-5'>Login</h5>
      <form
        onSubmit={formik.handleSubmit}
        noValidate>
        <div className='form-floating mb-3'>
          <input
            type='email'
            className='form-control'
            id='floatingInput'
            placeholder='name@example.com'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
            autoComplete='username'
          />
          <label htmlFor='floatingInput'>Email address</label>
          {formik.touched.email && formik.errors.email && (
            <small className='text-danger'>{formik.errors.email}</small>
          )}
        </div>
        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='floatingPassword'
            placeholder='Password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isLoading}
            autoComplete='current-password'
          />
          <label htmlFor='floatingPassword'>Password</label>
          {formik.touched.password && formik.errors.password && (
            <small className='text-danger'>{formik.errors.password}</small>
          )}
        </div>
        {error && <div className='alert alert-danger mt-2'>{error}</div>}
        <button
          type='submit'
          className='btn btn-success w-100 my-3'
          disabled={!formik.isValid || isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <Link to={"/register"}>
        Don't have an account? Register here{" "}
        <i className='fa-solid fa-face-smile-wink'></i>
      </Link>
    </div>
  );
};

export default Login;
