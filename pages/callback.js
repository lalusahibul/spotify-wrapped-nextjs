import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Callback() {
    const router = useRouter();
    const { code } = router.query;

    useEffect(() => {
        if (!router.isReady || !code) return;

        const getToken = async () => {
            try {
                const res = await fetch("/api/auth/token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code }),
                });
                const data = await res.json();

                if (data.access_token) {
                    router.replace(`/playlists?token=${data.access_token}`);
                }
            } catch (err) {
                console.error(err);
            }
        };

        getToken();
    }, [router.isReady, code]);

    return <p>Menukar kode Spotify...</p>;
}
