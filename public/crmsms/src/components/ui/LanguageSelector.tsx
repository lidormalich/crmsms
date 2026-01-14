import { FunctionComponent, useState, useRef, useEffect } from "react";
import { useLanguageControls } from "../../i18n/useTranslation";

interface LanguageSelectorProps {
    variant?: "sidebar" | "header" | "mobile";
}

const LanguageSelector: FunctionComponent<LanguageSelectorProps> = ({ variant = "sidebar" }) => {
    const { language, setLanguage } = useLanguageControls();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const languages = [
        { code: "he" as const, label: "עברית", flag: "🇮🇱" },
        { code: "en" as const, label: "English", flag: "🇬🇧" },
    ];

    const currentLang = languages.find((l) => l.code === language) || languages[0];

    const handleLanguageChange = (code: "he" | "en") => {
        setLanguage(code);
        setOpen(false);
    };

    if (variant === "header") {
        return (
            <div ref={ref} className="relative">
                <div
                    onClick={() => setOpen(!open)}
                    className="group flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:scale-105 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
                >
                    <span className="text-lg">{currentLang.flag}</span>
                    <span>{currentLang.label}</span>
                    <i className={`fa-solid fa-chevron-down text-xs transition-transform ${open ? "rotate-180" : ""}`} />
                </div>

                {open && (
                    <div className="absolute right-0 z-50 mt-2 w-40 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                        {languages.map((lang) => (
                            <div
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                                    language === lang.code
                                        ? "bg-blue-50 font-medium text-blue-600"
                                        : "text-slate-700 hover:bg-slate-100"
                                }`}
                            >
                                <span className="text-lg">{lang.flag}</span>
                                <span>{lang.label}</span>
                                {language === lang.code && (
                                    <i className="fa-solid fa-check ml-auto text-xs" />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    if (variant === "mobile") {
        return (
            <div ref={ref} className="relative">
                <div
                    onClick={() => setOpen(!open)}
                    className="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-slate-100 text-slate-600 shadow-sm transition-all hover:scale-105 hover:bg-slate-200 hover:text-slate-900 hover:shadow-md"
                    title={currentLang.label}
                >
                    <span className="text-sm">{currentLang.flag}</span>
                </div>

                {open && (
                    <div className="absolute right-0 top-12 z-50 w-40 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                        {languages.map((lang) => (
                            <div
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                                    language === lang.code
                                        ? "bg-blue-50 font-medium text-blue-600"
                                        : "text-slate-700 hover:bg-slate-100"
                                }`}
                            >
                                <span className="text-lg">{lang.flag}</span>
                                <span>{lang.label}</span>
                                {language === lang.code && (
                                    <i className="fa-solid fa-check ml-auto text-xs" />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Sidebar variant (default)
    return (
        <div ref={ref} className="relative">
            <div
                onClick={() => setOpen(!open)}
                className="group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-slate-100 text-slate-600 shadow-sm transition-all hover:scale-105 hover:bg-slate-200 hover:text-slate-900 hover:shadow-md"
                title={currentLang.label}
            >
                <span className="text-base">{currentLang.flag}</span>
            </div>

            {open && (
                <div className="absolute bottom-full right-0 z-50 mb-2 w-40 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                    {languages.map((lang) => (
                        <div
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                                language === lang.code
                                    ? "bg-blue-50 font-medium text-blue-600"
                                    : "text-slate-700 hover:bg-slate-100"
                            }`}
                        >
                            <span className="text-lg">{lang.flag}</span>
                            <span>{lang.label}</span>
                            {language === lang.code && (
                                <i className="fa-solid fa-check ml-auto text-xs" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;