// pages/callback.js
export default async function handler(req, res) {
    const code = req.query.code || null;

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization":
                "Basic " +
                Buffer.from(
                    process.env.NEXT_PUBLIC_CLIENT_ID + ":" + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
                ).toString("base64"),
        },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI, // HARUS sama dengan yang di dashboard
        }),
    });

    const data = await response.json();
    console.log("Spotify Token Response:", data);

    if (data.error) {
        return res.status(400).json(data);
    }

    // Simpan access token ke cookie/session
    res.status(200).json(data);
}
