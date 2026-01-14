import { FunctionComponent, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isLoginGlobal } from "../App";
import { useTranslation } from "../i18n/useTranslation";
import LanguageSelector from "./ui/LanguageSelector";

interface NavBarProps {
    setIsLogIn: Function;
}

const NavBar: FunctionComponent<NavBarProps> = ({ setIsLogIn }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = useContext<boolean>(isLoginGlobal);
    const t = useTranslation();

    // Hide navigation on public pages
    const isPublicPage = ["/savethedate/", "/invitation/", "/event/"].some(
        path => location.pathname.startsWith(path)
    );
    if (isPublicPage) return null;

    const handleLogout = () => {
        sessionStorage.setItem("IsLoggedIn", "false");
        sessionStorage.removeItem("Authorization");
        setIsLogIn(false);
        navigate("/");
    };

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const navLinks = [
        { to: "/", label: t.nav.home, icon: "fa-house" },
        { to: "/newcampaign", label: t.nav.newCampaign, icon: "fa-square-plus" },
        { to: "/allcampaign", label: t.nav.allCampaigns, icon: "fa-list-check" },
        { to: "/about", label: t.nav.about, icon: "fa-circle-info" },
    ];

    return (
        <>
            {/* MOBILE ONLY - Top Navigation Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 shadow-sm lg:hidden">
                {/* Logo */}
                <div 
                    onClick={() => handleNavigate("/")} 
                    className="flex cursor-pointer items-center gap-3 transition-transform hover:scale-105"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
                        <i className="fa-solid fa-comment-sms text-lg text-white" />
                    </div>
                    <div className="text-base font-bold tracking-tight text-slate-900">
                        CRM SMS
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex items-center gap-2">
                    {navLinks.slice(0, 3).map(link => {
                        const isActive = location.pathname === link.to;
                        return (
                            <div
                                key={link.to}
                                onClick={() => handleNavigate(link.to)}
                                className={`group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-sm shadow-sm transition-all hover:scale-105 hover:shadow-md ${
                                    isActive
                                        ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-500/30"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                                }`}
                            >
                                <i className={`fa-solid ${link.icon} relative z-10`} />
                            </div>
                        );
                    })}
                    
                    {isLogin && (
                        <>
                            <div className="mx-1 h-6 w-px bg-slate-200" />
                            <LanguageSelector variant="mobile" />
                            <div 
                                onClick={handleLogout}
                                className="group relative ml-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-500/40"
                            >
                                <i className="fa-solid fa-right-from-bracket relative z-10" />
                            </div>
                        </>
                    )}
                </nav>
            </div>

            {/* DESKTOP ONLY - Right Sidebar */}
            {/* <div className="fixed right-0 top-0 bottom-0 z-40 hidden h-screen w-20 flex-col border-l border-slate-200 bg-white shadow-sm lg:flex">
                <div className="flex h-20 items-center justify-center border-b border-slate-200">
                    <div 
                        onClick={() => handleNavigate("/")}
                        className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
                    >
                        <i className="fa-solid fa-comment-sms text-xl text-white" />
                    </div>
                </div>

                <nav className="flex flex-1 flex-col items-center gap-3 overflow-y-auto px-3 py-6">
                    {navLinks.map(link => {
                        const isActive = location.pathname === link.to;
                        return (
                            <div
                                key={link.to}
                                onClick={() => handleNavigate(link.to)}
                                className={`group relative flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-2xl text-xs font-medium shadow-sm transition-all hover:scale-105 hover:shadow-md ${
                                    isActive
                                        ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-500/30"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                                }`}
                                title={link.label}
                            >
                                <i className={`fa-solid ${link.icon} text-base`} />
                            </div>
                        );
                    })}
                </nav>

                {isLogin && (
                    <div className="flex flex-col items-center gap-3 border-t border-slate-200 px-3 py-6">
                        <LanguageSelector variant="sidebar" />
                        
                        <div
                            onClick={() => handleNavigate("/profile")}
                            className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-slate-100 text-slate-600 shadow-sm transition-all hover:scale-105 hover:bg-slate-200 hover:text-slate-900 hover:shadow-md"
                            title={t.nav.profile}
                        >
                            <i className="fa-solid fa-user text-base" />
                        </div>
                        
                        <div 
                            onClick={handleLogout}
                            className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-500/40"
                            title={t.nav.logout}
                        >
                            <i className="fa-solid fa-right-from-bracket text-base" />
                        </div>
                    </div>
                )}
            </div> */}
        </>
    );
};

export default NavBar;