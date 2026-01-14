import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import Group from "../../interfaces/Group";
import { successMessage } from "../../Services/FeedbackService";
import { addNewGroup } from "../../Services/GroupServices";
import FormField from "../ui/FormField";
import UIButton from "../ui/Button";
import Card from "../ui/Card";
import { useTranslation } from "../../i18n/useTranslation";

interface AddGroupProps {
    onHide: Function;
}

const AddGroup: FunctionComponent<AddGroupProps> = ({ onHide }) => {
    let { eventId } = useParams();
    const t = useTranslation();

    let formik = useFormik({
        initialValues: { eventGroupName: "" },
        validationSchema: yup.object({
            eventGroupName: yup.string().required().min(2).max(25),
        }),
        onSubmit: (values: any, { resetForm }) => {
            addNewGroup(eventId as string, values).then((res) => {
                successMessage(t.modals.groupAdded);
                resetForm();
                onHide();
            }).catch((e) => console.log(e));
        }
    });

    return (
        <Card
            title={t.modals.addGroup}
            icon={<i className="fa-solid fa-users" />}
            iconColor="purple"
        >
            <form onSubmit={formik.handleSubmit} className="space-y-5">
                <FormField
                    label={t.guests.group}
                    id="eventGroupName"
                    placeholder={t.guests.group}
                    name="eventGroupName"
                    value={formik.values.eventGroupName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.eventGroupName && formik.errors.eventGroupName
                            ? String(formik.errors.eventGroupName)
                            : undefined
                    }
                    leftIcon={<i className="fa-solid fa-users text-slate-400" />}
                />

                <UIButton
                    type="submit"
                    className="w-full"
                    variant="primary"
                    disabled={!formik.isValid || !formik.dirty}
                    leftIcon={<i className="fa-solid fa-plus" />}
                >
                    {t.modals.addGroup}
                </UIButton>
            </form>
        </Card>
    );
};

export default AddGroup;
