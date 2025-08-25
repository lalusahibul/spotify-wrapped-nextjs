export default function handler(req, res) {
    const scopes = "playlist-read-private playlist-read-collaborative";
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const state = Math.random().toString(36).substring(7);

    const authUrl = "https://accounts.spotify.com/authorize?" + new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        scope: scopes,
        redirect_uri: redirectUri,
        state: state,
    }).toString();

    res.redirect(authUrl);
}