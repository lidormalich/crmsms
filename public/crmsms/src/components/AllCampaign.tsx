import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isLoginGlobal } from "../App";
import EventInterface from "../interfaces/EventInterface";
import { getAllEvent } from "../Services/eventServices";
import Loading from "./Extra/Loading";
import NotHaveAccess from "./Extra/NotHaveAccess";
import DeleteCMP from "./DeleteCMP";
import DataTable, { Column } from "./ui/DataTable";
import { useTranslation } from "../i18n/useTranslation";

interface AllCampaignProps {}

const AllCampaign: FunctionComponent<AllCampaignProps> = () => {
    let [allEvent, setAllEvent] = useState<EventInterface[]>([]);
    let [opendeleteModal, setOpendeleteModal] = useState<boolean>(false);
    let [userRefresh, setuserRefresh] = useState<boolean>(false);
    let [eventID, setEventID] = useState<string>("");

    let isLogin = useContext<boolean>(isLoginGlobal);
    const t = useTranslation();

    useEffect(() => {
        getAllEvent(sessionStorage.getItem("Authorization") as string)
            .then((res) => setAllEvent(res.data))
            .catch((e) => console.log(e));
    }, [userRefresh]);

    let refresh = () => {
        setuserRefresh(!userRefresh);
    };

    const columns: Column<EventInterface>[] = [
        {
            id: "index",
            header: "#",
            className: "w-16",
            cell: (_row, index) => (
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-600">
                    {index + 1}
                </span>
            ),
        },
        {
            id: "name",
            header: t.campaigns.campaignName,
            cell: (row) => (
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30">
                        <i className="fa-solid fa-bullhorn text-sm text-white" />
                    </div>
                    <span className="font-medium text-slate-900">{row.campaignName}</span>
                </div>
            ),
        },
        {
            id: "manage",
            header: t.common.edit,
            className: "w-32",
            cell: (row) => (
                <Link
                    to={`/campaign/${row._id}`}
                    className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 px-4 py-2 text-xs font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
                >
                    <span>{t.common.edit}</span>
                    <i className="fa-solid fa-arrow-right text-[10px] transition-transform group-hover:translate-x-0.5" />
                </Link>
            ),
        },
        {
            id: "delete",
            header: t.common.delete,
            className: "w-32",
            cell: (row) => (
                <button
                    onClick={() => {
                        setEventID(row._id as string);
                        setOpendeleteModal(true);
                    }}
                    className="group inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-600 shadow-sm transition-all hover:scale-105 hover:border-red-300 hover:bg-red-100 hover:shadow-md"
                >
                    <i className="fa-solid fa-trash-can text-[10px] transition-transform group-hover:scale-110" />
                    <span>{t.common.delete}</span>
                </button>
            ),
        },
    ];

    return (
        <>
            {!isLogin ? (
                <NotHaveAccess />
            ) : (
                <div className="w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl space-y-6">
                        {/* Header Section */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
                                    <i className="fa-solid fa-list-check text-2xl text-white" />
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold text-slate-900">
                                        {t.campaigns.allCampaigns}
                                    </h1>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {t.campaigns.manageCampaigns}
                                    </p>
                                </div>
                                <Link
                                    to="/newcampaign"
                                    className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-green-500 to-green-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-green-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-green-500/40"
                                >
                                    <i className="fa-solid fa-plus text-xs" />
                                    <span>{t.campaigns.newCampaign}</span>
                                </Link>
                            </div>
                        </div>

                        {/* Table Section */}
                        {allEvent.length ? (
                            <div className="rounded-2xl border border-slate-200 bg-white shadow-md">
                                <DataTable<EventInterface>
                                    columns={columns}
                                    data={allEvent}
                                    emptyMessage={t.campaigns.noCampaigns}
                                />
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-slate-200 bg-white p-12 shadow-md">
                                <div className="flex flex-col items-center justify-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                                        <i className="fa-solid fa-inbox text-2xl text-slate-400" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold text-slate-900">{t.campaigns.noCampaignsYet}</h3>
                                        <p className="mt-1 text-sm text-slate-500">
                                            {t.campaigns.getStarted}
                                        </p>
                                    </div>
                                    <Link
                                        to="/newcampaign"
                                        className="group mt-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
                                    >
                                        <i className="fa-solid fa-plus text-xs" />
                                        <span>{t.campaigns.createCampaign}</span>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    <DeleteCMP
                        show={opendeleteModal}
                        onHide={() => setOpendeleteModal(false)}
                        eventId={eventID as string}
                        refresh={refresh}
                    />
                </div>
            )}
        </>
    );
};

export default AllCampaign;