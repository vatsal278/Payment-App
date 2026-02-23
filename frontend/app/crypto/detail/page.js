import CryptoDetailClient from "./CryptoDetailClient";
import { Suspense } from "react";

export default function CryptoDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black p-6 flex justify-center items-center">Loading...</div>}>
      <CryptoDetailClient />
    </Suspense>
  );
}
