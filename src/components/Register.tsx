import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { date } from "yup/lib/locale";
import User from "../interfaces/User";
import { errorMessage, successMessage as successMsg } from "../services/FeedbackService";
import { addUser } from "../services/userServices";
interface RegisterProps {
    isLogin: boolean;
    setIsLogIn: Function;
}

const Register: FunctionComponent<RegisterProps> = ({ setIsLogIn }) => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: { email: "", password: "", name: "" },
        validationSchema: yup.object({
            name: yup.string().required().min(2),
            email: yup.string().required().email().min(5),
            password: yup.string().required().min(8),
        }),
        onSubmit: (values: User) => {
            addUser(values)
                .then(() => {
                    navigate("/home");
                    sessionStorage.setItem(
                        "userData",
                        JSON.stringify({ isLoggedIn: true })
                    );
                    successMsg("You registered successfully!");
                })
                .catch((err) => console.log(err));
        },
    });
    return (
        <div className="container mt-3 col-md-4 text-center">
            <h3 className="display-3">REGISTER</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInputName"
                        placeholder="John"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="floatingInputName">Name</label>
                    {formik.touched.name && formik.errors.name && (
                        <p className="text-danger">{formik.errors.name}</p>
                    )}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-danger">{formik.errors.email}</p>
                    )}
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-danger">{formik.errors.password}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="btn btn-secondary w-100 my-3"
                    disabled={!formik.dirty || !formik.isValid}
                >
                    Register
                </button>
            </form>
            <Link to="/">Already have user? Login here</Link>
        </div>
    );
};

export default Register;