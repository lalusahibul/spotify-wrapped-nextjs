export default async function handler(req, res) {
    const cookies = req.headers.cookie;
    const spotifyAccessToken = cookies
        ?.split(';')
        .find(row => row.trim().startsWith('spotifyAccessToken='))
        ?.split('=')[1];

    if (!spotifyAccessToken) {
        return res.status(401).json({ error: "Token akses tidak ditemukan atau kadaluarsa." });
    }

    try {
        const response = await fetch("http://googleusercontent.com/spotify.com/5", {
            headers: {
                "Authorization": `Bearer ${spotifyAccessToken}`,
            },
        });

        if (response.status === 401) {
            return res.status(401).json({ error: "Token kadaluarsa. Silakan login ulang." });
        }

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error?.message || "Gagal mengambil lagu teratas.");
        }

        const data = await response.json();
        return res.status(200).json(data.items);
    } catch (error) {
        console.error("Failed to fetch top tracks:", error);
        return res.status(500).json({ error: error.message });
    }
}