import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Callback({ code }) {
    const router = useRouter();

    useEffect(() => {
        if (!code) {
            // Jika tidak ada kode, redirect kembali ke halaman utama
            router.push("/");
            return;
        }

        const exchangeCode = async () => {
            try {
                const res = await fetch("/api/callback", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code }),
                });

                if (res.ok) {
                    router.replace("/playlists");
                } else {
                    const data = await res.json();
                    console.error("Token exchange failed:", data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        exchangeCode();
    }, [code, router]);

    return <p>Menukar kode Spotify dan redirect...</p>;
}

export async function getServerSideProps(context) {
    const { code } = context.query;
    return {
        props: {
            code: code || null,
        },
    };
}