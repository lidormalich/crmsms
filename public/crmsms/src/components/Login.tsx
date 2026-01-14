import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import User from "../interfaces/User";
import { errorMessage, successMessage } from "../Services/FeedbackService";
import { checkUser } from "../Services/userServices";
import FormField from "./ui/FormField";
import UIButton from "./ui/Button";
import { useTranslation } from "../i18n/useTranslation";

interface LoginProps {
    setIsLogIn: Function;
}

const Login: FunctionComponent<LoginProps> = ({ setIsLogIn }) => {
    let navigate = useNavigate();
    const t = useTranslation();
    
    let formik = useFormik({
        initialValues: { email: "admin@gmail.com", password: "adminadmin" },
        enableReinitialize: true,
        validationSchema: yup.object({
            email: yup.string().required().email().min(5),
            password: yup.string().required().min(8)
        }),
        onSubmit: (values: User) => {
            const id = toast.loading(t.common.loading, { position: toast.POSITION.TOP_CENTER });
            checkUser(values)
                .then((res) => {
                    setIsLogIn(true);
                    sessionStorage.setItem("IsLoggedIn", "true");
                    sessionStorage.setItem("userName", `${res.data.first_name}`);
                    sessionStorage.setItem("Authorization", `${res.data.Authorization}`);
                    navigate('/');
                    toast.update(id, {
                        render: t.auth.loggedIn, type: "success", isLoading: false,
                        autoClose: 3000,
                    });

                }).catch(e => {
                    navigate('/'); console.log(e);
                    toast.update(id, { render: t.auth.wrongInfo, type: "error", isLoading: false, autoClose: 5000, });

                });
        }
    })

    return (
        <div className="mx-auto mt-12 max-w-md px-4">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-sm">
                <h2 className="mb-1 text-center text-2xl font-semibold text-slate-900">
                    {t.auth.login}
                </h2>
                <p className="mb-6 text-center text-sm text-slate-500">
                    {t.auth.signInToManage}
                </p>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <FormField
                        label={t.auth.email}
                        type="email"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email ? String(formik.errors.email) : undefined}
                        leftIcon={<i className="fa-solid fa-envelope" />}
                    />

                    <FormField
                        label={t.auth.password}
                        type="password"
                        id="floatingPassword"
                        placeholder={t.auth.password}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password ? String(formik.errors.password) : undefined}
                        leftIcon={<i className="fa-solid fa-lock" />}
                    />

                    <UIButton type="submit" className="w-full" disabled={!formik.isValid}>
                        {t.auth.login}
                    </UIButton>
                </form>
            </div>
            <div className="mt-4 text-center text-sm text-slate-600">
                <span>{t.auth.dontHaveAccount} </span>
                <Link
                    to={"/register"}
                    className="font-medium text-blue-600 hover:text-blue-700"
                >
                    {t.auth.registerHere}
                </Link>
            </div>
        </div>
    );
}

export default Login;