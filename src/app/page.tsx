"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

type GalleryCategory = "gurbani" | "tradition" | "camps" | "online";

interface GalleryData {
    title: string;
    images: string[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const GALLERY_DATA: Record<GalleryCategory, GalleryData> = {
    gurbani: {
        title: "Gurbani Writing Photos",
        images: Array.from({ length: 12 }, (_, i) => `/assets/gw${i}.jpeg`),
    },
    tradition: {
        title: "Preserving Tradition Photos",
        images: Array.from({ length: 11 }, (_, i) => `/assets/pt${i}.jpeg`),
    },
    camps: {
        title: "Camps & Workshops Photos",
        images: Array.from({ length: 19 }, (_, i) => `/assets/cw${i}.jpeg`),
    },
    online: {
        title: "Online Learning Photos",
        images: Array.from({ length: 7 }, (_, i) => `/assets/ol${i}.jpeg`),
    },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function CloseIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

// ─── Wisdom Modal ──────────────────────────────────────────────────────────────

interface WisdomModalProps {
    id: string;
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    imageAlt: string;
    name: string;
    subtitle: string;
    children: React.ReactNode;
}

function WisdomModal({
    isOpen,
    onClose,
    imageSrc,
    imageAlt,
    name,
    subtitle,
    children,
}: WisdomModalProps) {
    return (
        <div
            className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-250 ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            style={{ display: isOpen ? "flex" : "none" }}
        >
            <div className="absolute inset-0 bg-[#3E2723]/80 backdrop-blur-sm" onClick={onClose} />
            <div
                className={`relative bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-[2.5rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto p-0 transition-transform duration-250 ${
                    isOpen ? "scale-100" : "scale-95"
                }`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/50 rounded-full hover:bg-[#B45309] hover:text-white text-[#3E2723] transition"
                >
                    <CloseIcon />
                </button>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 h-64 md:h-auto relative">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 40vw"
                        />
                    </div>
                    <div className="md:w-3/5 p-8 md:p-10">
                        <h3 className="text-2xl font-bold text-[#3E2723] mb-1">{name}</h3>
                        <p className="text-[#B45309] text-sm font-bold uppercase tracking-widest mb-6">
                            {subtitle}
                        </p>
                        <div className="text-[#3E2723]/80 leading-relaxed space-y-4 font-medium text-base">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Gallery Modal ─────────────────────────────────────────────────────────────

interface GalleryModalProps {
    isOpen: boolean;
    category: GalleryCategory | null;
    onClose: () => void;
    onImageClick: (src: string) => void;
}

function GalleryModal({ isOpen, category, onClose, onImageClick }: GalleryModalProps) {
    const data = category ? GALLERY_DATA[category] : null;

    return (
        <div
            className={`fixed inset-0 z-[65] flex items-center justify-center p-4 transition-opacity duration-250 ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            style={{ display: isOpen ? "flex" : "none" }}
        >
            <div className="absolute inset-0 bg-[#3E2723]/90 backdrop-blur-sm" onClick={onClose} />
            <div
                className={`relative bg-white/95 backdrop-blur-xl border border-white/50 rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl p-6 md:p-8 transition-transform duration-250 ${
                    isOpen ? "scale-100" : "scale-95"
                }`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 p-2 bg-[#3E2723]/10 rounded-full hover:bg-[#B45309] hover:text-white text-[#3E2723] transition"
                >
                    <CloseIcon />
                </button>
                <h3 className="text-2xl font-bold text-[#3E2723] mb-6 border-b border-[#3E2723]/10 pb-4 pr-12">
                    {data?.title ?? "Gallery"}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pr-2 pb-4 custom-scrollbar">
                    {data?.images.map((src) => (
                        <div
                            key={src}
                            className="relative h-32 md:h-40 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition duration-300 shadow-sm border border-[#3E2723]/5"
                            onClick={() => onImageClick(src)}
                        >
                            <Image
                                src={src}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Image Lightbox ────────────────────────────────────────────────────────────

interface ImageModalProps {
    src: string | null;
    onClose: () => void;
}

function ImageModal({ src, onClose }: ImageModalProps) {
    const isOpen = !!src;
    return (
        <div
            className={`fixed inset-0 z-[75] flex items-center justify-center p-4 transition-opacity duration-250 ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            style={{ display: isOpen ? "flex" : "none" }}
        >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
            <div className="relative z-10 max-w-5xl w-full flex justify-center">
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 z-20 p-2 bg-white/20 rounded-full hover:bg-[#B45309] hover:text-white text-white transition"
                >
                    <CloseIcon />
                </button>
                {src && (
                    <div className="relative w-full max-h-[85vh] aspect-video">
                        <Image
                            src={src}
                            alt="Expanded View"
                            fill
                            className="object-contain rounded-xl shadow-2xl"
                            sizes="100vw"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function GarhAnandPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Wisdom modals
    const [openWisdomModal, setOpenWisdomModal] = useState<"1" | "2" | "3" | "jathedar" | null>(
        null
    );

    // Gallery
    const [galleryCategory, setGalleryCategory] = useState<GalleryCategory | null>(null);
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

    // Lock body scroll when any modal is open
    useEffect(() => {
        const anyOpen =
            openWisdomModal !== null || galleryCategory !== null || lightboxSrc !== null;
        document.body.style.overflow = anyOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [openWisdomModal, galleryCategory, lightboxSrc]);

    // Close mobile menu on link click
    const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

    return (
        <>
            {/* ── Global Styles ── */}
            <style>{`
        body {
          background: linear-gradient(135deg, #fdfbf7 0%, #f7f1e3 50%, #ece5ce 100%);
          background-attachment: fixed;
          color: #3E2723;
        }
        html { scroll-behavior: smooth; }
        .glass-panel {
          background: rgba(255,255,255,0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 8px 32px 0 rgba(62,39,35,0.08);
          transition: background 0.3s, border 0.3s, box-shadow 0.3s;
        }
        .glass-panel:hover {
          background: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.8);
          box-shadow: 0 20px 40px 0 rgba(62,39,35,0.15);
        }
        .hero-bg {
          background-image: url('/assets/hero01.jpeg');
          background-size: cover;
          background-position: center;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(180,83,9,0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(180,83,9,0.6); }
      `}</style>

            {/* ── Header ── */}
            <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="glass-panel rounded-full px-6 py-3 flex justify-between items-center">
                        <a href="#" className="flex-shrink-0 flex items-center gap-2">
                            <Image
                                src="/assets/logo.png"
                                alt="Garh Anand Logo"
                                width={40}
                                height={40}
                                className="h-10 w-auto object-contain"
                            />
                        </a>

                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {["wisdom", "activities", "jathedar", "contact"].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item}`}
                                    className="text-[#3E2723]/80 hover:text-[#B45309] font-medium text-sm tracking-wide transition capitalize"
                                >
                                    {item === "jathedar"
                                        ? "Jathedar"
                                        : item.charAt(0).toUpperCase() + item.slice(1)}
                                </a>
                            ))}
                        </nav>

                        <div className="hidden md:flex items-center gap-4">
                            <a
                                href="#donate"
                                className="bg-[#B45309] text-white font-semibold px-6 py-2.5 rounded-full hover:bg-[#92400E] transition shadow-lg text-sm"
                            >
                                Donate
                            </a>
                        </div>

                        {/* Hamburger */}
                        <button
                            className="md:hidden text-[#3E2723] p-1"
                            aria-label="Toggle menu"
                            onClick={() => setMobileMenuOpen((v) => !v)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-2 glass-panel rounded-3xl p-4 flex flex-col space-y-3 shadow-2xl">
                            {[
                                { href: "#wisdom", label: "Wisdom" },
                                { href: "#activities", label: "Activities" },
                                { href: "#jathedar", label: "Jathedar's Message" },
                                { href: "#contact", label: "Contact" },
                            ].map(({ href, label }) => (
                                <a
                                    key={href}
                                    href={href}
                                    onClick={closeMobileMenu}
                                    className="block px-4 py-2 text-[#3E2723] hover:bg-white/50 rounded-xl"
                                >
                                    {label}
                                </a>
                            ))}
                            <a
                                href="#donate"
                                onClick={closeMobileMenu}
                                className="block text-center bg-[#B45309] text-white font-semibold px-5 py-3 rounded-full"
                            >
                                Donate
                            </a>
                        </div>
                    )}
                </div>
            </header>

            <main>
                {/* ── Hero ── */}
                <section className="hero-bg relative min-h-[85vh] flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#3E2723]/70 to-[#3E2723]/90 backdrop-blur-[2px]" />
                    <div className="container mx-auto px-6 text-center relative z-10 pt-24 pb-12 flex flex-col items-center">
                        <div className="flex justify-center items-center mb-6">
                            <Image
                                src="/assets/satgur_prasad_white.png"
                                alt="ਸਤਿਗੁਰਪ੍ਰਸਾਦਿ"
                                width={260}
                                height={80}
                                className="h-40 w-auto object-contain"
                            />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-8 text-white drop-shadow-lg">
                            Connecting Our Roots,
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-200">
                                Reviving Our Traditions.
                            </span>
                        </h1>
                        <p className="text-base md:text-lg max-w-2xl mx-auto mb-10 text-gray-100 font-medium leading-relaxed opacity-90">
                            Garh Anand is a space dedicated to reviving the age-old traditions of
                            our Gurus for a principle-driven life.
                        </p>
                        <div className="flex justify-center gap-4">
                            <a
                                href="#activities"
                                className="glass-panel text-[#3E2723] font-bold py-3.5 px-8 rounded-full hover:scale-105 transition duration-300 flex items-center gap-2 text-sm md:text-base"
                            >
                                Discover Our Work
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── Activities ── */}
                <section id="activities" className="py-20 md:py-24 relative">
                    <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-white/40 to-transparent -z-10" />
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#3E2723] mb-4">
                                Our Core Activities
                            </h2>
                            <p className="max-w-2xl mx-auto text-[#3E2723]/70 text-base font-medium">
                                Dedicated to regenerating ancient practices and bridging the gap
                                between Westernization and Sikhi.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(
                                [
                                    {
                                        category: "gurbani",
                                        img: "/assets/gw3.jpeg",
                                        title: "Gurbani Writing",
                                        desc: "Encouraging Sikhs to read and write Gurbani in Larivaar, generating a new generation of Likhari.",
                                    },
                                    {
                                        category: "tradition",
                                        img: "/assets/pt0.jpeg",
                                        title: "Preserving Tradition",
                                        desc: "Actively involved in the conservation of Puratan Beerh Sahibs and Pothis, safeguarding our history.",
                                    },
                                    {
                                        category: "camps",
                                        img: "/assets/cw0.jpeg",
                                        title: "Camps & Workshops",
                                        desc: "We conduct 4-6 camps annually, including a major residential camp, with practical, hands-on workshops.",
                                    },
                                ] as {
                                    category: GalleryCategory;
                                    img: string;
                                    title: string;
                                    desc: string;
                                }[]
                            ).map(({ category, img, title, desc }) => (
                                <div
                                    key={category}
                                    className="glass-panel rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 group cursor-pointer"
                                    onClick={() => setGalleryCategory(category)}
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-[#3E2723]/10 group-hover:bg-transparent transition duration-500 z-10" />
                                        <Image
                                            src={img}
                                            alt={title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition duration-700"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-[#3E2723] mb-2">
                                            {title}
                                        </h3>
                                        <p className="text-[#3E2723]/70 text-sm leading-relaxed font-medium">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {/* Online Learning – centred on lg */}
                            <div
                                className="glass-panel rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 group lg:col-start-2 cursor-pointer"
                                onClick={() => setGalleryCategory("online")}
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-[#3E2723]/10 group-hover:bg-transparent transition duration-500 z-10" />
                                    <Image
                                        src="/assets/ol2.jpeg"
                                        alt="Online Learning"
                                        fill
                                        className="object-cover group-hover:scale-110 transition duration-700"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-[#3E2723] mb-2">
                                        Online Learning
                                    </h3>
                                    <p className="text-[#3E2723]/70 text-sm leading-relaxed font-medium">
                                        Running an online book club and one-to-one classes for
                                        Akharkaari, reaching Sikhs worldwide.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Jathedar ── */}
                <section id="jathedar" className="py-20 md:py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#3E2723]/90 -z-20" />
                    <div
                        className="absolute inset-0 opacity-10 -z-10"
                        style={{
                            backgroundImage:
                                "url('https://www.transparenttextures.com/patterns/cubes.png')",
                        }}
                    />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="bg-white/10 border border-white/10 rounded-[3rem] p-8 md:p-12 lg:p-16 backdrop-blur-3xl shadow-2xl hover:bg-white/20 transition duration-300">
                            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                                <div className="lg:w-1/2 text-center lg:text-left flex flex-col justify-center">
                                    <span className="text-amber-400 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                                        Our Guiding Light
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-white">
                                        Words from Jathedar Ji
                                    </h2>
                                    <div className="space-y-4 text-base text-white leading-relaxed font-normal line-clamp-6">
                                        <p>
                                            ਧੰਨੁਸੁਕਾਗਦੁਕਲਮਧੰਨੁਧਨੁਭਾਂਡਾਧਨੁਮਸੁ॥
                                            <br />
                                            ਧਨੁਲੇਖਾਰੀਨਾਨਕਾਜਿਨਿਨਾਮੁਲਿਖਾਇਆਸਚੁ॥੧॥
                                        </p>
                                        <p>
                                            ਸਤਿਗੁਰੁ ਸਚੇ ਪਾਤਿਸ਼ਾਹ ਨਿਰੰਕਾਰੀ ਜੋਤਿ ਗੁਰੂ ਨਾਨਕ ਸਾਹਿਬ ਜੀ ਨੇ
                                            ਸਮੁੱਚੀ ਮਾਨਵਤਾ ਤੇ ਉਧਾਰ ਲਈ ਜਨਮ ਧਾਰਿਆ...
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setOpenWisdomModal("jathedar")}
                                        className="self-center lg:self-start mt-4 text-sm font-bold text-amber-400 border-b-2 border-amber-400/50 pb-1 hover:border-amber-300 hover:text-white transition-all"
                                    >
                                        Show More
                                    </button>
                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <p className="font-bold text-xl text-white">
                                            ਸਿਮਰਨਜੀਤ ਸਿੰਘ
                                        </p>
                                        <p className="text-amber-400 text-sm font-semibold tracking-wide mt-1">
                                            ਗੁਰੂ ਗ੍ਰੰਥ ਜੀ ਗੁਰੂ ਪੰਥ ਜੀ ਅਤੇ ਸਾਧਸੰਗਤਿ ਦਾ ਗੋਲਾ
                                        </p>
                                    </div>
                                </div>

                                <div className="lg:w-1/2 flex justify-center lg:justify-end">
                                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/20 relative shadow-2xl">
                                        <Image
                                            src="/assets/jathedar.jpeg"
                                            alt="Jathedar Ji"
                                            fill
                                            className="object-cover object-top"
                                            sizes="320px"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Missions ── */}
                <section id="missions" className="py-20 md:py-24 relative">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#3E2723] mb-4">
                                Our Upcoming Missions
                            </h2>
                            <p className="max-w-2xl mx-auto text-[#3E2723]/70 text-base font-medium">
                                Expanding our sewa to build dedicated spaces for learning and
                                preserving our sacred musical traditions.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
                            {[
                                {
                                    img: "/assets/raagiji.jpeg",
                                    title: "Raag te Saaj",
                                    desc: "Promoting the traditional way of Kirtan by teaching Guru ke Raag and Guru ke Saaj.",
                                },
                                {
                                    img: "/assets/vidya.JPG",
                                    title: "Vidyalay",
                                    desc: "Establishing a center to train Sikhs in Gatka, Santhia, Raag Vidya, and Akharkaari.",
                                },
                            ].map(({ img, title, desc }) => (
                                <div
                                    key={title}
                                    className="glass-panel rounded-[2rem] p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group"
                                >
                                    <div className="h-56 rounded-3xl overflow-hidden shadow-sm relative">
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition z-10" />
                                        <Image
                                            src={img}
                                            alt={title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition duration-700"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-[#3E2723] mb-2">
                                            {title}
                                        </h3>
                                        <p className="text-[#3E2723]/70 text-sm leading-relaxed font-medium">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Wisdom ── */}
                <section id="wisdom" className="py-20 md:py-24 relative overflow-hidden">
                    <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#B45309]/10 rounded-full blur-3xl -z-10" />
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#3E2723] mb-4 tracking-tight">
                                Wisdom from the Panth
                            </h2>
                            <div className="w-20 h-1.5 bg-[#B45309] mx-auto mb-6 rounded-full" />
                            <p className="text-base text-[#3E2723]/70 font-medium">
                                Inspiration drawn from the jewels of the Panth who dedicated their
                                lives to the preservation of Gurmat and Gurbani.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {/* Card 1 */}
                            <div className="glass-panel rounded-[2rem] overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-2 group">
                                <div className="w-full h-80 relative">
                                    <Image
                                        src="https://www.sikhtranslations.com/content/images/2023/04/gurbachan-singh-bhindranwale-2.jpg"
                                        alt="Sant Gyani Gurbachan Singh Ji Bhindrawale"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                                <div className="p-6 flex flex-col justify-center flex-grow">
                                    <h3 className="text-lg font-bold text-[#3E2723] mb-1">
                                        Sant Gyani Gurbachan Singh Ji
                                    </h3>
                                    <p className="text-[10px] text-[#B45309] font-extrabold uppercase tracking-[0.15em] mb-4">
                                        Khalsa Bhindranwale
                                    </p>
                                    <p className="text-[#3E2723]/80 text-sm leading-relaxed font-medium mb-4 line-clamp-3">
                                        "ਜਿਹੜੇ ਲੋਕ ਕਹਿੰਦੇ ਆ ਜੀ ਕਿ ਸਾਨੂੰ.....ਗੁਰਮੁਖੀ ਪੜਨੀ ਨਾ ਪਵੇ ਤੇ
                                        ਆਪੋ ਹੀ ਪੜ ਲਈਏ ਤੇ ਪਦ ਛੇਦ ਹੀ ਚਾਹੀਦੀਆਂ ਨੇ ਬੀੜਾਂ ਉਹ ਏਸ ਗੱਲ ਨੂੰ
                                        ਨਈ ਸਮਝਦੇ..."
                                    </p>
                                    <button
                                        onClick={() => setOpenWisdomModal("1")}
                                        className="self-start text-sm font-bold text-[#B45309] border-b-2 border-[#B45309]/30 pb-1 hover:border-[#B45309] hover:text-[#3E2723] transition-all"
                                    >
                                        See More
                                    </button>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="glass-panel rounded-[2rem] overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-2 group">
                                <div className="w-full h-80 relative">
                                    <Image
                                        src="/assets/Sant_Giani_Kartar_Singh_Ji_Khalsa_Bhindranwale.jpg"
                                        alt="Sant Gyani Kartar Singh Ji Bhindrawale"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                                <div className="p-6 flex flex-col justify-center flex-grow">
                                    <h3 className="text-lg font-bold text-[#3E2723] mb-1">
                                        Sant Gyani Kartar Singh Ji
                                    </h3>
                                    <p className="text-[10px] text-[#B45309] font-extrabold uppercase tracking-[0.15em] mb-4">
                                        Khalsa Bhindranwale
                                    </p>
                                    <p className="text-[#3E2723]/80 text-sm leading-relaxed font-medium mb-4 line-clamp-3">
                                        "ਸੰਤ ਗਿਆਨੀ ਕਰਤਾਰ ਸਿੰਘ ਜੀ ਭਿੰਡਰਾਂਵਾਲਿਆਂ ਦੇ ਪਦਛੇਦ ਦੇ ਵਿਰੋਧ
                                        ਵਿੱਚ ਕਥਾ ਦੀ ਰਿਕਾਰਡਿੰਗ ਚੋ ਮਿਲੇ ਬਚਨਃ- ਏਸ ਵਾਸਤੇ ਪਦ ਛੇਦ ਕਰਨਾ ਏਹ
                                        ਅਤਿਅੰਤਿ ਮਨ੍ਹਾ ਹੈ..."
                                    </p>
                                    <button
                                        onClick={() => setOpenWisdomModal("2")}
                                        className="self-start text-sm font-bold text-[#B45309] border-b-2 border-[#B45309]/30 pb-1 hover:border-[#B45309] hover:text-[#3E2723] transition-all"
                                    >
                                        See More
                                    </button>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="glass-panel rounded-[2rem] overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-2 group">
                                <div className="w-full h-80 relative">
                                    <Image
                                        src="https://live.staticflickr.com/65535/50221817848_ed394301d8_z.jpg"
                                        alt="Bhai Sahib Bhai Randheer Singh Ji"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                                <div className="p-6 flex flex-col justify-center flex-grow">
                                    <h3 className="text-lg font-bold text-[#3E2723] mb-1">
                                        Bhai Sahib Bhai Randheer Singh Ji
                                    </h3>
                                    <p className="text-[10px] text-[#B45309] font-extrabold uppercase tracking-[0.15em] mb-4">
                                        Akhand Kirtani Jatha
                                    </p>
                                    <p className="text-[#3E2723]/80 text-sm leading-relaxed font-medium mb-4 line-clamp-3">
                                        ਪੰਥ ਦੀ ਸੋਨ ਚਿੜੀ ਭਾਈ ਸਾਹਿਬ ਰਣਧੀਰ ਸਿੰਘ ਜੀ ਨੇ ਆਪਣੀ ਰਚਨਾ "ਜੋਤਿ
                                        ਵਿਗਾਸ" &apos;ਚ ਕਵਿਤਾਵਾਂ ਵੀ ਅੰਕਿਤ ਕੀਤੀਆ ਹਨ...
                                    </p>
                                    <button
                                        onClick={() => setOpenWisdomModal("3")}
                                        className="self-start text-sm font-bold text-[#B45309] border-b-2 border-[#B45309]/30 pb-1 hover:border-[#B45309] hover:text-[#3E2723] transition-all"
                                    >
                                        See More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Donate ── */}
                <section
                    id="donate"
                    className="py-20 md:py-24 bg-gradient-to-b from-transparent to-white/60"
                >
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#3E2723] mb-6">
                            Support Our Sewa
                        </h2>
                        <p className="max-w-3xl mx-auto text-[#3E2723]/80 mb-12 text-base italic font-medium">
                            "ਸਤਿਗੁਰ ਕੀ ਸੇਵਾ ਸਫਲ ਹੈ ਜੇ ਕੋ ਕਰੇ ਚਿਤੁ ਲਾਇ॥"
                            <br />
                            <span className="text-sm not-italic text-[#3E2723]/60 mt-3 block font-normal">
                                Your Dasvandh helps us provide free paper, qalam, and traditionally
                                made inks to over 450 Likharis.
                            </span>
                        </p>

                        <div className="max-w-4xl mx-auto glass-panel rounded-[2.5rem] p-8 md:p-12 shadow-2xl transform transition hover:-translate-y-1">
                            <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
                                {/* Bank details */}
                                <div className="flex-1 text-left space-y-6 w-full bg-white/40 p-8 rounded-3xl border border-white/50">
                                    <div>
                                        <h3 className="font-bold text-lg text-[#B45309] mb-4 uppercase tracking-widest border-b border-[#B45309]/20 pb-4">
                                            Bank Transfer
                                        </h3>
                                        <div className="space-y-4 text-[#3E2723]">
                                            {[
                                                {
                                                    label: "Account Name",
                                                    value: "Garh Anand Welfare Society",
                                                    mono: false,
                                                },
                                                {
                                                    label: "Account Number",
                                                    value: "50200098923091",
                                                    mono: true,
                                                },
                                                {
                                                    label: "IFSC Code",
                                                    value: "HDFC0001331",
                                                    mono: true,
                                                },
                                            ].map(({ label, value, mono }) => (
                                                <div key={label} className="flex flex-col">
                                                    <span className="font-bold text-xs uppercase text-[#3E2723]/50 tracking-wider">
                                                        {label}
                                                    </span>
                                                    <span
                                                        className={`${mono ? "font-mono text-lg tracking-tight text-[#3E2723]/90" : "font-bold text-base"}`}
                                                    >
                                                        {value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* QR & WhatsApp */}
                                <div className="flex-1 flex flex-col items-center w-full">
                                    <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 mb-8 transform transition hover:scale-105">
                                        <Image
                                            src="/assets/qr.jpeg"
                                            alt="Donate QR Code"
                                            width={160}
                                            height={160}
                                            className="object-contain mix-blend-multiply"
                                        />
                                    </div>
                                    <p className="text-xs font-bold text-[#3E2723]/60 mb-5 uppercase tracking-wide">
                                        Scan to Donate via UPI
                                    </p>
                                    <a
                                        href="https://wa.me/919115551699"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-3 rounded-full font-bold shadow-xl hover:shadow-2xl hover:bg-[#20bd5a] hover:-translate-y-1 transition duration-300 w-full justify-center sm:w-auto text-sm"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        Send Receipt
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* ── Footer ── */}
            <footer id="contact" className="bg-[#3E2723] text-amber-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="container mx-auto px-6 py-12 relative z-10">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-white">Garh Anand</h3>
                            <p className="text-white/60 leading-relaxed font-medium text-sm">
                                Reviving the forgotten traditions of the Khalsa Panth for a
                                principle-driven future.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4 text-white">Get in Touch</h3>
                            <ul className="space-y-3 text-white/70 font-medium text-sm">
                                <li className="flex items-center gap-3">
                                    <PhoneIcon /> +91 91155-51699
                                </li>
                                <li className="flex items-center gap-3">
                                    <GlobeIcon /> +1 (909)-760-9765
                                </li>
                                <li className="flex items-center gap-3">
                                    <MailIcon /> garhhanand@gmail.com
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4 text-white">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a
                                    href="https://www.instagram.com/garhhanand?igsh=MXMzbngxcXd5YmI1eg%3D%3D&utm_source=qr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white/10 p-2 rounded-full hover:bg-[#B45309] transition duration-300 text-white"
                                >
                                    <InstagramIcon />
                                </a>
                                <a
                                    href="https://youtube.com/@qalmdwaatacademy?si=gpGl1RfhZQPR9qcE"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white/10 p-2 rounded-full hover:bg-[#B45309] transition duration-300 text-white"
                                >
                                    <YoutubeIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-white/10 mt-8 pt-6 text-center text-white/30 text-xs font-medium">
                        <p>© 2025 Garh Anand Welfare Society. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

            {/* ── Wisdom Modals ── */}
            <WisdomModal
                id="modal-1"
                isOpen={openWisdomModal === "1"}
                onClose={() => setOpenWisdomModal(null)}
                imageSrc="https://www.sikhtranslations.com/content/images/2023/04/gurbachan-singh-bhindranwale-2.jpg"
                imageAlt="Sant Gyani Gurbachan Singh Ji Bhindrawale"
                name="Sant Gyani Gurbachan Singh Ji"
                subtitle="Khalsa Bhindranwale"
            >
                <p>
                    "ਜਿਹੜੇ ਲੋਕ ਕਹਿੰਦੇ ਆ ਜੀ ਕਿ ਸਾਨੂੰ.....ਗੁਰਮੁਖੀ ਪੜਨੀ ਨਾ ਪਵੇ ਤੇ ਆਪੋ ਹੀ ਪੜ ਲਈਏ ਤੇ ਪਦ
                    ਛੇਦ ਹੀ ਚਾਹੀਦੀਆਂ ਨੇ ਬੀੜਾਂ ਉਹ ਏਸ ਗੱਲ ਨੂੰ ਨਈ ਸਮਝਦੇ ਸਾਧ ਸੰਗਤਿ ਜੀ ਕਿ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ..
                    ਤੇ ਹਿੰਦੀ ਵਿੱਚ ..ਤੇ ਹੋਰ ਫਾਰਸੀ ਵਿੱਚ ਕਿੰਨਾ ਕਿੰਨਾ ਚਿਰ ਲਾ ਕੇ ਪੜਦੇ ਰਹੇ ਓ, ਸ੍ਰੀ ਗੁਰੂ
                    ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦਾ ਪਾਠ ਕਰਨ ਵਾਸਤੇ ਏਨੀ ਮਿਹਨਤ ਨਈ ਕਰਨੀ ਚਾਹੁੰਦੇ ਏਡੇ ਦਲਿਦਰੀ ਹੋ .. ਤੇ ਫੇ
                    ਸ਼ੁੱਧ ਪਾਠ ਜੇ ਗਲਤ ਛਾਪੇ ਹੋਣਗੇ ਪਦ ਛੇਦ ਗਲਤ ਹੋਣਗੇ ਤਾਂ ਓਹੀ ਨਈ ਕਰਿਆ ਕਰੋਗੇ ਓ ਤੁਸੀ? ਤਾਂ
                    ਤੁਸੀ ਚੰਗੇ ਸਿਆਣੇ ਬਣੋਗੇ । ਆਪਣੀ ਗੁਰਮਤਿ ਵਿਦਿਆ ਨੂੰ ਪੜਣਾ ਨਈ ਚਾਹੁੰਦੇ, ਏਥੇ ਕਮਜੋਰੀ ਹੈ
                    ਸਾਡੇ ਅੰਦਰ ਆਈ ਹੋਈ।"
                </p>
                <div className="h-px bg-[#3E2723]/10 my-4" />
                <p className="text-sm">
                    They emphasized that a Singh must be Tyar Bar Tyar not just in dress, but in
                    intellect and spirit. They traveled tirelessly to villages to teach pure Santhia
                    (pronunciation), believing that if the root (Gurbani) is watered, the fruit
                    (Sikhi Jeevan) will naturally be sweet.
                </p>
            </WisdomModal>

            <WisdomModal
                id="modal-2"
                isOpen={openWisdomModal === "2"}
                onClose={() => setOpenWisdomModal(null)}
                imageSrc="/assets/Sant_Giani_Kartar_Singh_Ji_Khalsa_Bhindranwale.jpg"
                imageAlt="Sant Gyani Kartar Singh Ji Bhindrawale"
                name="Sant Gyani Kartar Singh Ji"
                subtitle="Khalsa Bhindranwale"
            >
                <p>
                    "ਸੰਤ ਗਿਆਨੀ ਕਰਤਾਰ ਸਿੰਘ ਜੀ ਭਿੰਡਰਾਂਵਾਲਿਆਂ ਦੇ ਪਦਛੇਦ ਦੇ ਵਿਰੋਧ ਵਿੱਚ ਕਥਾ ਦੀ ਰਿਕਾਰਡਿੰਗ
                    ਚੋ ਮਿਲੇ ਬਚਨਃ- ਏਸ ਵਾਸਤੇ ਪਦ ਛੇਦ ਕਰਨਾ ਏਹ ਅਤਿਅੰਤਿ ਮਨ੍ਹਾ ਹੈ।ਗੁਰੂ ਕੇ ਪਦਾਂ ਨੂੰ ਛੇਦ
                    ਕੱਟਣਾ ਜਾਂ ਪਦ ਛੇਦ ਕਰਨਾ ਜਾਂ ਹੁਣ ਕਹਿੰਦੇ ਨੇ ਕਿ ਅੱਗੋ ਕੱਟਣਾ ਅੱਖਰ ਹਟਾ ਦਿਓ ਤੇ ਪਦ ਵੰਡ ਕਹਿ
                    ਦੋ। ਕਿ ਗੁਰੂ ਕਿ ਪਦਾਂ ਨੂੰ ਵੰਡਣਾ, ਵੰਡਣਾ ਕਹਿ ਦਿਓ ਕੱਟਣਾ ਕਹਿ ਦਿਓ ਅਲਿਹਦਾ ਅਲਿਹਦਾ ਕਰਨਾ
                    ਕਹਿ ਦਿਓ ਅਰਥ ਏਹਨਾ ਦਾ ਇਕੋ ਨਿਕਲਣਾ ਪਦ ਅਰਥ ਜਿੰਨੇ ਮਰਜ਼ੀ ਬਣਾ ਲਵੋ। ਏਸ ਵਾਸਤੇ ਪਦ ਵੰਡ , ਪਦ
                    ਛੇਦ ਏਹੁ ਅਤਿਅੰਤਿ ਮਨ੍ਹਾਂ ਹੈ ।"
                </p>
                <div className="h-px bg-[#3E2723]/10 my-4" />
                <p className="text-sm">
                    "We must guard the traditions of the Guru like a fortress. If we let go of our
                    distinct Rehat and Vidya, we lose the essence of what it means to be Khalsa."
                    Sant Kartar Singh Ji was a fierce advocate for traditional Gurmat Vidya.
                </p>
            </WisdomModal>

            <WisdomModal
                id="modal-3"
                isOpen={openWisdomModal === "3"}
                onClose={() => setOpenWisdomModal(null)}
                imageSrc="https://live.staticflickr.com/65535/50221817848_ed394301d8_z.jpg"
                imageAlt="Bhai Sahib Bhai Randheer Singh Ji"
                name="Bhai Sahib Bhai Randheer Singh Ji"
                subtitle="Akhand Kirtani Jatha"
            >
                <p style={{ whiteSpace: "pre-line" }}>
                    {`ਪੰਥ ਦੀ ਸੋਨ ਚਿੜੀ ਭਾਈ ਸਾਹਿਬ ਰਣਧੀਰ ਸਿੰਘ ਜੀ ਨੇ ਆਪਣੀ ਰਚਨਾ "ਜੋਤਿ ਵਿਗਾਸ" 'ਚ ਕਵਿਤਾਵਾਂ ਵੀ ਅੰਕਿਤ ਕੀਤੀਆ ਹਨ
"ਸਾਵਧਾਨ ਹੋਇ ਪੁਛਿਆ ਗੁਰਮੁਖੇ ਤੋਂ, ਕਾਰਨ ਮੂਲ ਇਸ ਪਦ ਪ੍ਰਾਪਤੋਲਿਆਂ ਦਾ।
ਤਿਨਾਂ ਦਸਿਆ ਨਿਮਰੀਭੂਤ ਹੋ ਕੇ, ਸਭ ਪਰਤਾਪੁ ਗੁਰ ਵਰ ਲਿੱਖਣੋਲਿਆਂ ਦਾ।
ਬਖ਼ਸ਼ੀ ਦਾਤ ਵੱਡੀ ਕਰਾਮਾਤ ਵਾਲੀ, ਵਰ ਵਡਾਣ ਏਹ ਕਲਮ ਸ਼ਕਤੋਲਿਆਂ ਦਾ।
ਲਿਖਣ-ਕਲਾ ਦੀ ਕਥਾ ਵਿਸਥਾਰ ਸੁਣ ਕੇ, ਧੁਰਵਾ ਹੋਰ ਬੱਝਾ ਮੂੰ ਸਿਦਕੋਲਿਆਂ ਦਾ।"

"ਰਚਨਾ ਛਡਿ ਦਿਤੀ ਲਿਖਤ ਬਾਣੀਆਂ ਦੀ, ਨਵਾਂ ਰਾਹੁ ਫੜਿਆ ਫੈਸ਼ਨੋਲਿਆਂ ਦਾ।
ਛਾਪੇ-ਖ਼ਾਨਿਆਂ ਦੀ ਭੈੜੀ ਰੀਤ ਚੱਲੀ, ਭੈੜਾ ਚਾਲੜਾ ਦੰਮ ਖਟੋਲਿਆਂ ਦਾ।"

"ਹਾਇ ਲਿਖਤ ਮਹੱਤਤਾ ਰੋੜ੍ਹ ਦਿਤੀ, ਸਿਦਕ ਤੋੜ ਕੇ ਤੱਤ ਵਣਜੋਲਿਆਂ ਦਾ।
ਤੱਤ ਸੱਤ ਸਉਦਾ ਕੋਈ ਵਣਜਦਾ ਨਾ, ਹੋਇਆ ਵਣਜੁ ਪਰਧਾਨੁ ਦਮੜੋਲਿਆਂ ਦਾ।"`}
                </p>
            </WisdomModal>

            {/* Jathedar modal */}
            <div
                className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-250 ${
                    openWisdomModal === "jathedar"
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                style={{ display: openWisdomModal === "jathedar" ? "flex" : "none" }}
            >
                <div
                    className="absolute inset-0 bg-[#3E2723]/80 backdrop-blur-sm"
                    onClick={() => setOpenWisdomModal(null)}
                />
                <div className="relative bg-white/95 backdrop-blur-xl border border-white/50 shadow-2xl rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
                    <button
                        onClick={() => setOpenWisdomModal(null)}
                        className="absolute top-4 right-4 z-20 p-2 bg-white/50 rounded-full hover:bg-[#B45309] hover:text-white text-[#3E2723] transition"
                    >
                        <CloseIcon />
                    </button>
                    <div className="md:w-2/5 h-64 md:h-auto relative flex-shrink-0">
                        <Image
                            src="/assets/jathedar.jpeg"
                            alt="Jathedar Ji"
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 40vw"
                        />
                    </div>
                    <div className="md:w-3/5 p-8 md:p-10 overflow-y-auto max-h-[90vh] custom-scrollbar bg-white/50 backdrop-blur-md">
                        <h3 className="text-3xl font-bold text-[#3E2723] mb-1">
                            Words from Jathedar Ji
                        </h3>
                        <p className="text-[#B45309] text-sm font-bold uppercase tracking-widest mb-8">
                            ਸਿਮਰਨਜੀਤ ਸਿੰਘ
                        </p>
                        <div className="text-[#3E2723]/90 leading-relaxed space-y-5 font-medium text-sm">
                            {/* Opening Shabad */}
                            <p className="text-[#B45309] font-bold italic text-base border-l-4 border-[#B45309] pl-4 bg-[#B45309]/5 py-2 rounded-r-lg">
                                ਧੰਨੁ ਸੁ ਕਾਗਦੁ ਕਲਮ ਧੰਨੁ ਧਨੁ ਭਾਂਡਾ ਧਨੁ ਮਸੁ ॥
                                <br />
                                ਧਨੁ ਲੇਖਾਰੀ ਨਾਨਕਾ ਜਿਨਿ ਨਾਮੁ ਲਿਖਾਇਆ ਸਚੁ ॥੧॥
                            </p>

                            {/* Para 1 */}
                            <p>
                                ਸਤਿਗੁਰੁ ਸਚੇ ਪਾਤਿਸ਼ਾਹ ਨਿਰੰਕਾਰੀ ਜੋਤਿ ਗੁਰੂ ਨਾਨਕ ਸਾਹਿਬ ਜੀ ਨੇ ਸਮੁੱਚੀ
                                ਮਾਨਵਤਾ ਤੇ ਉਧਾਰ ਲਈ ਜਨਮ ਧਾਰਿਆ। ਵੱਖ ਵੱਖ ਥਾਈਂ ਭਰਮਣ ਕਰਕੇ ਬੇਅੰਤ ਭਟਕਿਆ ਨੂੰ
                                ਸਿੱਧੇ ਰਾਹ ਪਾਇਆ ਤੇ ਉਹਨਾਂ ਨੂੰ ਸਬਦ ਦੇ ਲੜ ਲਾਇਆ। ਜਨਮਸਾਖੀਆਂ ਅਨੁਸਾਰ ਗੁਰੂ
                                ਸਾਹਿਬ ਜੀ ਜਿੱਥੇ ਬਾਬਾ ਮਰਦਾਨਾ ਜੀ ਨੂੰ ਆਖਦੇ ਕਿ "ਛੇੜ ਮਰਦਾਨਿਆ ਰਬਾਬ ਕਾਈ ਸਿਫਤ
                                ਖ਼ੁਦਾ ਦੇ ਦੀਦਾਰ ਦੀ ਕਰੀਏ" ਅਤੇ ਉਸ ਅੰਮ੍ਰਿਤ ਰੂਪੀ ਬਾਣੀ ਨੂੰ ਮਾਣਦੇ ਤੇ ਬਾਬਾ
                                ਮਰਦਾਨਾ ਜੀ ਨਾਲ ਰਬਾਬ ਦੀ ਧੁੰਨ ਵਿੱਚ ਉਸ ਦਾ ਕੀਰਤਨ ਕਰਦੇ, ਓਥੇ ਜਨਮਸਾਖੀ ਚ ਇਹੁ
                                ਵੀ ਪੜ੍ਹੀਦਾ ਹੈ ਕਿ ਗੁਰੂ ਸਾਹਿਬ ਉਸ ਗਾਵੀ ਹੋਈ ਬਾਣੀ ਨੂੰ ਕਾਗਦੁ ਪਰ ਲਿਖ ਲੈਂਦੇ
                                ਸਨ। ਸਾਖੀਆਂ ਸਾਖ ਭਰਦੀਆਂ ਨੇ ਕਿ ਜਦੋਂ ਉਦਾਸੀਆਂ ਵੇਲੇ ਤੁਰਦੇ ਤਾਂ ਵੱਡੇ ਬੇਬੇ ਜੀ
                                ਬੇਬੇ ਨਾਨਕੀ ਜੀ ਉਹਨਾਂ ਨੂੰ ਸਿਆਹੀ ਦੀਆਂ ਵੱਟੀਆਂ ਬਣਾ ਕਰ ਨਾਲ ਦਿੰਦੇ ਜਿਨ੍ਹਾਂ
                                ਨੂੰ ਲੋੜ ਅਨੁਸਾਰ ਜਲ ਲਗਾ ਕੇ ਉਸ ਵਿਚ ਲੇਖਣੀ/ਕਲਮ ਡੋਬ ਕਰ ਲਿਖਿਆ ਜਾ ਸਕਦਾ ਸੀ।
                                ਸੋ ਏਥੋ ਹੀ ਗੁਰਬਾਣੀ ਲਿਖਣ ਪਰੰਪਰਾ ਦਾ ਮੁੱਢ ਬੱਝਦਾ ਹੈ ਜੋ ਗੁਰੂ ਪਿਤਾ ਜੀ ਨੇ ਆਪ
                                ਏਸ ਦੀ ਆਰੰਭਤਾ ਕੀਤੀ।
                            </p>

                            {/* Para 2 */}
                            <p>
                                ਹੱਥ ਲਿਖਤ ਦਾ ਇਤਿਹਾਸ ਬਹੁਤ ਪੁਰਾਣਾ ਹੈ। ਮਨੁੱਖ ਬਹੁਤ ਲੰਮੇ ਸਮੇਂ ਤੋਂ ਲਿਖਦਾ ਆ
                                ਰਿਹਾ ਹੈ। ਗੁਰਮੁਖੀ ਲਿਖਣ ਪਰੰਪਰਾ ਵੀ ਬਹੁਤ ਹੀ ਪੁਰਾਣੀ ਹੈ। ਗੁਰਮੁਖੀ ਸਮਰਾਟ
                                ਅਸ਼ੋਕ ਦੇ ਵੇਲੇ ਦੇ ਸ਼ਿਲਾਲੇਖਾਂ ਚ ਅਤੇ ਅਗਰ ਏਸ ਤੋਂ ਵੀ ਪਹਿਲੇ ਜਾਈਏ ਤਾਂ
                                ਮਹੋਂਜਦੜੋ ਸਭਿਅਤਾ ਦੇ ਨਾਲ ਵੀ ਸੰਬੰਧ ਮਿਲ ਜਾਂਦੇ ਨੇ। ਗੁਰਮੁਖੀ ਜਦੋਂ ਗੁਰੂ
                                ਸਾਹਿਬ ਜੀ ਤੱਕ ਪਹੁੰਚੀ ਤਾਂ ਇਹ ਬਹੁਤ ਜਿਆਦਾ ਵਿਕਸਿਤ ਹੋ ਚੁੱਕੀ — ਪੁਰਾਣੇ
                                ਪੰਡਿਤਾਂ ਵਿਦਵਾਨਾ ਨੇ ਬਹੁਤ ਮਹੀਨ ਖੋਜ ਤੇ ਮਿਹਨਤ ਨਾਲ ਏਸ ਨੂੰ ਵਿਕਸਿਤ ਤੇ
                                ਸੰਪੂਰਨ ਕੀਤਾ।
                            </p>

                            {/* Para 3 */}
                            <p>
                                ਪੁਰਾਣੇ ਸਮਿਆਂ ਚ ਅਗਰ ਕੋਈ ਕਿਤਾਬ ਲਿਖੀ ਜਾਂਦੀ ਤਾਂ ਹੁਣ ਵਾਂਗ ਛਾਪਾ ਨਾ ਹੋਣ
                                ਕਰਕੇ ਲਿਖਾਰੀਆਂ ਨੂੰ ਏਹ ਕਾਰਜ ਦਿਤਾ ਜਾਂਦਾ ਸੀ। ਤੇ ਉਹ ਲਿਖਾਰੀ ਕਿਤਾਬਾਂ ਦੇ ਵੱਧ
                                ਤੋ ਵੱਧ ਉਲੱਥੇ ਕਰਦੇ ਜਿਵੇ ਅੱਜਕੱਲ੍ਹ ਛਾਪੇ ਵਾਲੀ ਮਸ਼ੀਨ ਕਰਦੀ ਹੈ। ਉਹ ਲਿਖਾਰੀ
                                ਆਪਣੀ ਕਲਾ ਚ ਨਿਪੁੰਨ ਹੁੰਦੇ ਸਨ — ਕੇਵਲ ਅਖਰਾਂ ਦਾ ਗਿਆਨ ਜਾਂ ਸੁੰਦਰ ਲਿਖਾਵਟ ਹੀ
                                ਇਕ ਲਿਖਾਰੀ ਨਈ ਬਣਾ ਸਕਦੀ; ਉਸ ਲਈ ਇਕ ਸਾਰ ਲਿਖਣਾ, ਸਿਆਹੀ ਦੀ ਛਿੱਟ ਨਾ ਪੈਣ
                                ਦੇਣਾ, ਕਾਗਜ਼ ਤੇ ਬੇਨਿਸ਼ਾਨ ਲੀਕਾਂ ਮਾਰਨੀਆਂ ਅਤੇ ਆਦਿ ਤੋ ਅੰਤ ਇਕੋ ਜਿਹਾ ਹਾਸ਼ੀਆ
                                ਖਿੱਚ ਕੇ ਇਕਸਾਰਤਾ ਚ ਲਿਖਣਾ ਜਰੂਰੀ ਹੁੰਦਾ ਹੈ।
                            </p>

                            {/* Para 4 */}
                            <p>
                                ਗੁਰਬਾਣੀ ਲਿਖਣ ਪਰੰਪਰਾ ਏਸ ਆਮ ਲਿਖਣ ਸ਼ੈਲੀ ਤੋ ਥੌੜੀ ਅੱਡਰੀ ਹੈ। ਪੁਰਾਣੀਆਂ
                                ਬੀੜਾਂ ਦੇ ਅਧਿਐਨ ਨਾਲ ਏਹੁ ਪਰਤੱਖ ਹੁੰਦਾ ਹੈ ਕਿ ਪੁਰਾਤਨ ਲਿਖਾਰੀ ਕਿੰਨੇ ਸੂਝ ਬੂਝ
                                ਵਾਲੇ ਸਨ। ਲਿਖਾਵਟ ਏਨੀ ਸੋਹਣੀ ਕਿ ਛਾਪੇ ਨੂੰ ਵੀ ਮਾਤ ਪੈਂਦੀ ਏ। ਗੁਰਬਾਣੀ ਦੀ
                                ਲਿਖਾਈ ਦਾ ਵੱਡਾ ਨੁਕਤਾ ਹੈ ਉਸ ਵਿੱਚ ਵਿਆਕਰਣਕ ਦ੍ਰਿਸ਼ਟੀ ਤੋ ਮੁਕਤਾ ਸਿਹਾਰੀ ਔਂਕੜ
                                ਕਿਥੇ ਕਿਥੇ ਵਰਤਨੇ ਨੇ। ਗੁਰੂ ਸਾਹਿਬ ਦੀ ਸਿਖਲਾਈ ਨੇ ਬਹੁਤੇ ਲਿਖਾਰੀਆਂ ਨੂੰ ਏਸ
                                ਕਲਾ ਚ ਨਿਪੁੰਨ ਕੀਤਾ ਤਾਂ ਕਿ ਸ਼ਬਦ ਜੋੜ ਦਾ ਭੇਦ ਵਿਆਕਰਣ ਦੀ ਭਿੰਨਤਾ ਨਾਲ ਵਖਰਾ
                                ਦਰਸਾਇਆ ਜਾ ਸਕੇ।
                            </p>

                            {/* Para 5 */}
                            <p>
                                ਜਨਮਸਾਖੀਆਂ ਅਨੁਸਾਰ ਗੁਰੂ ਨਾਨਕ ਸਾਹਿਬ ਜੀ ਪਾਸ ਕਰਤਾਰਪੁਰ ਆ ਕੇ ਭਾਈ ਮਨਸੁਖ, ਭਾਈ
                                ਭਗੀਰਥ, ਭਾਈ ਪੈੜਾ ਮੋਖਾ, ਭਾਈ ਹੱਸੂ ਲੁਹਾਰ, ਭਾਈ ਸ਼ੀਹਾਂ ਛੀਬਾਂ, ਭਾਈ ਸੈਦੋ ਘੇਉ
                                — ਬਾਣੀ ਲਿਖਣ ਦਾ ਕਾਰਜ ਕਰਦੇ ਰਹੇ ਹਨ। ਅੱਗੋ ਇਹੁ ਪੋਥੀਆਂ ਗੁਰੂ ਅੰਗਦ ਦੇਵ ਜੀ
                                ਪਾਸ ਪਹੁੰਚੀਆਂ, ਫੇਰ ਗੁਰੂ ਅਮਰਦਾਸ ਜੀ ਨੇ ਇਹਨਾਂ ਦੀਆਂ ਅੱਗੋਂ ਨਕਲਾਂ ਕਰਵਾਈਆਂ।
                                ਮੁੜ ਗੁਰੂ ਅਰਜੁਨ ਦੇਵ ਜੀ ਏਸ ਪਰੰਪਰਾ ਨੂੰ ਅੱਗੇ ਵਧਾਉਂਦੇ ਨੇ — ਭਾਈ ਗੁਰਦਾਸ ਜੀ
                                ਨੂੰ ਲਿਖਾਰੀ ਥਾਪ ਕੇ ਆਦਿ ਬੀੜ ਦੀ ਰਚਨਾ ਕੀਤੀ ਜਿਸ ਵਿੱਚ ਸਾਰੇ ਗੁਰੂ ਸਾਹਿਬਾਨਾਂ,
                                ਸ਼੍ਰੋਮਣੀ ਭਗਤਾਂ, ਭੱਟ ਸਾਹਿਬਾਨਾਂ ਅਤੇ ਪਿਆਰੇ ਗੁਰਸਿਖੜਿਆਂ ਦੀ ਬਾਣੀ ਸ਼ਾਮਿਲ
                                ਹੈ। ਫੇਰ ਸ੍ਰੀ ਕਲਗੀਧਰ ਪਿਤਾ ਜੀ ਨੇ ਸੰਪੂਰਨ ਆਦਿ ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ
                                ਦੀ ਬਾਣੀ ਭਾਈ ਮਨੀ ਸਿੰਘ ਸ਼ਹੀਦ ਜੀ ਪਾਸੋਂ ਲੜੀਵਾਰ ਰੂਪ ਚ ਲਿਖਵਾਈ, ਅਤੇ ਉਸੇ ਬੀੜ
                                ਨੂੰ ਨਾਂੜੇਦ ਵਿਖੇ ਗੁਰਿਆਈ ਦਾ ਤਿਲਕ ਦੇ ਕਰ ਸਿਖਾਂ ਨੂੰ ਗੁਰੂ ਕੇ ਲੜ ਲਾ ਕੇ
                                ਸਚਖੰਡ ਪਿਆਨਾ ਕੀਤਾ।
                            </p>

                            {/* Para 6 */}
                            <p>
                                ਮੁੜ ਉਸ ਤੋਂ ਉਪਰੰਤ ਬਾਬਾ ਦੀਪ ਸਿੰਘ ਜੀ ਸ਼ਹੀਦ ਵਰਗੇ ਲਿਖਾਰੀਆਂ ਨੇ ਅਗਾਂਹ ਉਸ
                                ਪਾਵਨ ਬੀੜ ਦੇ ਉਤਾਰੇ ਕੀਤੇ। ਸੇਵਪੰਥੀ, ਨਿਰਮਲੇ ਅਤੇ ਉਦਾਸੀਨ ਸੰਪਰਦਾਇ ਦੇ
                                ਵਿਦਵਾਨਾਂ ਨੇ ਵੱਖੋ ਵੱਖੋ ਉਪਰਾਲੇ ਕੀਤੇ ਅਤੇ ਬੀੜ ਦੇ ਅਗਾਂਹ ਉਤਾਰੇ ਕੀਤੇ। ਏਸ
                                ਉਤਾਰਿਆਂ ਚ ਬੀੜਾਂ ਦੇ ਅਕਾਰ, ਲਿਖਾਵਟ, ਹਾਸ਼ੀਏ, ਜਿਲਦ, ਪੱਤਰਿਆਂ ਦੀ ਗਿਣਤੀ ਸਬ
                                ਅੱਡੋ ਅੱਡੋ ਵਿਸ਼ੇਸ਼ ਤੇ ਸੁੰਦਰ ਹਨ। ਅਸੀ ਅੱਜ ਵੀ ਉਹਨਾਂ ਵਿਚੋ ਕਈ ਬੀੜਾਂ ਦੇ
                                ਦਰਸ਼ਨ ਕਰ ਸਕਦੇ ਆ।
                            </p>

                            {/* Para 7 */}
                            <p>
                                ਫੇ ਉੰਨੀਵੀਂ ਸਦੀ ਦੇ ਆਖੀਰ ਚ ਅੰਗਰੇਜਾਂ ਦੇ ਰਾਜ ਸਮੇ ਪਹਿਲੀ ਬੀੜ ਛਾਪੇਖਾਨੇ ਚ
                                ਛਪਦੀ ਹੈ। ਜਿਸ ਤੇ ਪੰਥ ਨੇ ਬਹੁਤ ਵਿਰੋਧ ਵੀ ਕੀਤਾ ਕਿਉਂਕਿ ਏਸ ਤੋ ਪਹਿਲਾ ਪੰਥ ਚ
                                ਕੇਵਲ ਹਥਲਿਖਤ ਬੀੜਾਂ ਹੀ ਮੌਜੂਦ ਸਨ। ਪਰੰਤੂ ਸਮੇ ਦੀ ਢਿਲਿਆਈ ਨੇ ਛਾਪੇ ਖਾਨੇ ਦੀ
                                ਮਾੜੀ ਪਿਰਤ ਸ਼ੁਰੂ ਕਰ ਦਿੱਤੀ। ੧੯੦੦ ਤੋਂ ਬਾਅਦ ਬੀੜਾਂ ਦਾ ਛਪਣਾ ਬਹੁਤ ਹੀ ਆਮ ਹੋ
                                ਗਿਆ। ਹੁਣ ਹਾਲ ਏਹੁ ਹੈ ਕਿ ਕੋਈ ਵੀ ਲਿਖਣ ਨੂੰ ਲੰਮੇਰਾ ਕਾਰਜ ਮੰਨ ਕੇ ਏਹੁ ਸੇਵਾ
                                ਕਰਣੀ ਨਈ ਚਾਹ ਰਿਹਾ ਕਿਉਂਕਿ ਛਪਿਆ ਛਪਾਇਆ ਸਬ ਕੁਜ ਹਾਜ਼ਿਰ ਹੋ ਰਿਹਾ ਹੈ।
                            </p>

                            {/* Gurbani quote block */}
                            <div className="border-l-4 border-[#B45309]/50 pl-4 bg-[#B45309]/5 py-3 rounded-r-lg space-y-2">
                                <p className="text-[#B45309] font-bold italic">
                                    ਕਹਤੇ ਪਵਿਤ੍ਰ ਸੁਣਤੇ ਸਭਿ ਧੰਨੁ ਲਿਖਤੀਂ ਕੁਲੁ ਤਾਰਿਆ ਜੀਉ ॥
                                </p>
                                <p className="text-[#3E2723]/80 text-xs">
                                    ਹੱਥਾਂ ਨਾਲ ਗੁਰਬਾਣੀ ਲਿਖਿਆ ਹੱਥ ਪਵਿੱਤਰ ਹੁੰਦੇ ਨੇ। ਜੀਵਨ ਚ ਸਹਿਜ ਆਉਂਦਾ
                                    ਹੈ। ਗੁਰੂ ਪ੍ਰਤੀ ਪ੍ਰੇਮ ਵੱਧਦਾ ਹੈ।
                                </p>
                            </div>

                            {/* Para 8 */}
                            <p>
                                ਗੜ ਅਨੰਦ ਵੀ ਏਸੇ ਸਮੇਂ ਚ ਗੁਰਬਾਣੀ ਲਿਖਣ ਪਰੰਪਰਾ ਲਈ ਕਾਰਜ਼ਸ਼ੀਲ ਹੈ। ਤਕਰੀਬਨ
                                ੨੦੧੮ ਈ ਤੋ ਵੱਖ ਵੱਖ ਸ਼ਹਿਰਾਂ ਚ ਕਾਰਜ਼ਸ਼ਾਲਾ ਲਗਾ ਕਰ ਸੰਗਤਿ ਚ ਏਸ ਲਿਖਣ ਪਰੰਪਰਾ
                                ਦਾ ਪ੍ਰਚਾਰ ਪ੍ਰਸਾਰ ਕਰ ਰਹੀ ਹੈ। ਹਰ ਸਾਲ ਜਨਵਰੀ-ਫਰਵਰੀ ਚ ਵੱਡਾ ਸਾਲਾਨਾ ਕੈਂਪ
                                "ਕੈਂਪ ਲਿਖਾਰੀਆਂ" ਦੇ ਨਾਮ ਹੇਠ ੨੦੨੦ ਤੋ ਹਰ ਸਾਲ ਲਗਾਇਆ ਜਾਂਦਾ ਹੈ ਜਿਸ ਵਿਚ
                                ਬੱਚਿਆ ਨੂੰ ਗੁਰਬਾਣੀ ਲਿਖਣ ਪਰੰਪਰਾ ਦੇ ਨਾਲ-ਨਾਲ ਗੁਰਸਿਖ ਜੀਵਨ ਜਾਂਚ ਵੀ ਸਿਖਾਈ
                                ਜਾਂਦੀ ਹੈ।
                            </p>

                            {/* Para 9 */}
                            <p>
                                ਜਥੇਬੰਦਕ ਤੌਰ ਤੇ ਕੁਜ ਸੇਵਾਦਾਰ — ਵੀਰ ਇੰਦਰਜੀਤ ਸਿੰਘ ਜੀ (ਜਰਮਨੀ), ਭੈਣਜੀ
                                ਇਸ਼ਮੀਨ ਕੌਰ ਜੀ (ਦਿੱਲੀ), ਭੈਣ ਨਿਤਜੱਪ ਕੌਰ ਜੀ (ਜਲੰਧਰ), ਭੈਣ ਦਿੱਵਿਆ ਕਲਵਾਣੀ
                                ਜੀ (ਉਲਾਸਨਗਰ), ਵੀਰ ਕਮਲਦੀਪ ਸਿੰਘ ਜੀ (ਭੌਪਾਲ), ਵੀਰ ਅਜ਼ਾਦ ਕੰਬੋਜ — ਪੱਕੇ ਤੌਰ
                                ਪਰ ਨਾਲ ਜੁੜ ਕੇ ਏਸ ਸੇਵਾ ਨੂੰ ਅੱਗੇ ਲੈ ਕੇ ਜਾ ਰਹੇ ਹਨ। ਗੜ ਅਨੰਦ ਨਾਲ ਤਕਰੀਬਨ
                                ੩੦-੪੦ ਲਿਖਾਰੀ ਜੁੜੇ ਹਨ ਜੋ ਪੰਥ ਪਰਵਾਣਿਤ ਬੀੜ ਸਾਹਿਬ ਦੇ ਪੂਰਨ ਵਿਧਿ ਪੂਰਵਕ
                                ਉਤਾਰੇ ਕਰ ਰਹੇ ਹਨ ਅਤੇ ੨੦੦ ਕੁ ਲਿਖਾਰੀ ਹਨ ਜੋ ਪੋਥੀਆਂ ਸਾਹਿਬ ਤੇ ਗੁਟਕੇ ਤਿਆਰ
                                ਕਰ ਰਹੇ ਹਨ।
                            </p>

                            {/* Para 10 */}
                            <p>
                                ਗੜ ਅਨੰਦ ਚ ਅਸੀ ਅਖਰਾਂ ਦੀ ਬਣਾਵਟ, ਅੱਖਰ ਜੋੜਣੇ, ਕਾਗਜ਼ ਤੇ ਲੀਕਾਂ ਮਾਰਨੀਆਂ,
                                ਹਾਸ਼ੀਏ, ਹੜਤਾਲ, ਅਤੇ ਲਿਖਣ ਦੇ ਸਾਰੇ ਨੁਕਤੇ ਸਿਖਾਉਂਦੇ ਹਾਂ ਤਾਂ ਕਿ ਗੁਰਬਾਣੀ
                                ਲਿਖਣ ਵੇਲੇ ਕਿਸੇ ਕਿਸਮ ਦੀ ਚੂਕ ਤੋ ਬਚਿਆ ਜਾ ਸਕੇ। ਜਿਤਨਾ ਚਿਰ ਇਕ ਵਿਦਿਆਰਥੀ
                                ਚੰਗਾ ਲਿਖਣ ਯੋਗ ਨਈ ਹੋ ਜਾਂਦਾ ਤੇ ਸਾਰੇ ਨਿਯਮ ਪੱਕੇ ਨਈ ਕਰ ਲੈਂਦਾ, ਉਤਨਾ ਚਿਰ ਉਸ
                                ਨੂੰ ਗੁਰਬਾਣੀ ਨਈ ਲਿਖਣ ਦਿਤੀ ਜਾਂਦੀ। ਸਾਰੇ ਲਿਖਾਰੀਆਂ ਨੂੰ ਕਾਗਜ਼, ਕਲਮਾਂ,
                                ਸਿਆਹੀ, ਲਿਖਣ ਲਈ ਆਸਣ — ਸਬ ਸਮੱਗਰੀ ਮਹੁੱਈਆ ਕਰਵਾਂਦੇ ਹਾਂ। ਗੜ ਅਨੰਦ ਚ ਏਹੁ
                                ਸਾਰਾ ਕਾਰਜ ਸਾਡੇ ਸੇਵਾਦਾਰਾਂ ਅਤੇ ਸੰਗਤਿ ਦੇ ਦਸਵੰਧ ਨਾਲ ਹੀ ਚੱਲ ਰਹੇ ਨੇ।
                            </p>

                            {/* Closing ardaas */}
                            <p className="text-[#3E2723]/80 italic">
                                ਅਰਦਾਸ ਹੈ ਕਿ ਮਹਾਰਾਜ ਸੱਚੇ ਪਾਤਸ਼ਾਹ ਕਿਰਪਾ ਬਣਾਈ ਰੱਖਣ ਲਗਾਤਾਰਾ ਚ ਸੇਵਾ ਲੈਂਦੇ
                                ਰਹਿਣ।
                            </p>

                            {/* Signature block */}
                            <div className="mt-6 pt-4 border-t border-[#3E2723]/10">
                                <p className="font-bold text-[#3E2723]">
                                    ਨੀਚਾ ਅੰਦਰਿ ਨੀਚ ਜਾਤਿ ਨੀਚੀ ਹੂ ਅਤਿ ਨੀਚ
                                </p>
                                <p className="text-[#B45309] font-semibold text-xs mt-1">
                                    ਗੁਰੂ ਗ੍ਰੰਥ ਜੀ ਗੁਰੂ ਪੰਥ ਜੀ ਅਤੇ ਸਾਧਸੰਗਤਿ ਦਾ ਗੋਲਾ
                                </p>
                                <p className="text-[#3E2723] mt-2 font-bold">ਸਿਮਰਨਜੀਤ ਸਿੰਘ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Gallery Modal ── */}
            <GalleryModal
                isOpen={galleryCategory !== null}
                category={galleryCategory}
                onClose={() => setGalleryCategory(null)}
                onImageClick={setLightboxSrc}
            />

            {/* ── Lightbox ── */}
            <ImageModal src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
        </>
    );
}

// ─── Tiny icon components ─────────────────────────────────────────────────────

function PhoneIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    );
}
function GlobeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" x2="22" y1="12" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    );
}
function MailIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}
function InstagramIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}
function YoutubeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
            <path d="m10 15 5-3-5-3z" />
        </svg>
    );
}
