import ActivityDetailClient from "./ActivityDetailClient";
import { Suspense } from "react";

export default function ActivityDetailPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black p-6 flex justify-center items-center">Loading...</div>}>
            <ActivityDetailClient />
        </Suspense>
    );
}
