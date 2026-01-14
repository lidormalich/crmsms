import { FunctionComponent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEventInfoByID, getPeopleInEventByID } from "../Services/eventServices";
import { getDataNew } from "../Services/SMSservices";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import "./invTable.css";
import { errorMessage } from "../Services/FeedbackService";
import { BrowserView, isBrowser } from "react-device-detect";
import People from "../interfaces/People";
import GloablModal from "./GloablModal";
import UIButton from "./ui/Button";
import { useTranslation } from "../i18n/useTranslation";


interface InvitationTableProps {
    peopleChanged: boolean;
    setPeopleChanged: Function;
    refreshDash: Function;
}

const InvitationTable: FunctionComponent<InvitationTableProps> = ({ peopleChanged, setPeopleChanged, refreshDash }) => {
    let [peopleArr, setPeopleArr] = useState<People[]>([]);
    let [weddingInfo, setWeddingInfo] = useState<any>({ uuid: "", campaignName: "", ownerName: "", phone: "", bride: "", groom: "", coupleImage: "" });
    const t = useTranslation();


    // Open Modal
    let [opendeleteModal, setOpendeleteModal] = useState<boolean>(false);
    let [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    let [openGlobalModal, setOpenGlobalModal] = useState<boolean>(false);
    let [idPeople, setIdPepole] = useState<string>("");
    let [peopleItemPhoneNum, setItemPepole] = useState<string>("");

    let refresh = () => {
        setPeopleChanged(!peopleChanged);
        refreshDash();
    }
    let { eventId } = useParams();
    let counter: number = 0;



    useEffect(() => {
        getEventInfoByID(eventId as string).then((res) => setWeddingInfo(res.data)).catch((e) => { console.log(e); errorMessage(t.errors.errorCantGetInfo) })
    }, []);


    useEffect(() => {
        getPeopleInEventByID(eventId as string).then((res) => {
            setPeopleArr(res.data);
        }).catch((e) => console.log(e));
    }, [peopleChanged]);


    let editphone = (phone: string) => {
        var newPhoneStr = phone;
        if (phone.startsWith("+972")) {
            newPhoneStr = phone.slice(4);
        } else
            if (phone.startsWith("05")) {
                newPhoneStr = phone.slice(1);
            }
        return newPhoneStr;
    }

    return (<>
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h5 className="text-lg font-semibold text-slate-900">
                        {peopleArr.length} {t.guests.guests}
                    </h5>
                    <p className="text-xs text-slate-500">
                        {t.guests.manageGuestList}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                    <Link
                        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-1.5 font-medium text-white shadow-sm hover:bg-slate-700"
                        to={`/savethedate/${eventId}`}
                    >
                        {t.guests.saveTheDate}
                    </Link>
                    <Link
                        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-1.5 font-medium text-white shadow-sm hover:bg-slate-700"
                        to={`/invitation/${eventId}`}
                    >
                        {t.guests.onlineInvitation}
                    </Link>
                    <Link
                        className="inline-flex items-center justify-center rounded-full bg-white px-3 py-1.5 font-medium text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50"
                        to={`/importExcel/${eventId}`}
                    >
                        {t.guests.importFromExcel}
                    </Link>
                </div>
            </div>
            {peopleArr.length ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    <BrowserView>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            #
                                        </th>
                                    </BrowserView>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        {t.guests.firstName}
                                    </th>
                                    <BrowserView>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            {t.guests.group}
                                        </th>
                                    </BrowserView>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        {t.guests.phoneNumber}
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        {t.guests.guests}
                                    </th>
                                    <BrowserView>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            SMS
                                        </th>
                                    </BrowserView>
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        {t.common.edit} / {t.common.delete}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {peopleArr.map((people: People) => (
                                    <tr key={counter} className="hover:bg-slate-50">
                                        {isBrowser && (
                                            <td className="px-4 py-3 text-slate-500">{++counter}</td>
                                        )}
                                        <td className="px-4 py-3 text-slate-900">
                                            {`${people.firstName} ${people.lastName}`}
                                        </td>
                                        {isBrowser && (
                                            <td className="px-4 py-3 text-slate-500">
                                                {people.eventGroupName}
                                            </td>
                                        )}
                                        <td className="px-4 py-3 text-slate-600">
                                            {people.phoneNumber}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">
                                            <span
                                                className={
                                                    people.NumberOfGuestsAccept > 0
                                                        ? "text-emerald-600"
                                                        : "text-slate-700"
                                                }
                                            >
                                                {people.NumberOfGuestsAccept}/{people.NumberOfGuests}
                                            </span>
                                        </td>
                                        {isBrowser && (
                                            <td className="px-4 py-3 text-slate-600">
                                                <button
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm hover:bg-slate-700"
                                                    onClick={() => {
                                                        getDataNew(
                                                            people,
                                                            weddingInfo.groom,
                                                            weddingInfo.bride,
                                                            eventId as string
                                                        );
                                                    }}
                                                >
                                                    <i className="fa-solid fa-comment-sms" />
                                                </button>
                                            </td>
                                        )}
                                        <td className="px-4 py-3 text-slate-600">
                                            <button
                                                className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200 hover:bg-emerald-100"
                                                onClick={() => {
                                                    setItemPepole(people.phoneNumber);
                                                    setOpenUpdateModal(true);
                                                }}
                                            >
                                                <i className="fa-solid fa-pen" />
                                            </button>
                                            <button
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-1 ring-rose-200 hover:bg-rose-100"
                                                onClick={() => {
                                                    setItemPepole(people.phoneNumber);
                                                    setOpendeleteModal(true);
                                                }}
                                            >
                                                <i className="fa-solid fa-trash-can" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <h3 className="text-sm text-slate-500">{t.guests.noGuestsYet}</h3>
            )}
        </div>
        <div className="mt-4">
            <UIButton
                className="w-full sm:w-1/3"
                variant="secondary"
                onClick={() => setOpenGlobalModal(true)}
                leftIcon={<i className="fa-solid fa-user-plus" />}
            >
                {t.guests.addPeople}
            </UIButton>
        </div>
        <DeleteModal show={opendeleteModal} onHide={() => setOpendeleteModal(false)} phoneNum={peopleItemPhoneNum} eventId={eventId as string} refresh={() => refresh()} />
        <GloablModal show={openGlobalModal} onHide={() => setOpenGlobalModal(false)} refresh={() => refresh()} setpeopleChanged={setPeopleChanged} peopleChange={peopleChanged} />
        <UpdateModal show={openUpdateModal} onHide={() => setOpenUpdateModal(false)} eventId={eventId as string} phoneNum={peopleItemPhoneNum} refresh={() => refresh()} />
    </>);
}

export default InvitationTable;