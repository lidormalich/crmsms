import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import User from "../interfaces/User";
import {
  errorMessage,
  successMessage as successMsg,
} from "../Services/FeedbackService";
import { addUser } from "../Services/userServices";
interface RegisterProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Register: FunctionComponent<RegisterProps> = ({ setIsLoggedIn }) => {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: { email: "", password: "", first_name: "", last_name: "" },
    validationSchema: yup.object({
      first_name: yup.string().required().min(2),
      last_name: yup.string().required().min(2),
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values: User) => {
      const id = toast.loading("Please wait...", {
        position: toast.POSITION.TOP_CENTER,
      });
      addUser(values)
        .then((res) => {
          navigate("/");
          sessionStorage.setItem("IsLoggedIn", "false");
          toast.update(id, {
            render: "You registered successfully!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        })
        .catch((err) => {
          console.log(err);
          errorMessage(err.response.data);
          toast.update(id, {
            render: err.response.data,
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        });
    },
  });
  return (
    <div className='container mt-3 col-md-4 text-center'>
      <h3 className='display-3'>REGISTER</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='floatingInputfirstName'
            placeholder='John'
            name='first_name'
            onChange={formik.handleChange}
            value={formik.values.first_name}
            onBlur={formik.handleBlur}
          />
          <label htmlFor='floatingInputfirstName'>First Name</label>
          {formik.touched.first_name && formik.errors.first_name && (
            <p className='text-danger'>{formik.errors.first_name}</p>
          )}
        </div>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='floatingInputlastName'
            placeholder='John'
            name='last_name'
            onChange={formik.handleChange}
            value={formik.values.last_name}
            onBlur={formik.handleBlur}
          />
          <label htmlFor='floatingInputlastName'>Last Name</label>
          {formik.touched.last_name && formik.errors.last_name && (
            <p className='text-danger'>{formik.errors.last_name}</p>
          )}
        </div>
        <div className='form-floating mb-3'>
          <input
            type='email'
            className='form-control'
            id='floatingInput'
            placeholder='name@example.com'
            name='email'
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          <label htmlFor='floatingInput'>Email address</label>
          {formik.touched.email && formik.errors.email && (
            <p className='text-danger'>{formik.errors.email}</p>
          )}
        </div>
        <div className='form-floating'>
          <input
            type='password'
            className='form-control'
            id='floatingPassword'
            placeholder='Password'
            name='password'
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          <label htmlFor='floatingPassword'>Password</label>
          {formik.touched.password && formik.errors.password && (
            <p className='text-danger'>{formik.errors.password}</p>
          )}
        </div>
        <button
          type='submit'
          className='btn btn-secondary w-100 my-3'
          disabled={!formik.dirty || !formik.isValid}>
          Register
        </button>
      </form>
      <Link to='/'>Already have user? Login here</Link>
    </div>
  );
};

export default Register;
