import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Callback() {
    const router = useRouter();
    const { code } = router.query;
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (!router.isReady) return; // tunggu router siap
        if (!code) return;

        const getToken = async () => {
            try {
                const res = await fetch("/api/auth/token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code }),
                });

                const data = await res.json();
                setToken(data);
            } catch (error) {
                console.error("Error fetching token:", error);
            }
        };

        getToken();
    }, [router.isReady, code]);

    return (
        <div>
            <h1>Spotify Callback</h1>
            <p>Authorization Code: {code}</p>
            {token ? (
                <pre>{JSON.stringify(token, null, 2)}</pre>
            ) : (
                <p>Menukar code dengan token...</p>
            )}
        </div>
    );
}

// 👇 ini penting biar Next.js tidak prerender halaman ini saat build
export async function getServerSideProps() {
    return { props: {} };
}
