import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Callback() {
    const router = useRouter();
    const { code } = router.query;
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (!code) return;

        const getToken = async () => {
            try {
                const res = await fetch("https://accounts.spotify.com/api/token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization:
                            "Basic " +
                            btoa(
                                process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
                                ":" +
                                process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
                            ),
                    },
                    body: new URLSearchParams({
                        grant_type: "authorization_code",
                        code: code,
                        redirect_uri: "https://spotify-wrapped-nextjs.vercel.app/callback",
                    }),
                });

                const data = await res.json();
                console.log("Token Response:", data);
                setToken(data);
            } catch (error) {
                console.error("Error fetching token:", error);
            }
        };

        getToken();
    }, [code]);

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
