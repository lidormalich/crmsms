import { FunctionComponent, useEffect, useState } from "react";
import * as yup from "yup";
import { successMessage } from "../Services/FeedbackService";
import People from "../interfaces/People";
import { getEventInfoByID, getPeopleInfoByPhone, updatePeopleInEvent } from "../Services/eventServices";
import { useFormik } from "formik";
import Group from "../interfaces/Group";
import { getAllGroup } from "../Services/GroupServices";
import { getDataNew } from "../Services/SMSservices";
import GloabSeclModal from "./GloabSeclModal";
import FormField from "./ui/FormField";
import UIButton from "./ui/Button";
import CustomSelect from "./ui/SelectOption";
import Card from "./ui/Card";
import { useTranslation } from "../i18n/useTranslation";


interface UpdatePeopleToInvitationProps {
    eventId: string;
    phoneNum: string;
    refresh: Function;
    onHide: Function;
}

const UpdatePeopleToInvitation: FunctionComponent<UpdatePeopleToInvitationProps> = ({ eventId, refresh, onHide, phoneNum }) => {
    let [people, setpoepole] = useState<People>({ phoneNumber: "", firstName: "", lastName: "", NumberOfGuests: 0, NumberOfGuestsAccept: 0, eventGroupName: "" });
    let [weddingInfo, setWeddingInfo] = useState<any>({});
    let [allGroup, setAllGroup] = useState<Group[]>([]);
    let [openSecModal, setOpenSecModal] = useState<boolean>(false);
    const t = useTranslation();
    useEffect(() => {
        getEventInfoByID(eventId as string).then(res => setWeddingInfo(res.data))
        getPeopleInfoByPhone(eventId, phoneNum)
            .then((res) => setpoepole(res.data))
            .catch((e) => console.log(e));
        getAllGroup(eventId).then((res) => setAllGroup(res.data)).catch((e) => console.log(e));
    }, [eventId, phoneNum]);

    let formik = useFormik({
        initialValues: { phoneNumber: people?.phoneNumber, firstName: people?.firstName, lastName: people?.lastName, NumberOfGuests: people?.NumberOfGuests, NumberOfGuestsAccept: people?.NumberOfGuestsAccept, eventGroupName: people?.eventGroupName },
        enableReinitialize: true,
        validationSchema: yup.object({
            phoneNumber: yup.string().required().min(2),
            firstName: yup.string().required().min(2),
            lastName: yup.string().required().min(2),
            NumberOfGuests: yup.number().required().positive(),
            NumberOfGuestsAccept: yup.number().required().moreThan(-1),
            eventGroupName: yup.string().required()
        }),
        onSubmit: (values: People) => {
            updatePeopleInEvent(eventId, values).then((res) => {
                onHide();
                successMessage(t.guests.peopleDataChanged);
                refresh();
            })
                .catch((e) => console.log(e))
        }
    })
    return (
        <>
            <Card
                title={`${t.modals.updateGuest}: ${people.firstName} ${people.lastName}`}
                icon={<i className="fa-solid fa-user-pen" />}
                iconColor="blue"
            >
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
                            placeholder="First name"
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
                            placeholder="Last name"
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
                            <UIButton
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setOpenSecModal(true)}
                                leftIcon={<i className="fa-solid fa-plus" />}
                            >
                                {t.guests.addGroup}
                            </UIButton>
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
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                            label={t.guests.numberOfGuests}
                            type="number"
                            id="NumberOfGuests"
                            placeholder="Number of guests"
                            name="NumberOfGuests"
                            value={formik.values.NumberOfGuests}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.NumberOfGuests && formik.errors.NumberOfGuests
                                    ? String(formik.errors.NumberOfGuests)
                                    : undefined
                            }
                            leftIcon={<i className="fa-solid fa-users text-slate-400" />}
                        />
                        <FormField
                            label={t.guests.numberOfGuestsAccept}
                            type="number"
                            id="NumberOfGuestsAccept"
                            placeholder="Accepted guests"
                            name="NumberOfGuestsAccept"
                            value={formik.values.NumberOfGuestsAccept}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.NumberOfGuestsAccept && formik.errors.NumberOfGuestsAccept
                                    ? String(formik.errors.NumberOfGuestsAccept)
                                    : undefined
                            }
                            leftIcon={<i className="fa-solid fa-user-check text-slate-400" />}
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                        <UIButton
                            type="submit"
                            className="flex-1"
                            variant="primary"
                            leftIcon={<i className="fa-solid fa-floppy-disk" />}
                        >
                            {t.common.save}
                        </UIButton>
                        <UIButton
                            type="button"
                            className="flex-1"
                            variant="secondary"
                            onClick={() => {
                                getDataNew(people, weddingInfo.groom, weddingInfo.bride, eventId as string);
                                onHide();
                            }}
                            leftIcon={<i className="fa-solid fa-comment-sms" />}
                        >
                            {t.guests.sendSMS}
                        </UIButton>
                    </div>
                </form>
            </Card>
            <GloabSeclModal show={openSecModal} onHide={() => setOpenSecModal(false)} />
        </>
    );
}

export default UpdatePeopleToInvitation;