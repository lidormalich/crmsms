import { FunctionComponent, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { successMessage } from "../Services/FeedbackService";
import Event from "../interfaces/EventInterface";
import { addEvent } from "../Services/eventServices";
import { v4 as uuidv4 } from 'uuid';
import { getAllSentences } from "../Services/sentencesServices";
import FormField from "./ui/FormField";
import UIButton from "./ui/Button";
import Card from "./ui/Card";
import CustomSelect, { SelectOption as SelectOptionType } from "./ui/SelectOption";
import { useTranslation } from "../i18n/useTranslation";

interface NewCampaignProps {}

const NewCampaign: FunctionComponent<NewCampaignProps> = () => {
    const [imageSelected, setImageSelected] = useState<any>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [allweddingSentence, setAllweddingSentence] = useState<any[]>([]);
    let navigate = useNavigate();
    let uuidLidor = uuidv4();
    const t = useTranslation();

    let formik = useFormik({
        initialValues: {
            campaignName: "",
            ownerName: "",
            phone: "",
            uuid: uuidLidor,
            bride: "",
            groom: "",
            groomParents: "",
            brideParents: "",
            coupleImage: "",
            weddingSentence: "",
            weddingDate: "",
            eventsHall: ""
        },
        validationSchema: yup.object({
            campaignName: yup.string().required("Campaign name is a required field").min(2),
            bride: yup.string().required("Bride name is a required field").min(2).max(10),
            groom: yup.string().required("Groom name is a required field").min(2).max(10),
            groomParents: yup.string().required("Groom Parents name is a required field").min(2).max(30),
            brideParents: yup.string().required("Bride Parents name is a required field").min(2).max(30),
            phone: yup.number().required("Phone number is a required field").min(10).positive(),
            eventsHall: yup.string().required("Events Hall is a required field").min(3),
            weddingSentence: yup.string().required(),
            weddingDate: yup.date().required(),
            ownerName: yup.string().required("Owner Campaign is a required field").min(2)
        }),
        onSubmit: (values: Event, { resetForm }) => {
            const Authorization = sessionStorage.getItem("Authorization");
            addEvent(values, Authorization as string)
                .then((res) => {
                    successMessage(t.campaigns.createCampaign);
                    resetForm();
                    formik.setFieldValue("phone", "");
                    localStorage.removeItem("uuid");
                    localStorage.setItem("uuid", JSON.stringify(res.data._id));
                    navigate(`/campaign/${res.data._id}`);
                })
                .catch((e) => console.log(e));
        }
    });

    useEffect(() => {
        getAllSentences().then(res => setAllweddingSentence(res.data));
        formik.setFieldValue("phone", "");
    }, []);

    return (
        <div className="w-full max-w-4xl px-4 py-6">
            <div className="mx-auto max-w-3xl">
                <Card
                    title={t.campaigns.createNewCampaign}
                    description={t.campaigns.createNewCampaign}
                    icon={<i className="fa-solid fa-plus" />}
                    iconColor="blue"
                >
                    <form onSubmit={formik.handleSubmit} className="space-y-5">
                        {/* Campaign & Owner */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <FormField
                                label={t.campaigns.campaignName}
                                id="campaignName"
                                placeholder="Summer Wedding"
                                name="campaignName"
                                value={formik.values.campaignName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.campaignName && formik.errors.campaignName ? String(formik.errors.campaignName) : undefined}
                                leftIcon={<i className="fa-solid fa-bullhorn text-slate-400" />}
                            />
                            <FormField
                                label={t.campaigns.ownerName}
                                id="ownerName"
                                placeholder="Event owner"
                                name="ownerName"
                                value={formik.values.ownerName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.ownerName && formik.errors.ownerName ? String(formik.errors.ownerName) : undefined}
                                leftIcon={<i className="fa-solid fa-user-tie text-slate-400" />}
                            />
                        </div>

                        {/* Groom & Bride */}
                        <div className="rounded-xl bg-blue-50 p-4">
                            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-900">
                                <i className="fa-solid fa-heart text-xs text-blue-600" />
                                {t.wedding.coupleInformation}
                            </h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    label={t.wedding.groom}
                                    id="groom"
                                    name="groom"
                                    placeholder={t.wedding.groom}
                                    value={formik.values.groom}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.groom && formik.errors.groom ? String(formik.errors.groom) : undefined}
                                    leftIcon={<i className="fa-solid fa-person text-slate-400" />}
                                />
                                <FormField
                                    label={t.wedding.bride}
                                    id="bride"
                                    name="bride"
                                    placeholder={t.wedding.bride}
                                    value={formik.values.bride}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.bride && formik.errors.bride ? String(formik.errors.bride) : undefined}
                                    leftIcon={<i className="fa-solid fa-person-dress text-slate-400" />}
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <FormField
                            label={t.campaigns.ownerPhone}
                            id="phone"
                            type="tel"
                            placeholder="052-555-5555"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && formik.errors.phone ? String(formik.errors.phone) : undefined}
                            leftIcon={<i className="fa-solid fa-phone text-slate-400" />}
                        />

                        {/* Parents */}
                        <div className="rounded-xl bg-purple-50 p-4">
                            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-purple-900">
                                <i className="fa-solid fa-users text-xs text-purple-600" />
                                {t.wedding.parentsInformation}
                            </h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <FormField
                                    label={t.wedding.groomParents}
                                    id="groomParents"
                                    name="groomParents"
                                    placeholder={t.wedding.groomParents}
                                    value={formik.values.groomParents}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.groomParents && formik.errors.groomParents ? String(formik.errors.groomParents) : undefined}
                                    leftIcon={<i className="fa-solid fa-people-roof text-slate-400" />}
                                />
                                <FormField
                                    label={t.wedding.brideParents}
                                    id="brideParents"
                                    name="brideParents"
                                    placeholder={t.wedding.brideParents}
                                    value={formik.values.brideParents}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.brideParents && formik.errors.brideParents ? String(formik.errors.brideParents) : undefined}
                                    leftIcon={<i className="fa-solid fa-people-roof text-slate-400" />}
                                />
                            </div>
                        </div>

                        {/* Events Hall */}
                        <FormField
                            label={t.wedding.eventsHall}
                            id="eventsHall"
                            name="eventsHall"
                            placeholder={t.wedding.eventsHall}
                            value={formik.values.eventsHall}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.eventsHall && formik.errors.eventsHall ? String(formik.errors.eventsHall) : undefined}
                            leftIcon={<i className="fa-solid fa-building text-slate-400" />}
                        />

                        {/* Wedding Sentence Dropdown */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">
                                {t.wedding.weddingSentence}
                            </label>
                            <CustomSelect
                                options={allweddingSentence.map((sentence: any) => ({
                                    label: sentence.weddingSentence,
                                    value: sentence.weddingSentence,
                                }))}
                                value={
                                    formik.values.weddingSentence
                                        ? {
                                              label: formik.values.weddingSentence,
                                              value: formik.values.weddingSentence,
                                          }
                                        : undefined
                                }
                                onChange={(option) => {
                                    formik.setFieldValue("weddingSentence", option.value);
                                    formik.setFieldTouched("weddingSentence", true);
                                }}
                                placeholder={t.wedding.chooseWeddingSentence}
                                error={
                                    formik.touched.weddingSentence && formik.errors.weddingSentence
                                        ? String(formik.errors.weddingSentence)
                                        : undefined
                                }
                            />
                        </div>

                        {/* Wedding Date */}
                        <FormField
                            label={t.wedding.weddingDate}
                            id="weddingDate"
                            type="date"
                            name="weddingDate"
                            value={formik.values.weddingDate as any}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.weddingDate && formik.errors.weddingDate ? String(formik.errors.weddingDate) : undefined}
                            leftIcon={<i className="fa-solid fa-calendar-days text-slate-400" />}
                        />

                        {/* Submit Button */}
                        <UIButton
                            type="submit"
                            className="mt-6 w-full"
                            variant="primary"
                            disabled={!formik.isValid || !formik.dirty}
                            leftIcon={<i className="fa-solid fa-plus" />}
                        >
                            {t.campaigns.createCampaign}
                        </UIButton>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default NewCampaign;