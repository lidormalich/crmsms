import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import User from "../interfaces/User";
import { errorMessage, successMessage as successMsg } from "../Services/FeedbackService";
import { addUser } from "../Services/userServices";
import FormField from "./ui/FormField";
import UIButton from "./ui/Button";
import { useTranslation } from "../i18n/useTranslation";
interface RegisterProps {
    setIsLogIn: Function;
}

const Register: FunctionComponent<RegisterProps> = ({ setIsLogIn }) => {
    let navigate = useNavigate();
    const t = useTranslation();
    
    let formik = useFormik({
        initialValues: { email: "", password: "", first_name: "", last_name: "" },
        validationSchema: yup.object({
            first_name: yup.string().required().min(2),
            last_name: yup.string().required().min(2),
            email: yup.string().required().email().min(5),
            password: yup.string().required().min(8),
        }),
        onSubmit: (values: User) => {
            const id = toast.loading(t.common.loading, { position: toast.POSITION.TOP_CENTER });
            addUser(values)
                .then((res) => {
                    navigate("/");
                    sessionStorage.setItem("IsLoggedIn", "false");
                    toast.update(id, {
                        render: t.auth.registeredSuccessfully, type: "success", isLoading: false,
                        autoClose: 3000,
                    });

                }).catch(err => {
                    console.log(err); errorMessage(err.response.data)
                    toast.update(id, { render: err.response.data, type: "error", isLoading: false, autoClose: 5000, });

                });
        },
    });
    return (
        <div className="mx-auto mt-12 max-w-md px-4">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-sm">
                <h3 className="mb-1 text-center text-2xl font-semibold text-slate-900">
                    {t.auth.createAccount}
                </h3>
                <p className="mb-6 text-center text-sm text-slate-500">
                    {t.auth.registerToStart}
                </p>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <FormField
                        label={t.auth.firstName}
                        id="floatingInputfirstName"
                        placeholder="John"
                        name="first_name"
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                        onBlur={formik.handleBlur}
                        error={formik.touched.first_name && formik.errors.first_name ? String(formik.errors.first_name) : undefined}
                        leftIcon={<i className="fa-solid fa-user" />}
                    />
                    <FormField
                        label={t.auth.lastName}
                        id="floatingInputlastName"
                        placeholder="Doe"
                        name="last_name"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}
                        onBlur={formik.handleBlur}
                        error={formik.touched.last_name && formik.errors.last_name ? String(formik.errors.last_name) : undefined}
                        leftIcon={<i className="fa-solid fa-user" />}
                    />
                    <FormField
                        label={t.auth.email}
                        id="floatingInput"
                        type="email"
                        placeholder="name@example.com"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email ? String(formik.errors.email) : undefined}
                        leftIcon={<i className="fa-solid fa-envelope" />}
                    />
                    <FormField
                        label={t.auth.password}
                        id="floatingPassword"
                        type="password"
                        placeholder={t.auth.password}
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password ? String(formik.errors.password) : undefined}
                        leftIcon={<i className="fa-solid fa-lock" />}
                    />
                    <UIButton
                        type="submit"
                        className="w-full"
                        disabled={!formik.dirty || !formik.isValid}
                    >
                        {t.auth.register}
                    </UIButton>
                </form>
            </div>
            <div className="mt-4 text-center text-sm text-slate-600">
                <span>{t.auth.alreadyHaveAccount} </span>
                <Link to="/" className="font-medium text-blue-600 hover:text-blue-700">
                    {t.auth.loginHere}
                </Link>
            </div>
        </div>
    );
};

export default Register;