import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import User from "../interfaces/User";
import { errorMessage, successMessage } from "../Services/FeedbackService";
import { checkUser } from "../Services/userServices";

interface LoginProps {
    setIsLogIn: Function;
}

const Login: FunctionComponent<LoginProps> = ({ setIsLogIn }) => {
    let navigate = useNavigate();
    let formik = useFormik({
        initialValues: { email: "admin@gmail.com", password: "adminadmin" },
        enableReinitialize: true,
        validationSchema: yup.object({
            email: yup.string().required().email().min(5),
            password: yup.string().required().min(8)
        }),
        onSubmit: (values: User) => {



            const id = toast.loading("Please wait...", { position: toast.POSITION.TOP_CENTER });
            checkUser(values)
                .then((res) => {
                    setIsLogIn(true);
                    sessionStorage.setItem("IsLoggedIn", "true");
                    sessionStorage.setItem("userName", `${res.data.first_name}`);
                    sessionStorage.setItem("Authorization", `${res.data.Authorization}`);
                    navigate('/');
                    toast.update(id, {
                        render: "You Loged-In :)", type: "success", isLoading: false,
                        autoClose: 3000,
                    });

                }).catch(e => {
                    navigate('/'); console.log(e);
                    toast.update(id, { render: "Wrong info", type: "error", isLoading: false, autoClose: 5000, });

                });
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
                    disabled={!formik.isValid
                        // || !formik.dirty
                    }>Login</button>
            </form>
            <Link to={"/register"}>It took a moment for her to register the truth. <i className="fa-solid fa-face-smile-wink"></i></Link>

        </div>

    </>);
}

export default Login;