export default function Skeleton({ className = "", variant = "text" }) {
    const baseClasses = "animate-pulse bg-gray-200 dark:bg-zinc-800 rounded-xl";

    const variants = {
        text: "h-4 w-full",
        title: "h-6 w-2/3",
        circle: "rounded-full",
        card: "h-24 w-full",
        "list-item": "h-16 w-full",
        button: "h-12 w-full rounded-full",
    };

    return (
        <div className={`${baseClasses} ${variants[variant] || variants.text} ${className}`} />
    );
}

export function BalanceSkeleton() {
    return (
        <div className="flex flex-col items-center space-y-3 py-8">
            <Skeleton variant="text" className="h-3 w-20" />
            <Skeleton variant="title" className="h-12 w-40" />
            <div className="flex space-x-4 mt-4">
                <Skeleton variant="button" className="h-12 w-28" />
                <Skeleton variant="button" className="h-12 w-28" />
            </div>
        </div>
    );
}

export function ActivityListSkeleton({ count = 4 }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl">
                    <Skeleton variant="circle" className="w-12 h-12" />
                    <div className="flex-1 space-y-2">
                        <Skeleton variant="text" className="h-4 w-3/4" />
                        <Skeleton variant="text" className="h-3 w-1/2" />
                    </div>
                    <Skeleton variant="text" className="h-5 w-16" />
                </div>
            ))}
        </div>
    );
}

export function ProfileSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col items-center space-y-3">
                <Skeleton variant="circle" className="w-20 h-20" />
                <Skeleton variant="title" className="h-6 w-32" />
                <Skeleton variant="text" className="h-4 w-24" />
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton variant="text" className="h-3 w-20" />
                    <Skeleton variant="list-item" className="h-12" />
                </div>
            ))}
        </div>
    );
}

export function AssetCardSkeleton({ count = 4 }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl">
                    <div className="flex items-center space-x-3">
                        <Skeleton variant="circle" className="w-10 h-10" />
                        <div className="space-y-1.5">
                            <Skeleton variant="text" className="h-4 w-20" />
                            <Skeleton variant="text" className="h-3 w-14" />
                        </div>
                    </div>
                    <div className="text-right space-y-1.5">
                        <Skeleton variant="text" className="h-4 w-16 ml-auto" />
                        <Skeleton variant="text" className="h-3 w-12 ml-auto" />
                    </div>
                </div>
            ))}
        </div>
    );
}
