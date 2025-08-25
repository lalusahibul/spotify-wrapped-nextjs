import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Playlists() {
    const router = useRouter();
    const { token } = router.query;
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        if (!token) return;

        const fetchPlaylists = async () => {
            try {
                const res = await fetch("https://api.spotify.com/v1/me/playlists", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setPlaylists(data.items || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPlaylists();
    }, [token]);

    if (!token) return <p>Menunggu token...</p>;

    return (
        <div>
            <h1>Daftar Playlist Spotify</h1>
            <ul>
                {playlists.map((pl) => (
                    <li key={pl.id}>{pl.name} - {pl.tracks.total} tracks</li>
                ))}
            </ul>
        </div>
    );
}
