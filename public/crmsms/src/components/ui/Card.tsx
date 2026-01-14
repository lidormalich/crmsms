import { FunctionComponent, ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    title?: string;
    description?: string;
    icon?: ReactNode;
    iconColor?: "blue" | "purple" | "green" | "red" | "yellow";
}

const Card: FunctionComponent<CardProps> = ({
    children,
    className = "",
    title,
    description,
    icon,
    iconColor = "blue",
}) => {
    const iconColorClasses = {
        blue: "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30",
        purple: "bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30",
        green: "bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30",
        red: "bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30",
        yellow: "bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg shadow-yellow-500/30",
    };

    return (
        <section
            className={`rounded-2xl border border-slate-200 bg-white shadow-md transition-shadow hover:shadow-lg ${className}`}
        >
            {(title || description || icon) && (
                <header className="border-b border-slate-200 bg-slate-50/50 p-6">
                    <div className="flex items-center gap-4">
                        {icon && (
                            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-xl text-white ${iconColorClasses[iconColor]}`}>
                                {icon}
                            </div>
                        )}
                        <div className="flex-1 space-y-1">
                            {title && (
                                <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                            )}
                            {description && (
                                <p className="text-sm text-slate-500">{description}</p>
                            )}
                        </div>
                    </div>
                </header>
            )}
            <div className="p-6">{children}</div>
        </section>
    );
};

export default Card;
