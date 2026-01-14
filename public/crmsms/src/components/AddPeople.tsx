import { FunctionComponent, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { successMessage } from "../Services/FeedbackService";
import People from "../interfaces/People";
import { addPeopleToEvent } from "../Services/eventServices";
import { getAllGroup } from "../Services/GroupServices";
import Group from "../interfaces/Group";
import { useParams } from "react-router-dom";
import GloabSeclModal from "./GloabSeclModal";
import FormField from "./ui/FormField";
import UIButton from "./ui/Button";
import CustomSelect, { SelectOption as SelectOptionType } from "./ui/SelectOption";
import { useTranslation } from "../i18n/useTranslation";

interface AddPeopleProps {
    setpeopleChanged: Function;
    peopleChange: boolean;
}

const AddPeople: FunctionComponent<AddPeopleProps> = ({ setpeopleChanged, peopleChange }) => {
    let [allGroup, setAllGroup] = useState<Group[]>([]);
    let [openSecModal, setOpenSecModal] = useState<boolean>(false);
    let { eventId } = useParams();
    const t = useTranslation();

    useEffect(() => {
        getAllGroup(eventId as string)
            .then((res) => setAllGroup(res.data))
            .catch((e) => console.log(e));
    }, [eventId]);

    let formik = useFormik({
        initialValues: { 
            phoneNumber: "", 
            firstName: "", 
            lastName: "", 
            NumberOfGuests: 0, 
            NumberOfGuestsAccept: 0, 
            eventGroupName: "" 
        },
        validationSchema: yup.object({
            phoneNumber: yup.string().required().min(2),
            firstName: yup.string().required().min(2),
            lastName: yup.string().required().min(2),
            NumberOfGuests: yup.number().required().positive(),
            eventGroupName: yup.string().required(),
        }),
        onSubmit: (values: People, { resetForm }) => {
            addPeopleToEvent(eventId as string, values)
                .then((res) => {
                    successMessage(t.guests.peopleAdded);
                    resetForm();
                    setpeopleChanged(!peopleChange);
                })
                .catch((e) => console.log(e));
        }
    });

    return (
        <>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
                {/* Header */}
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
                        <i className="fa-solid fa-user-plus text-xl text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{t.guests.addNewGuest}</h3>
                        <p className="text-sm text-slate-500">{t.guests.fillGuestDetails}</p>
                    </div>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    {/* Phone Number */}
                    <FormField
                        label={t.guests.phoneNumber}
                        type="tel"
                        id="phoneNumber"
                        placeholder="050-0000000"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phoneNumber && formik.errors.phoneNumber ? String(formik.errors.phoneNumber) : undefined}
                        leftIcon={<i className="fa-solid fa-phone text-slate-400" />}
                    />

                    {/* First & Last Name */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                            label={t.guests.firstName}
                            id="firstName"
                            placeholder="Harry"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && formik.errors.firstName ? String(formik.errors.firstName) : undefined}
                            leftIcon={<i className="fa-solid fa-user text-slate-400" />}
                        />
                        <FormField
                            label={t.guests.lastName}
                            id="lastName"
                            placeholder="Potter"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && formik.errors.lastName ? String(formik.errors.lastName) : undefined}
                            leftIcon={<i className="fa-solid fa-user text-slate-400" />}
                        />
                    </div>

                    {/* Group Selection */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                            <label
                                htmlFor="eventGroupName"
                                className="text-sm font-semibold text-slate-700"
                            >
                                {t.guests.group}
                            </label>
                            <button
                                type="button"
                                className="group inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-all hover:scale-105 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
                                onClick={() => setOpenSecModal(true)}
                            >
                                <i className="fa-solid fa-plus text-[10px]" />
                                {t.guests.addGroup}
                            </button>
                        </div>
                        <CustomSelect
                            options={allGroup.map((group: Group) => ({
                                label: group.eventGroupName,
                                value: group.eventGroupName,
                            }))}
                            value={
                                formik.values.eventGroupName
                                    ? {
                                          label: formik.values.eventGroupName,
                                          value: formik.values.eventGroupName,
                                      }
                                    : undefined
                            }
                            onChange={(option) => {
                                formik.setFieldValue("eventGroupName", option.value);
                                formik.setFieldTouched("eventGroupName", true);
                            }}
                            placeholder={t.guests.group}
                            error={
                                formik.touched.eventGroupName && formik.errors.eventGroupName
                                    ? String(formik.errors.eventGroupName)
                                    : undefined
                            }
                        />
                    </div>

                    {/* Number of Guests */}
                    <FormField
                        label={t.guests.numberOfGuests}
                        type="number"
                        id="NumberOfGuests"
                        placeholder={t.guests.numberOfGuests}
                        name="NumberOfGuests"
                        value={formik.values.NumberOfGuests}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.NumberOfGuests && formik.errors.NumberOfGuests ? String(formik.errors.NumberOfGuests) : undefined}
                        leftIcon={<i className="fa-solid fa-users text-slate-400" />}
                    />

                    {/* Submit Button */}
                    <UIButton
                        type="submit"
                        className="mt-6 w-full"
                        disabled={!formik.isValid || !formik.dirty}
                        leftIcon={<i className="fa-solid fa-plus" />}
                    >
                        {t.guests.addNewGuest}
                    </UIButton>
                </form>
            </div>

            <GloabSeclModal 
                show={openSecModal} 
                onHide={() => setOpenSecModal(false)} 
                groupChange={peopleChange} 
                setGroupChanged={setpeopleChanged} 
            />
        </>
    );
};

export default AddPeople;