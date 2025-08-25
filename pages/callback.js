import { URLSearchParams } from "url";

export default async function handler(req, res) {
    const { code } = req.query;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!code) {
        return res.status(400).json({ error: "Missing authorization code" });
    }

    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: redirectUri,
            }).toString(),
        });

        const data = await response.json();

        if (response.ok) {
            res.setHeader(
                "Set-Cookie",
                `spotifyAccessToken=${data.access_token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${data.expires_in}`
            );
            res.redirect("/playlists");
        } else {
            return res.status(response.status).json(data);
        }
    } catch (error) {
        console.error("Token exchange failed:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}