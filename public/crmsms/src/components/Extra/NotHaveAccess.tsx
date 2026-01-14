import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface NotHaveAccessProps {

}

const NotHaveAccess: FunctionComponent<NotHaveAccessProps> = () => {
    return (<>
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                    <i className="fa-solid fa-triangle-exclamation text-xl" />
                </div>
                <h2 className="mb-1 text-xl font-semibold text-slate-900">
                    403 – No access
                </h2>
                <p className="mb-3 text-sm text-slate-600">
                    You do not have permission to view this page. Please sign in with an
                    account that has access.
                </p>
                <Link
                    to="/login"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                >
                    <i className="fa-solid fa-right-to-bracket" />
                    Go to login
                </Link>
            </div>
        </div>
    </>);
}

export default NotHaveAccess;