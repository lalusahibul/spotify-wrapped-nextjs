import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Callback() {
    const router = useRouter();
    const [code, setCode] = useState(null);

    useEffect(() => {
        if (router.isReady) {
            const urlCode = router.query.code;
            setCode(urlCode || null);
        }
    }, [router.isReady, router.query]);

    if (!code) return <div className="p-6 text-white">Loading...</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <h1 className="text-2xl font-bold mb-4">Spotify Authorization Code</h1>
            <p className="mb-2 text-green-400 break-all">{code}</p>

            <button
                onClick={() => navigator.clipboard.writeText(code)}
                className="px-4 py-2 mt-4 bg-green-600 hover:bg-green-700 rounded-lg"
            >
                Copy Code
            </button>
        </div>
    );
}
