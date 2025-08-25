let accessTokenMemory = null; // simpan token sementara di memory

export default async function handler(req, res) {
    if (req.method === "POST") {
        accessTokenMemory = req.body.token; // diisi dari callback
        return res.status(200).json({ success: true });
    }

    if (!accessTokenMemory) return res.status(400).json({ error: "No token" });

    try {
        const response = await fetch("https://api.spotify.com/v1/me/playlists", {
            headers: { Authorization: `Bearer ${accessTokenMemory}` },
        });
        const data = await response.json();
        res.status(200).json(data.items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
