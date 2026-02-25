"use client";

import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { Share2, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

function HeroSplineBackground() {
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            pointerEvents: 'auto',
            overflow: 'hidden',
        }}>
            <Spline
                style={{
                    width: '100%',
                    height: '100vh',
                    pointerEvents: 'auto',
                }}
                scene="https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode"
            />
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    background: `
            linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent 30%, transparent 70%, rgba(0, 0, 0, 0.8)),
            linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.9))
          `,
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
}

function HeroContent() {
    return (
        <div className="text-white px-4 max-w-screen-xl mx-auto w-full flex flex-col lg:flex-row justify-between items-start lg:items-center py-16">

            <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-8 lg:mb-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight tracking-wide drop-shadow-lg">
                    Condense Links,<br />Expand Reach.
                </h1>
                <div className="text-sm text-gray-300 opacity-90 mt-4 flex items-center space-x-2">
                    <span>ANALYTICS</span>
                    <span className="text-cyan-400">/</span>
                    <span>SPEED</span>
                    <span className="text-cyan-400">/</span>
                    <span>RELIABILITY</span>
                </div>
            </div>

            <div className="w-full lg:w-1/2 pl-0 lg:pl-8 flex flex-col items-start drop-shadow-md">
                <p className="text-base sm:text-lg opacity-80 mb-6 max-w-md">
                    Create short, memorable links in seconds. Track your engagement and manage your URLs with a beautifully designed, premium experience.
                </p>
                <div className="flex pointer-events-auto flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <Link href="/shorten">
                        <button className="border border-white/50 bg-white/10 backdrop-blur-md text-white font-semibold py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-2xl transition duration-300 w-full sm:w-auto hover:bg-white hover:text-black flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            <Share2 className="w-4 h-4 mr-2" /> Shorten URL Now
                        </button>
                    </Link>
                    <Link href="/shorten">
                        <button className="pointer-events-auto bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-2xl transition duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] flex items-center justify-center w-full sm:w-auto">
                            <LinkIcon className="w-4 h-4 mr-2 text-black" /> Get Started
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
}

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-20" style={{ backgroundColor: 'rgba(13, 13, 24, 0.4)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <Link href="/" className="text-white flex items-center space-x-2 group">
                        <div className="bg-gradient-to-tr from-cyan-400 to-blue-500 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
                            <Share2 width="24" height="24" className="text-black" />
                        </div>
                        <span className="font-bold text-xl tracking-tight hidden sm:block">ZipLink</span>
                    </Link>

                </div>

            </div>
        </nav>
    );
}

const HeroSection = () => {
    const heroContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (heroContentRef.current) {
                requestAnimationFrame(() => {
                    const scrollPosition = window.pageYOffset;

                    const maxScroll = 400;
                    const opacity = 1 - Math.min(scrollPosition / maxScroll, 1);
                    if (heroContentRef.current) {
                        heroContentRef.current.style.opacity = opacity.toString();
                    }
                });
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative bg-black transition-colors duration-500">
            <Navbar />

            <div className="relative min-h-screen">
                <div className="absolute inset-0 z-0 pointer-events-auto">
                    <HeroSplineBackground />
                </div>

                <div ref={heroContentRef} style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh',
                    display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, pointerEvents: 'none'
                }}>
                    <HeroContent />
                </div>
            </div>

            <div className="bg-[#050510] relative z-10 w-full" style={{ marginTop: '-10vh', paddingBottom: '100px' }}>
                <div className="container mx-auto px-4 py-24 text-white">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Powerful Analytics Included</h2>
                    <p className="text-center max-w-2xl mx-auto text-gray-400 text-lg">
                        Track every click, monitor geographic data, and understand your audience with our built-in robust analytics dashboard perfectly tailored for marketers and creators alike.
                    </p>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { title: "Lightning Fast", desc: "Our global edge network ensures your links redirect in milliseconds." },
                            { title: "Detailed Insights", desc: "Gain actionable data about your audience's behavior and devices." },
                            { title: "Secure & Reliable", desc: "Enterprise-grade infrastructure providing 99.9% uptime guaranteed." }
                        ].map((feature, i) => (
                            <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:bg-gray-800/50 transition duration-300">
                                <h3 className="text-xl font-semibold mb-3 text-cyan-400">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export { HeroSection };
