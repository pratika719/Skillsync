function SkeletonCard({ variant = "task" }) {
    const shimmer =
        "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer rounded";

    if (variant === "skill") {
        return (
            <div className="p-4 bg-white dark:bg-gray-800 shadow rounded space-y-3">
                {}
                <div className="flex justify-between items-center">
                    <div className={`h-5 w-32 ${shimmer}`} />
                    <div className="flex gap-2">
                        <div className={`h-7 w-24 ${shimmer}`} />
                        <div className={`h-7 w-16 ${shimmer}`} />
                    </div>
                </div>
                {}
                <div className={`h-3 w-24 ${shimmer}`} />
                <div className="space-y-1">
                    <div className={`h-4 w-full ${shimmer}`} />
                    <div className={`h-4 w-3/4 ${shimmer}`} />
                </div>
            </div>
        );
    }

return (
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded flex justify-between items-center">
            <div className="flex-1">
                <div className={`h-5 w-3/4 ${shimmer}`} />
            </div>
            <div className="flex gap-2 ml-4">
                <div className={`h-8 w-14 ${shimmer}`} />
                <div className={`h-8 w-14 ${shimmer}`} />
                <div className={`h-8 w-16 ${shimmer}`} />
            </div>
        </div>
    );
}

export default SkeletonCard;
