export default async function handler(req, res) {
    const code = req.query.code || null;

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
                "Basic " +
                Buffer.from(
                    process.env.SPOTIFY_CLIENT_ID +
                    ":" +
                    process.env.SPOTIFY_CLIENT_SECRET
                ).toString("base64"),
        },
        body: new URLSearchParams({
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            grant_type: "authorization_code",
        }),
    });

    const data = await response.json();

    if (data.access_token) {
        // Simpan token di cookie/session
        res.setHeader("Set-Cookie", `spotify_access_token=${data.access_token}; Path=/; HttpOnly`);
        res.redirect("/"); // balik ke homepage
    } else {
        res.status(400).json(data);
    }
}
