export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { code } = req.body;

    const basicAuth = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Authorization": `Basic ${basicAuth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // simpan token sementara di memory server
            global.spotifyAccessToken = data.access_token;
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json(data);
        }
    } catch (error) {
        console.error("Token error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
