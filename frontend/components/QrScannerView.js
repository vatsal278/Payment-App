"use client";

import { useEffect, useRef, useState } from "react";

/**
 * QR Scanner component using html5-qrcode.
 *
 * Props:
 *  - onScan(decodedText: string) — called when a QR is successfully decoded
 *  - onError(error: Error) — called on camera/permission errors
 *  - active (boolean) — start/stop the scanner
 */
export default function QrScannerView({ onScan, onError, active }) {
    const containerRef = useRef(null);
    const scannerRef = useRef(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!active) {
            // Stop scanner when modal closes
            if (scannerRef.current) {
                scannerRef.current
                    .stop()
                    .catch(() => { })
                    .finally(() => {
                        scannerRef.current = null;
                        setReady(false);
                    });
            }
            return;
        }

        let cancelled = false;

        // Dynamic import avoids SSR issues (html5-qrcode accesses `navigator`)
        import("html5-qrcode").then(({ Html5Qrcode }) => {
            if (cancelled || !containerRef.current) return;

            const scannerId = "flowcash-qr-reader";

            // Ensure the container has the target div
            if (!document.getElementById(scannerId)) {
                const div = document.createElement("div");
                div.id = scannerId;
                containerRef.current.appendChild(div);
            }

            const scanner = new Html5Qrcode(scannerId);
            scannerRef.current = scanner;

            scanner
                .start(
                    { facingMode: "environment" },
                    { fps: 10, qrbox: { width: 220, height: 220 } },
                    (decodedText) => {
                        onScan?.(decodedText);
                        // Stop after first successful scan
                        scanner.stop().catch(() => { });
                    },
                    () => { } // ignore per-frame "no QR found" 
                )
                .then(() => setReady(true))
                .catch((err) => {
                    onError?.(err);
                });
        });

        return () => {
            cancelled = true;
            if (scannerRef.current) {
                scannerRef.current.stop().catch(() => { });
                scannerRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full"
            style={{ minHeight: 250 }}
        />
    );
}
