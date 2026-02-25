"use client";

import { ParticleWave } from "@/components/ui/particle-wave";
import { Link2, ArrowRight, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios"
export default function ShortenerPage() {
    const [url, setUrl] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleShorten =async  (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const response:any=await axios.post('https://zl-mu.vercel.app/create',{
            originalString:url
        })

        console.log(response)
        setShortenedUrl(`https://zl-mu.vercel.app/${response.data.string}`)
        setIsLoading(false);
        
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortenedUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <main className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 z-0">
                <ParticleWave />
            </div>

            {/* Navigation Bar inside the tool */}
            <nav className="absolute top-0 w-full p-6 z-20 flex justify-between items-center bg-transparent">
                <Link href="/" className="text-white flex items-center space-x-2 group">
                    <div className="bg-gradient-to-tr from-cyan-400 to-blue-500 p-1.5 rounded-lg">
                        <Link2 width="24" height="24" className="text-black" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">ZipLink</span>
                </Link>
            </nav>

            {/* Main Glassmorphic Card */}
            <div className="relative z-10 w-full max-w-2xl px-4 animate-in fade-in zoom-in duration-500">
                <div className="backdrop-blur-2xl bg-black/40 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-[0_0_40px_rgba(34,211,238,0.15)] overflow-hidden relative">

                    {/* Ambient gradients */}
                    <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
                    <div className="absolute bottom-0 left-1/4 w-1/2 h-40 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none"></div>

                    <div className="text-center mb-10">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Shorten Your Link</h1>
                        <p className="text-gray-400">Paste your long URL below to create a concise, trackable link.</p>
                    </div>

                    <form onSubmit={handleShorten} className="space-y-6">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Link2 className="h-5 w-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                            </div>
                            <input
                                type="url"
                                required
                                placeholder="https://your-very-long-url.com/something/else"
                                className="block w-full pl-12 pr-4 py-4 sm:py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition duration-300 text-lg sm:text-base backdrop-blur-sm"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold py-4 rounded-2xl hover:scale-[1.02] transform transition-all duration-300 flex items-center justify-center text-lg disabled:opacity-70 disabled:hover:scale-100 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>Shorten Link <ArrowRight className="ml-2 w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                    {shortenedUrl && (
                        <div className="mt-8 pt-8 border-t border-white/10 animate-in slide-in-from-bottom flex flex-col sm:flex-row items-center justify-between bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/5 backdrop-blur-sm">
                            <div className="truncate w-full sm:w-auto text-center sm:text-left mb-4 sm:mb-0">
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Your shortened link</p>
                                <a href={`https://${shortenedUrl}`} target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-medium text-lg hover:underline truncate inline-block max-w-full">
                                    {shortenedUrl}
                                </a>
                            </div>

                            <button
                                onClick={copyToClipboard}
                                className="w-full sm:w-auto px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition duration-300 flex items-center justify-center font-medium border border-white/10 cursor-pointer"
                            >
                                {isCopied ? <Check className="w-4 h-4 mr-2 text-green-400" /> : <Copy className="w-4 h-4 mr-2" />}
                                {isCopied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}
