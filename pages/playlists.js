import { useEffect, useState } from "react";
import TopSongs from "../components/topsongs";

export default function Playlists({ playlists, topSongs, error }) {
    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!playlists || !topSongs) {
        return <p>Memuat data Spotify...</p>;
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
<<<<<<< HEAD
            ---
            <TopSongs songs={topSongs} />
=======
            <TopSongs />
>>>>>>> d96c9001fe8dbb97f15809d5b7ecccf4490c14d5
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

        const headers = {
            "Authorization": `Bearer ${spotifyAccessToken}`,
        };

        // Ambil data playlist
        const playlistsResponse = await fetch("https://api.spotify.com/v1/me/playlists", { headers });
        const playlistsData = await playlistsResponse.json();

        // Ambil data lagu teratas
        const topSongsResponse = await fetch("http://googleusercontent.com/spotify.com/5", { headers });
        const topSongsData = await topSongsResponse.json();

        if (playlistsResponse.status === 401 || topSongsResponse.status === 401) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }

        if (!playlistsResponse.ok || !topSongsResponse.ok) {
            throw new Error("Gagal mengambil data dari Spotify.");
        }

        return {
            props: {
                playlists: playlistsData.items,
                topSongs: topSongsData.items,
            },
        };
    } catch (error) {
        console.error("Gagal mengambil data:", error);
        return {
            props: {
                error: error.message,
            },
        };
    }
}