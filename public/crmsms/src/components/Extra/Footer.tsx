import { FunctionComponent } from "react";
import { useTranslation } from "../../i18n/useTranslation";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
    const t = useTranslation();
    
    return (
        <footer className="mt-12 border-t border-slate-200 bg-slate-50 py-8">
            <div className="mx-auto max-w-6xl px-4 text-center">
                <div className="mb-4">
                    <span className="text-sm text-slate-600">
                        {t.footer.createdWith} <i className="fa fa-heart text-red-500" /> {t.footer.by} Lidor Malich: {t.footer.copyright}{" "}
                        <a
                            href="https://lidormalich.netlify.app"
                            className="font-medium text-blue-600 hover:text-blue-700"
                        >
                            lidormalich.netlify.app
                        </a>
                    </span>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <a
                        href="https://wa.me/972526761204"
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 text-white shadow-md transition-all hover:scale-105 hover:bg-green-600 hover:shadow-lg"
                        aria-label="WhatsApp"
                    >
                        <i className="fa-brands fa-whatsapp" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/lidormalich/"
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md transition-all hover:scale-105 hover:bg-blue-700 hover:shadow-lg"
                        aria-label="LinkedIn"
                    >
                        <i className="fa-brands fa-linkedin" />
                    </a>
                    <a
                        href="https://github.com/lidormalich"
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md transition-all hover:scale-105 hover:bg-slate-800 hover:shadow-lg"
                        aria-label="GitHub"
                    >
                        <i className="fa-brands fa-github" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
