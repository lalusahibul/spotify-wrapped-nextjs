import { useEffect, useState } from "react";

export default function Playlists() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const res = await fetch("/api/spotify-playlists");
                if (!res.ok) throw new Error("API not found or token missing");
                const data = await res.json();
                setPlaylists(data);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlaylists();
    }, []);

    if (loading) return <p>Memuat playlist...</p>;
    if (error) return <p>Error: {error}</p>;

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
