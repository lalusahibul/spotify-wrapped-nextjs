import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Callback() {
    const router = useRouter();
    const { code } = router.query;

    useEffect(() => {
        if (!router.isReady || !code) return;

        const getTokenAndRedirect = async () => {
            try {
                const res = await fetch("/api/auth/token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code }),
                });

                const data = await res.json();
                const accessToken = data.access_token;

                if (accessToken) {
                    // redirect ke halaman playlist dengan token di query
                    router.replace({
                        pathname: "/playlists",
                        query: { token: accessToken },
                    });
                }
            } catch (err) {
                console.error(err);
            }
        };

        getTokenAndRedirect();
    }, [router.isReady, code]);

    return <p>Menukar code dengan token...</p>;
}
