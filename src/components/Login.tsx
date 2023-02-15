import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { date } from "yup/lib/locale";
import User from "../interfaces/User";
import { errorMessage, successMessage } from "../services/FeedbackService";
import { checkUser } from "../services/userServices";

interface LoginProps {
    setIsLogIn: Function;
}

const Login: FunctionComponent<LoginProps> = ({ setIsLogIn }) => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string().required().email().min(5),
            password: yup.string().required().min(8)
        }),
        onSubmit: (values: User) => {
            checkUser(values)
                .then((res) => {
                    if (res.data.error == false) {
                        setIsLogIn(true);
                        sessionStorage.setItem(
                            "userData",
                            JSON.stringify({ isLoggedIn: true })
                        );
                        successMessage("You Loged-In :)");
                        navigate('/');
                    }
                    else { navigate('/'); errorMessage("Wrong info"); }
                }).catch((e) => { errorMessage("Wrong info"); console.log(e); }
                );
        }
    })

    return (<>
        <div className="container mt-5 col-md-4">
            <h5 className="display-5">Login</h5>
            <form onSubmit={formik.handleSubmit}>
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
                    disabled={!formik.isValid || !formik.dirty}>Login</button>
            </form>
            <Link to={"/register"}>It took a moment for her to register the truth. <i className="fa-solid fa-face-smile-wink"></i></Link>

        </div>

    </>);
}

export default Login;