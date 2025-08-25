import { useEffect, useState } from "react";

export default function Playlists() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const res = await fetch("/api/spotify-playlists");
                const data = await res.json();
                setPlaylists(data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, []);

    if (loading) return <p>Memuat playlist...</p>;

    return (
        <div>
            <h1>Daftar Playlist Spotify</h1>
            <ul>
                {playlists.map((pl) => (
                    <li key={pl.id}>
                        <img src={pl.images[0]?.url} alt={pl.name} width={100} />
                        <p>{pl.name} - {pl.tracks.total} tracks</p>
                        <a href={pl.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                            Buka di Spotify
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
