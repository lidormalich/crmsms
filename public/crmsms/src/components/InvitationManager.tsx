import { FunctionComponent, useContext } from "react";
import InvitationTable from "./InvitationTable";
import Login from "./Login";
import { isLoginGlobal } from "../App";
import { useTranslation } from "../i18n/useTranslation";


interface InvitationManagerProps {
    peopleChange: boolean;
    setIsLogIn: Function;
    setpeopleChanged: Function;
    refresh: Function;
}

const InvitationManager: FunctionComponent<InvitationManagerProps> = ({ setIsLogIn, peopleChange, setpeopleChanged, refresh }) => {
    let isLogin = useContext<boolean>(isLoginGlobal);
    const t = useTranslation();

    return (<>
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
            {isLogin ? (
                <div className="mx-auto max-w-6xl space-y-6">
                    <div>
                        <h5 className="text-2xl font-semibold text-slate-900">
                            {t.guests.guestsForEvent}
                        </h5>
                        <p className="mt-1 text-sm text-slate-500">
                            {t.guests.viewAddManage}
                        </p>
                    </div>
                    <InvitationTable peopleChanged={peopleChange} setPeopleChanged={setpeopleChanged} refreshDash={refresh} />
                </div>
            ) : (
                <div className="mx-auto max-w-md">
                    <Login setIsLogIn={setIsLogIn} />
                </div>
            )}
        </div>
    </>);
}

export default InvitationManager;