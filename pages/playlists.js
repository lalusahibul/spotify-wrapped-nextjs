import { useEffect, useState } from "react";

export default function Playlists({ playlists, error }) {
    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!playlists) {
        return <p>Memuat playlist...</p>;
    }

    return (
        <div>
            <h1>Daftar Playlist Spotify</h1>
            <ul>
                {playlists.map((pl) => (
                    <li key={pl.id}>
                        <a href={pl.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                            {pl.name} - {pl.tracks.total} lagu
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getServerSideProps(context) {
    try {
        const cookies = context.req.headers.cookie || '';
        const spotifyAccessToken = cookies
            .split(';')
            .find(row => row.trim().startsWith('spotifyAccessToken='))
            ?.split('=')[1];

        if (!spotifyAccessToken) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }

        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
            headers: {
                "Authorization": `Bearer ${spotifyAccessToken}`,
            },
        });

        if (response.status === 401) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error?.message || "Gagal mengambil playlist");
        }

        const data = await response.json();

        return {
            props: {
                playlists: data.items,
            },
        };
    } catch (error) {
        console.error("Gagal mengambil playlist:", error);
        return {
            props: {
                error: error.message,
            },
        };
    }
}