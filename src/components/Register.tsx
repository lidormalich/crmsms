import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import { date } from "yup/lib/locale";
import User from "../interfaces/User";
import { errorMessage, successMessage } from "../services/FeedbackService";
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
            email: yup.string().required().email().min(5),
            password: yup.string().required().min(8),
            name: yup.string().required().min(3),
        }),
        onSubmit: (values: User) => {
            addUser(values)
                .then((res) => {
                    if (res.data.length) {
                        setIsLogIn(true);
                        sessionStorage.setItem("IsLoggedIn", "true");
                        sessionStorage.setItem("userName", res.data[0].name as string);
                        successMessage("You Resgter now and Loged-In :)");
                        navigate('/home')
                    }
                }).catch((e) => {
                    errorMessage("Sorry! Something went wrong... try agin!");
                    console.log(e);
                });
        }
    })

    return (<>
        <div className="container mt-5 col-md-4">
            <h5 className="display-5">Register</h5>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        type="name"
                        className="form-control"
                        id="floatingName"
                        placeholder="name@example.com"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="floatingInput">Name</label>
                    {formik.touched.name && formik.errors.name && (
                        <small className="text-danger">{formik.errors.name}</small>
                    )}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                    {formik.touched.email && formik.errors.email && (
                        <small className="text-danger">{formik.errors.email}</small>
                    )}
                </div>

                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    {formik.touched.password && formik.errors.password && (
                        <small className="text-danger">{formik.errors.password}</small>
                    )}
                </div>
                <button type="submit" className="btn btn-success w-100 my-3"
                    disabled={!formik.isValid || !formik.dirty}>Register</button>
            </form>
            <Link to={"/"}>alreday in system? Log-In now</Link>
        </div>

    </>);
}

export default Register;