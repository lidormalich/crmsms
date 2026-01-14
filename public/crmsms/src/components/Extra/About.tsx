import { FunctionComponent } from "react";
import Footer from "./Footer";
import { useTranslation } from "../../i18n/useTranslation";

interface AboutProps {

}

const About: FunctionComponent<AboutProps> = () => {
    const t = useTranslation();
    
    return (<>
        <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <i className="fa-solid fa-message" />
                    </span>
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">
                            {t.about.title}
                        </h1>
                        <p className="text-sm text-slate-500">
                            {t.about.createdBy}
                        </p>
                    </div>
                </div>

                <section className="space-y-2 text-sm leading-relaxed text-slate-700">
                    <h2 className="text-base font-semibold text-slate-900">
                        {t.about.teamBehind}
                    </h2>
                    <p>
                        Our product is built by experienced event planners, developers and
                        designers who love creating tools that make planning easier and
                        more efficient. We know how important a well organized event is,
                        and we work hard to give you a smooth, reliable experience.
                    </p>
                </section>

                <section className="space-y-2 text-sm leading-relaxed text-slate-700">
                    <h2 className="text-base font-semibold text-slate-900">
                        {t.about.contact}
                    </h2>
                    <p>
                        {t.about.haveQuestion}
                    </p>
                    <ul className="space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                            <i className="fa-solid fa-envelope text-slate-500" />
                            <a
                                href="mailto:lidormalich@gmail.com"
                                className="text-blue-600 hover:text-blue-700"
                            >
                                lidormalich@gmail.com
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <i className="fa-solid fa-phone text-slate-500" />
                            <a
                                href="tel:972526761204"
                                className="text-blue-600 hover:text-blue-700"
                            >
                                052-676-1204
                            </a>
                        </li>
                    </ul>
                </section>

                <p className="text-sm text-slate-600">
                    {t.about.thankYou}
                </p>
            </div>
            <Footer />
        </div>
    </>);
}

export default About;