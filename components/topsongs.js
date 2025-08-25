export default function TopSongs({ songs }) {
    return (
        <div style={{ padding: '20px', backgroundColor: '#181818', color: 'white', fontFamily: 'sans-serif' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Top 5 Lagu Teratas Anda</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {songs.slice(0, 5).map((song, index) => (
                    <div key={song.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#282828', padding: '10px', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '24px', color: '#B3B3B3' }}>{index + 1}</div>
                        <img src={song.album.images[0].url} alt={song.name} style={{ width: '60px', height: '60px', borderRadius: '4px' }} />
                        <div>
                            <div style={{ fontWeight: 'bold' }}>{song.name}</div>
                            <div style={{ color: '#B3B3B3' }}>{song.artists.map(artist => artist.name).join(', ')}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}