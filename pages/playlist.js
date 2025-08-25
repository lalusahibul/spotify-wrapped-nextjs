import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
                    <li key={pl.id}>
                        <img src={pl.images[0]?.url} alt={pl.name} width={100} />
                        <p>{pl.name} - {pl.tracks.total} tracks</p>
                        <a href={pl.external_urls.spotify} target="_blank">Buka di Spotify</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
