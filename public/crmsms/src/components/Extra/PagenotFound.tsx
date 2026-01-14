import { FunctionComponent } from "react";
import { Link } from "react-router-dom";


interface PagenotFoundProps {

}

const PagenotFound: FunctionComponent<PagenotFoundProps> = () => {
    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white">
                    <i className="fa-solid fa-circle-question text-xl" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    404
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                    The page you are looking for could not be found. It may have been
                    moved or deleted.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                    Try going back to the main dashboard and navigating from there.
                </p>
                <Link
                    to="/"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                >
                    <i className="fa-solid fa-house" />
                    Back to home
                </Link>
            </div>
        </div>
    );
}

export default PagenotFound;