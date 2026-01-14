import { FunctionComponent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { isLoginGlobal } from "../../../App";
import NotHaveAccess from "../NotHaveAccess";
import UIButton from "../../ui/Button";
import Card from "../../ui/Card";
import { useTranslation } from "../../../i18n/useTranslation";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
    let navigate = useNavigate();
    let isLogin = useContext<boolean>(isLoginGlobal);
    const t = useTranslation();

    if (!isLogin) {
        return <NotHaveAccess />;
    }

    return (
        <div className="mx-auto max-w-md px-4 py-6">
            <Card
                className="relative overflow-hidden"
                icon={<i className="fa-solid fa-user" />}
                iconColor="blue"
            >
                <div className="relative">
                    {/* Badge */}
                    <div className="absolute right-0 top-0 rounded-bl-xl bg-gradient-to-br from-yellow-400 to-yellow-500 px-3 py-1 text-xs font-bold text-slate-900 shadow-md">
                        {t.profile.freeAccount}
                    </div>

                    {/* Profile Image */}
                    <div className="mb-6 flex justify-center">
                        <div className="relative">
                            <img
                                src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max"
                                alt="Profile"
                                className="h-40 w-40 rounded-full border-4 border-blue-500 object-cover shadow-lg"
                            />
                            <div className="absolute inset-0 rounded-full border-4 border-blue-200 opacity-50"></div>
                        </div>
                    </div>

                    {/* User Name */}
                    <div className="mb-4 text-center">
                        <h3 className="text-2xl font-bold text-slate-900">
                            {sessionStorage.getItem("userName") || "User"}
                        </h3>
                    </div>

                    {/* Description */}
                    <div className="mb-6 text-center">
                        <p className="text-sm leading-relaxed text-slate-600">
                            {t.profile.canMakeEdit}
                            <br />
                            {t.profile.canSendFree}
                        </p>
                    </div>

                    {/* Button */}
                    <div className="mb-4">
                        <UIButton
                            className="w-full"
                            variant="primary"
                            onClick={() => navigate("/allcampaign")}
                            leftIcon={<i className="fa-solid fa-plus" />}
                        >
                            {t.profile.makeMoreEvents}
                        </UIButton>
                    </div>

                    {/* Footer Badge */}
                    <div className="rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 p-4 text-center">
                        <p className="text-sm font-medium text-slate-700">{t.profile.freeAccount}</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Profile;
