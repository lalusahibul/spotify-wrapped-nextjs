import { URLSearchParams } from "url";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Callback() {
    const router = useRouter();

    useEffect(() => {
        // Jika ada kesalahan dari server-side, misalnya karena token tidak ditemukan,
        // kita bisa menampilkan pesan error atau redirect.
        if (router.query.error) {
            console.error("Authentication error:", router.query.error);
            // Anda bisa menampilkan pesan error atau mengalihkan ke halaman login
            router.replace("/");
        }
    }, [router]);

    return <p>Memproses otentikasi Spotify...</p>;
}

export async function getServerSideProps(context) {
    const { code } = context.query;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!code) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        };
    }

    const authString = `${clientId}:${clientSecret}`;
    const basicAuth = Buffer.from(authString).toString("base64");

    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${basicAuth}`,
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: redirectUri,
            }).toString(),
        });

        const data = await response.json();

        if (response.ok) {
            context.res.setHeader(
                "Set-Cookie",
                `spotifyAccessToken=${data.access_token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${data.expires_in}`
            );
            return {
                redirect: {
                    destination: '/playlists',
                    permanent: false,
                },
            };
        } else {
            console.error("Token exchange failed:", data);
            return {
                redirect: {
                    destination: `/?error=${encodeURIComponent(data.error_description || "Authentication failed")}`,
                    permanent: false,
                },
            };
        }
    } catch (error) {
        console.error("Token exchange error:", error);
        return {
            redirect: {
                destination: `/?error=${encodeURIComponent(error.message || "Internal server error")}`,
                permanent: false,
            },
        };
    }
}