import { FunctionComponent, ReactNode, useEffect, useRef } from "react";

type ModalSize = "sm" | "md" | "lg";
type IconColor = "blue" | "purple" | "green" | "red" | "yellow";

interface ModalProps {
    show: boolean;
    onHide: () => void;
    title?: string;
    icon?: ReactNode;
    iconColor?: IconColor;
    size?: ModalSize;
    children: ReactNode;
    footer?: ReactNode;
    closeOnBackdrop?: boolean;
}

const sizeClasses: Record<ModalSize, string> = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
};

const iconColorClasses: Record<IconColor, string> = {
    blue: "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30",
    purple: "bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/30",
    green: "bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30",
    red: "bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30",
    yellow: "bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg shadow-yellow-500/30",
};

const Modal: FunctionComponent<ModalProps> = ({
    show,
    onHide,
    title,
    icon,
    iconColor = "blue",
    size = "md",
    children,
    footer,
    closeOnBackdrop = true,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && show) {
                onHide();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [show, onHide]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [show]);

    // Handle backdrop click
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdrop && e.target === backdropRef.current) {
            onHide();
        }
    };

    if (!show) return null;

    return (
        <div
            ref={backdropRef}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(4px)",
            }}
        >
            <div
                ref={modalRef}
                className={`relative w-full ${sizeClasses[size]} transform transition-all duration-200 ease-out`}
                style={{
                    animation: "modalFadeIn 0.2s ease-out",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-blue-500/20">
                    {/* Header */}
                    {(title || icon) && (
                        <header className="flex items-center gap-4 border-b border-slate-200 bg-slate-50/50 px-6 py-4">
                            {icon && (
                                <div
                                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg text-white ${iconColorClasses[iconColor]}`}
                                >
                                    {icon}
                                </div>
                            )}
                            {title && (
                                <h3 className="flex-1 text-lg font-bold text-slate-900">{title}</h3>
                            )}
                            <button
                                onClick={onHide}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                                aria-label="Close"
                            >
                                <i className="fa-solid fa-xmark text-sm" />
                            </button>
                        </header>
                    )}

                    {/* Body */}
                    <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-6">{children}</div>

                    {/* Footer */}
                    {footer && (
                        <footer className="border-t border-slate-200 bg-slate-50/50 px-6 py-4">
                            {footer}
                        </footer>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;

