import TopSongs from "../components/TopSongs";

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
            ---
            <TopSongs songs={topSongs} />
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

        const [playlistsResponse, topSongsResponse] = await Promise.all([
            fetch("https://api.spotify.com/v1/me/playlists", { headers }),
            fetch("http://googleusercontent.com/spotify.com/5", { headers }),
        ]);

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

        const [playlistsData, topSongsData] = await Promise.all([
            playlistsResponse.json(),
            topSongsResponse.json(),
        ]);

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