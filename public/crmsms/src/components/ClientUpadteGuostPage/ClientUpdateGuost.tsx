import { FunctionComponent, useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import People from "../../interfaces/People";
import { successMessage } from "../../Services/FeedbackService";
import { updatePeopleInEvent } from "../../Services/eventServices";
import FormField from "../ui/FormField";
import UIButton from "../ui/Button";
import Card from "../ui/Card";
import { useTranslation } from "../../i18n/useTranslation";

interface ClientUpdateGuostProps {
    people: People;
}

const ClientUpdateGuost: FunctionComponent<ClientUpdateGuostProps> = ({ people }) => {
    let { eventId } = useParams();
    let [pepoleCount, setPepoleCount] = useState<number>(people.NumberOfGuestsAccept);
    const t = useTranslation();

    let formik = useFormik({
        initialValues: {
            phoneNumber: people?.phoneNumber,
            firstName: people?.firstName,
            lastName: people?.lastName,
            NumberOfGuests: people?.NumberOfGuests,
            NumberOfGuestsAccept: pepoleCount,
            eventGroupName: people?.eventGroupName
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            NumberOfGuestsAccept: yup.number().required().positive(),
        }),
        onSubmit: (values: People) => {
            updatePeopleInEvent(eventId as string, { ...values, NumberOfGuestsAccept: pepoleCount }).then((res) => {
                successMessage(t.guests.seeYouSoon);
            }).catch((e) => console.log(e));
        }
    });

    return (
        <Card
            title={`${t.client.hi} ${people.firstName}!`}
            description={t.client.confirmHowMany}
            icon={<i className="fa-solid fa-user-check" />}
            iconColor="green"
        >
            <form onSubmit={formik.handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                        {t.client.areYouComing} {people.NumberOfGuests} {t.client.people}?
                    </label>
                    <div className="flex items-center justify-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <button
                            type="button"
                            onClick={() => {
                                if (pepoleCount > 0) setPepoleCount(pepoleCount - 1);
                            }}
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 text-slate-700 transition-colors hover:bg-slate-300"
                        >
                            <i className="fa-solid fa-minus" />
                        </button>
                        <div className="flex flex-col items-center gap-1">
                            <input
                                type="number"
                                className="w-20 border-0 bg-transparent text-center text-2xl font-bold text-slate-900 focus:outline-none"
                                value={pepoleCount}
                                readOnly
                            />
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <i className="fa-solid fa-people-group" />
                                <span>{t.client.people}</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setPepoleCount(pepoleCount + 1)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200 text-slate-700 transition-colors hover:bg-slate-300"
                        >
                            <i className="fa-solid fa-plus" />
                        </button>
                    </div>
                </div>

                <UIButton
                    type="submit"
                    className="w-full"
                    variant="primary"
                    leftIcon={<i className="fa-solid fa-check" />}
                >
                    {t.client.update}
                </UIButton>
            </form>
        </Card>
    );
};

export default ClientUpdateGuost;
