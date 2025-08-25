import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Callback() {
    const router = useRouter();
    const { code } = router.query;

    useEffect(() => {
        if (!router.isReady || !code) return;

        const exchangeCode = async () => {
            try {
                const res = await fetch("/api/auth/token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code }),
                });
                const data = await res.json();

                if (data.success) {
                    // redirect **hanya setelah token berhasil disimpan**
                    router.replace("/playlists");
                } else {
                    console.error("Token exchange failed:", data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        exchangeCode();
    }, [router.isReady, code]);

    return <p>Menukar kode Spotify dan redirect...</p>;
}
