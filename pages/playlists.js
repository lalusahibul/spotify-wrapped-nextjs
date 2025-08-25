import Cookies from 'js-cookie';

export default async function handler(req, res) {
    const accessToken = Cookies.get("spotifyAccessToken");

    if (!accessToken) {
        return res.status(401).json({ error: "Access token not found" });
    }

    try {
        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        });

        if (response.status === 401) {
            // Token kadaluarsa, kirim respon error agar user login ulang
            return res.status(401).json({ error: "Token expired or invalid" });
        }

        const data = await response.json();

        if (response.ok) {
            res.status(200).json(data.items);
        } else {
            res.status(response.status).json(data);
        }
    } catch (error) {
        console.error("Failed to fetch playlists:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}