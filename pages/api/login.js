export default function handler(req, res) {
    const scopes = process.env.SPOTIFY_SCOPES;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
        scopes
    )}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    res.redirect(authUrl);
}
