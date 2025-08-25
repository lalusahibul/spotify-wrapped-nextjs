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
                    // Redirect ke halaman playlists dengan token di query
                    router.replace({
                        pathname: "/pages/playlists",
                        query: { token: accessToken },
                    });
                }
            } catch (err) {
                console.error("Error fetching token:", err);
            }
        };

        getTokenAndRedirect();
    }, [router.isReady, code]);

    return (
        <div>
            <h1>Menukar code dengan token...</h1>
        </div>
    );
}
