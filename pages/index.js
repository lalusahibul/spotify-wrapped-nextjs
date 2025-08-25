import { useEffect, useState } from "react";

export default function Home() {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        fetch("/api/playlists")
            .then((res) => res.json())
            .then((data) => {
                if (data.items) setPlaylists(data.items);
            });
    }, []);

    return (
        <div>
            <h1>Spotify Playlists</h1>
            <a href="/api/login">Login with Spotify</a>
            <ul>
                {playlists.map((pl) => (
                    <li key={pl.id}>{pl.name}</li>
                ))}
            </ul>
        </div>
    );
}
