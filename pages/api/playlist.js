export default async function handler(req, res) {
    const token = req.cookies.spotify_access_token;

    if (!token) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    res.status(200).json(data);
}
