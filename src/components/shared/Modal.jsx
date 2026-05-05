import { useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ isOpen, onClose, title, message, onConfirm, confirmText = "Confirm", confirmStyle = "bg-red-500 hover:bg-red-600" }) {
    // ✅ close on Escape key
    useEffect(() => {
        const handleKey = (e) => { if (e.key === "Escape") onClose(); };
        if (isOpen) window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    // ✅ prevent background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal box */}
            <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">

                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none"
                    >
                        ✕
                    </button>
                </div>

                {/* Message */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {message}
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { onConfirm(); onClose(); }}
                        className={`px-4 py-2 rounded text-white text-sm ${confirmStyle}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.body // ✅ renders outside component tree via portal
    );
}

export default Modal;