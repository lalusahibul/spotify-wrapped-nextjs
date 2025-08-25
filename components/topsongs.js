<<<<<<< HEAD
export default function TopSongs({ songs }) {
=======
import { useEffect, useState } from "react";

export default function TopSongs() {
    const [topSongs, setTopSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopSongs = async () => {
            try {
                const res = await fetch("/api/top-tracks");
                const data = await res.json();

                if (res.ok) {
                    setTopSongs(data);
                } else {
                    setError(data.error || "Gagal mengambil data lagu teratas.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTopSongs();
    }, []);

    if (loading) {
        return <p>Memuat lagu teratas...</p>;
    }

    if (error) {
        return <p className="error">Error: {error}</p>;
    }

>>>>>>> d96c9001fe8dbb97f15809d5b7ecccf4490c14d5
    return (
        <div style={{ padding: '20px', backgroundColor: '#181818', color: 'white', fontFamily: 'sans-serif' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Top 5 Lagu Teratas Anda</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
<<<<<<< HEAD
                {songs.slice(0, 5).map((song, index) => (
=======
                {topSongs.slice(0, 5).map((song, index) => (
>>>>>>> d96c9001fe8dbb97f15809d5b7ecccf4490c14d5
                    <div key={song.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#282828', padding: '10px', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '24px', color: '#B3B3B3' }}>{index + 1}</div>
                        <img src={song.album.images[0].url} alt={song.name} style={{ width: '60px', height: '60px', borderRadius: '4px' }} />
                        <div>
                            <div style={{ fontWeight: 'bold' }}>{song.name}</div>
                            <div style={{ color: '#B3B3B3' }}>{song.artists.map(artist => artist.name).join(', ')}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}