"use client";
// Garh Anand v2 — premium spiritual heritage homepage

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

// ─── Types ─────────────────────────────────────────────────────────────────────
type GalleryCategory = "gurbani" | "tradition" | "camps" | "online";
interface GalleryData {
    title: string;
    images: string[];
}

// ─── Constants ──────────────────────────────────────────────────────────────────
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

const TIMELINE_MILESTONES = [
    {
        year: "2018",
        title: "Foundation",
        desc: "Garh Anand was born — a small circle of Sikhs committed to reviving Gurbani writing in its original Larivaar form.",
    },
    {
        year: "2019",
        title: "First Writing Camp",
        desc: "The first 'Camp Likharian' opened its doors, teaching Santhia, qalam technique, and traditional ink preparation.",
    },
    {
        year: "2021",
        title: "Online Circles",
        desc: "Lockdown turned crisis into opportunity — one-to-one Akharkaari classes and a book club reached Sangat worldwide.",
    },
    {
        year: "2022",
        title: "200+ Likharis",
        desc: "Over 200 Likharis joined the movement, with 30–40 now producing full Saroop-level Beerh Sahibs by hand.",
    },
    {
        year: "2023",
        title: "400+ Students",
        desc: "Annual camps, city workshops, and digital classes together crossed 400 students trained in Gurbani writing traditions.",
    },
    {
        year: "2025",
        title: "Vidyalay Vision",
        desc: "Plans underway for a permanent centre for Gatka, Santhia, Raag Vidya, and Akharkaari — the first of its kind.",
    },
];

const TESTIMONIALS = [
    {
        name: "Harpreet Kaur",
        location: "Ludhiana",
        role: "Parent",
        quote: "My daughter was glued to her phone. After two weeks at Camp Likharian, she sits with a qalam every morning before school. The change is nothing short of miraculous.",
        img: "/assets/cw5.jpeg",
    },
    {
        name: "Balvinder Singh",
        location: "Brampton",
        role: "Student",
        quote: "Living abroad, I thought I'd lost my connection to Sikhi. Learning to write Gurbani in Larivaar brought me back — not just to Bani, but to myself.",
        img: "/assets/cw0.jpeg",
    },
    {
        name: "Gurpreet Kaur",
        location: "Delhi",
        role: "Teacher & Sevadaar",
        quote: "I have attended dozens of Sikh camps. None come close to the depth of learning here. Jathedar Ji's guidance transforms every session into a spiritual experience.",
        img: "/assets/ol2.jpeg",
    },
    {
        name: "Amandeep Singh",
        location: "Amritsar",
        role: "Student",
        quote: "The first time I held a qalam and wrote 'Waheguru' in my own hand, I wept. Garh Anand gave me something no printed Gutka ever could.",
        img: "/assets/gw3.jpeg",
    },
];

// ─── Icons ──────────────────────────────────────────────────────────────────────
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
function ChevLeft() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}
function ChevRight() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}
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
function InstaIcon() {
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
function YTIcon() {
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
function WAIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
    );
}

// ─── Wisdom Modal ───────────────────────────────────────────────────────────────
function WisdomModal({
    isOpen,
    onClose,
    imageSrc,
    imageAlt,
    name,
    subtitle,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    imageAlt: string;
    name: string;
    subtitle: string;
    children: React.ReactNode;
    id: string;
}) {
    return (
        <div
            className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            style={{ display: isOpen ? "flex" : "none" }}
        >
            <div className="absolute inset-0 bg-[#1b1008]/85 backdrop-blur-sm" onClick={onClose} />
            <div
                className={`relative bg-[#fdf7ee]/97 border border-[#e8d5b4] shadow-2xl rounded-[2.5rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto transition-transform duration-300 ${isOpen ? "scale-100" : "scale-95"}`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/60 rounded-full hover:bg-[#f29b38] hover:text-white text-[#3E2723] transition"
                >
                    <CloseIcon />
                </button>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 h-64 md:h-auto relative rounded-t-[2.5rem] md:rounded-tl-[2.5rem] md:rounded-tr-none md:rounded-bl-[2.5rem] overflow-hidden flex-shrink-0">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover"
                            sizes="40vw"
                        />
                    </div>
                    <div className="md:w-3/5 p-8 md:p-10">
                        <h3 className="text-2xl font-bold text-[#1f130f] mb-1">{name}</h3>
                        <p className="text-[#a06a29] text-xs font-extrabold uppercase tracking-[0.22em] mb-6">
                            {subtitle}
                        </p>
                        <div className="text-[#4a3427]/90 leading-relaxed space-y-4 text-sm">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Gallery Modal ──────────────────────────────────────────────────────────────
function GalleryModal({
    isOpen,
    category,
    onClose,
    onImageClick,
}: {
    isOpen: boolean;
    category: GalleryCategory | null;
    onClose: () => void;
    onImageClick: (s: string) => void;
}) {
    const data = category ? GALLERY_DATA[category] : null;
    return (
        <div
            className={`fixed inset-0 z-[65] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            style={{ display: isOpen ? "flex" : "none" }}
        >
            <div className="absolute inset-0 bg-[#1b1008]/92 backdrop-blur-sm" onClick={onClose} />
            <div
                className={`relative bg-[#fdf7ee]/97 border border-[#e8d5b4] rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl p-6 md:p-8 transition-transform duration-300 ${isOpen ? "scale-100" : "scale-95"}`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 p-2 bg-white/60 rounded-full hover:bg-[#f29b38] hover:text-white text-[#3E2723] transition"
                >
                    <CloseIcon />
                </button>
                <h3 className="text-2xl font-bold text-[#1f130f] mb-6 border-b border-[#e8d5b4] pb-4 pr-12">
                    {data?.title ?? "Gallery"}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pr-2 pb-4 custom-scrollbar">
                    {data?.images.map((src) => (
                        <div
                            key={src}
                            className="relative h-32 md:h-40 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition duration-300 shadow-sm border border-[#e8d5b4]"
                            onClick={() => onImageClick(src)}
                        >
                            <Image src={src} alt="" fill className="object-cover" sizes="25vw" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Lightbox ───────────────────────────────────────────────────────────────────
function ImageModal({ src, onClose }: { src: string | null; onClose: () => void }) {
    const isOpen = !!src;
    return (
        <div
            className={`fixed inset-0 z-[75] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            style={{ display: isOpen ? "flex" : "none" }}
        >
            <div className="absolute inset-0 bg-black/96 backdrop-blur-md" onClick={onClose} />
            <div className="relative z-10 max-w-5xl w-full flex justify-center">
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 z-20 p-2 bg-white/20 rounded-full hover:bg-[#f29b38] hover:text-white text-white transition"
                >
                    <CloseIcon />
                </button>
                {src && (
                    <div className="relative w-full max-h-[85vh] aspect-video">
                        <Image
                            src={src}
                            alt="Expanded"
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

// ─── Testimonials ───────────────────────────────────────────────────────────────
function TestimonialsSection() {
    const [active, setActive] = useState(0);
    const n = TESTIMONIALS.length;
    const t = TESTIMONIALS[active];
    return (
        <section id="testimonials" className="py-20 md:py-28 bg-[#120c08] relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        "url('https://www.transparenttextures.com/patterns/cubes.png')",
                }}
            />
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#f29b38]/50 to-transparent" />
            <div className="container mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
                <div className="text-center mb-14">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.38em] text-[#a06a29] mb-3">
                        Voices from the Sangat
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-amber-50 font-display">
                        Words that moved us.
                    </h2>
                </div>
                <div className="relative mx-auto max-w-3xl">
                    <span className="absolute -top-8 -left-2 text-[8rem] leading-none text-[#f29b38]/12 font-serif select-none pointer-events-none">
                        &ldquo;
                    </span>
                    <div className="bg-white/[0.055] border border-white/[0.08] rounded-[2rem] p-8 md:p-12 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                        <p className="text-lg md:text-xl text-amber-50/90 leading-relaxed font-medium italic mb-10">
                            &ldquo;{t.quote}&rdquo;
                        </p>
                        <div className="flex items-center gap-5 flex-wrap">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#f29b38]/45 flex-shrink-0">
                                <Image
                                    src={t.img}
                                    alt={t.name}
                                    fill
                                    className="object-cover"
                                    sizes="56px"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-amber-100">{t.name}</p>
                                <p className="text-[0.75rem] text-[#a06a29] font-semibold tracking-wide">
                                    {t.role} · {t.location}
                                </p>
                            </div>
                            <div className="flex gap-2 items-center ml-auto">
                                {TESTIMONIALS.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActive(i)}
                                        className={`rounded-full transition-all duration-300 ${i === active ? "w-6 h-2 bg-[#f29b38]" : "w-2 h-2 bg-white/25 hover:bg-white/50"}`}
                                        aria-label={`Testimonial ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-5 px-1">
                        <button
                            onClick={() => setActive((active - 1 + n) % n)}
                            className="flex items-center gap-2 text-[0.75rem] font-semibold text-amber-200/65 hover:text-amber-200 transition"
                        >
                            <span className="w-8 h-8 rounded-full border border-white/18 flex items-center justify-center hover:border-[#f29b38]/60 hover:text-[#f29b38] transition">
                                <ChevLeft />
                            </span>
                            Previous
                        </button>
                        <button
                            onClick={() => setActive((active + 1) % n)}
                            className="flex items-center gap-2 text-[0.75rem] font-semibold text-amber-200/65 hover:text-amber-200 transition"
                        >
                            Next
                            <span className="w-8 h-8 rounded-full border border-white/18 flex items-center justify-center hover:border-[#f29b38]/60 hover:text-[#f29b38] transition">
                                <ChevRight />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Journey / Timeline ─────────────────────────────────────────────────────────
function JourneySection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollBy = (dir: number) =>
        scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
    return (
        <section id="journey" className="py-20 md:py-28 bg-[#fdf7ee] border-t border-[#e8d5b4]/60">
            <div className="container mx-auto max-w-6xl px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
                    <div>
                        <p className="text-[0.68rem] font-bold uppercase tracking-[0.38em] text-[#a06a29] mb-3">
                            Since 2018
                        </p>
                        <h2 className="font-display text-3xl md:text-4xl text-[#1f130f]">
                            Our Journey
                        </h2>
                        <p className="mt-3 max-w-md text-sm md:text-base text-[#4a3427]/75">
                            Six years of quiet, consistent sewa — one camp, one student, one Beerh
                            at a time.
                        </p>
                    </div>
                    <div className="hidden md:flex gap-2">
                        {[
                            [-1, <ChevLeft key="l" />],
                            [1, <ChevRight key="r" />],
                        ].map(([dir, icon]) => (
                            <button
                                key={dir as number}
                                onClick={() => scrollBy(dir as number)}
                                className="w-10 h-10 rounded-full border border-[#e8d5b4] bg-white flex items-center justify-center text-[#4a3427] hover:border-[#f29b38] hover:text-[#f29b38] transition"
                            >
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-0 overflow-x-auto pb-6 snap-x snap-mandatory custom-scrollbar scroll-smooth"
                    style={{ scrollbarWidth: "none" }}
                >
                    {TIMELINE_MILESTONES.map((m, idx) => (
                        <div key={m.year} className="snap-start shrink-0 mx-3">
                            <div className="w-[270px] md:w-[290px] bg-white rounded-[1.75rem] border border-[#e8d5b4] shadow-[0_8px_30px_rgba(54,36,24,0.09)] p-7 flex flex-col gap-4 hover:shadow-[0_18px_50px_rgba(54,36,24,0.17)] hover:-translate-y-1.5 transition-all duration-300 group">
                                <span className="self-start text-[0.62rem] font-extrabold uppercase tracking-[0.3em] text-[#a06a29] bg-[#f29b38]/10 px-3 py-1 rounded-full border border-[#f29b38]/22">
                                    {m.year}
                                </span>
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#f29b38] to-[#e27c12] flex items-center justify-center text-white text-lg shadow">
                                    ✦
                                </div>
                                <h3 className="text-[1rem] font-bold text-[#1f130f] group-hover:text-[#a06a29] transition">
                                    {m.title}
                                </h3>
                                <p className="text-[0.82rem] text-[#4a3427]/80 leading-relaxed flex-grow">
                                    {m.desc}
                                </p>
                                <div className="flex items-center gap-3 pt-2 border-t border-[#e8d5b4]">
                                    <span className="w-2 h-2 rounded-full bg-[#f29b38] flex-shrink-0" />
                                    <span className="h-px flex-1 bg-[#e8d5b4]" />
                                    {idx < TIMELINE_MILESTONES.length - 1 && (
                                        <span className="text-[#a06a29]/55 text-sm">→</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <p className="text-sm text-[#4a3427]/65 italic mb-4">
                        And the story continues — join us in writing the next chapter.
                    </p>
                    <a
                        href="#donate"
                        className="inline-flex items-center gap-2 rounded-full bg-[#1f130f] text-amber-50 px-6 py-3 text-sm font-semibold hover:bg-[#f29b38] hover:text-[#1b1411] transition duration-300"
                    >
                        Be Part of the Journey →
                    </a>
                </div>
            </div>
        </section>
    );
}

// ─── Main Page ──────────────────────────────────────────────────────────────────
export default function GarhAnandPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openWisdomModal, setOpenWisdomModal] = useState<"1" | "2" | "3" | "jathedar" | null>(
        null
    );
    const [galleryCategory, setGalleryCategory] = useState<GalleryCategory | null>(null);
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
    const [nlEmail, setNlEmail] = useState("");
    const [nlSent, setNlSent] = useState(false);

    useEffect(() => {
        const open = openWisdomModal !== null || galleryCategory !== null || lightboxSrc !== null;
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [openWisdomModal, galleryCategory, lightboxSrc]);

    const closeMobile = useCallback(() => setMobileMenuOpen(false), []);

    return (
        <>
            <style>{`
        html{scroll-behavior:smooth;}
        body{font-family:var(--font-dm-sans),sans-serif;background:#fdfbf7;color:#3E2723;}
        .font-display{font-family:var(--font-display),serif;}
        .glass-panel{background:rgba(253,247,238,0.82);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(232,213,180,0.6);box-shadow:0 8px 32px 0 rgba(62,39,35,0.08);transition:background .3s,border .3s,box-shadow .3s,transform .3s;}
        .glass-panel:hover{background:rgba(255,255,255,0.92);border-color:rgba(242,155,56,0.35);box-shadow:0 20px 50px 0 rgba(62,39,35,0.14);}
        .hero-bg{background-image:url('/assets/hero01.jpeg');background-size:cover;background-position:center;background-attachment:fixed;}
        .custom-scrollbar::-webkit-scrollbar{width:5px;height:5px;}
        .custom-scrollbar::-webkit-scrollbar-track{background:rgba(0,0,0,.04);border-radius:10px;}
        .custom-scrollbar::-webkit-scrollbar-thumb{background:rgba(180,83,9,.25);border-radius:10px;}
        .custom-scrollbar::-webkit-scrollbar-thumb:hover{background:rgba(180,83,9,.55);}
        @keyframes bounce2{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
        .scroll-bounce{animation:bounce2 2s ease-in-out infinite;}
      `}</style>

            {/* ── HEADER ─────────────────────────────────────────────── */}
            <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-6">
                <div className="container mx-auto max-w-7xl">
                    <div className="glass-panel rounded-full px-5 py-2.5 flex justify-between items-center">
                        <a href="#" className="flex-shrink-0 flex items-center gap-2.5">
                            <Image
                                src="/assets/logo.png"
                                alt="Garh Anand"
                                width={38}
                                height={38}
                                className="h-9 w-auto"
                            />
                            <span className="font-display text-[1.05rem] font-semibold text-[#1f130f] hidden sm:block tracking-wide">
                                Garh Anand
                            </span>
                        </a>
                        <nav className="hidden md:flex items-center space-x-7">
                            {[
                                ["#mission", "Mission"],
                                ["#wisdom", "Wisdom"],
                                ["#activities", "Activities"],
                                ["#journey", "Journey"],
                                ["#contact", "Contact"],
                            ].map(([h, l]) => (
                                <a
                                    key={h}
                                    href={h}
                                    className="text-[#4a3427]/80 hover:text-[#a06a29] font-medium text-sm tracking-wide transition"
                                >
                                    {l}
                                </a>
                            ))}
                        </nav>
                        <div className="hidden md:flex items-center gap-3">
                            <a
                                href="#donate"
                                className="bg-[#1f130f] text-amber-50 font-semibold px-5 py-2 rounded-full hover:bg-[#f29b38] hover:text-[#1b1411] transition text-sm shadow-md"
                            >
                                Donate
                            </a>
                        </div>
                        <button
                            className="md:hidden text-[#3E2723] p-1.5"
                            onClick={() => setMobileMenuOpen((v) => !v)}
                            aria-label="Menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
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
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-2 glass-panel rounded-3xl p-4 flex flex-col space-y-2 shadow-2xl">
                            {[
                                ["#mission", "Mission"],
                                ["#wisdom", "Wisdom"],
                                ["#activities", "Activities"],
                                ["#journey", "Journey"],
                                ["#contact", "Contact"],
                            ].map(([h, l]) => (
                                <a
                                    key={h}
                                    href={h}
                                    onClick={closeMobile}
                                    className="block px-4 py-2.5 text-[#3E2723] hover:bg-[#f29b38]/10 rounded-xl font-medium text-sm"
                                >
                                    {l}
                                </a>
                            ))}
                            <a
                                href="#donate"
                                onClick={closeMobile}
                                className="block text-center bg-[#1f130f] text-amber-50 font-semibold px-5 py-3 rounded-full mt-1"
                            >
                                Donate
                            </a>
                        </div>
                    )}
                </div>
            </header>

            <main>
                {/* ── HERO ───────────────────────────────────────────────── */}
                <section className="hero-bg relative min-h-[92vh] flex items-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0e0a07]/90 via-[#1b1008]/80 to-[#2d1f11]/85" />
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[50%] bg-[radial-gradient(ellipse_at_center,_rgba(242,155,56,0.2)_0,_transparent_70%)]" />
                    </div>
                    <div className="container mx-auto max-w-6xl px-6 lg:px-8 relative z-10 pt-28 pb-20 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-amber-100/90 backdrop-blur-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#f29b38]" />
                                ਸਤਿਗੁਰਪ੍ਰਸਾਦਿ · Reviving Sacred Traditions
                            </div>
                            <h1 className="font-display text-5xl md:text-[4rem] leading-[1.08] text-amber-50">
                                Preserving the sacred wisdom
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#ffd9a1] via-[#f29b38] to-[#ffecd0] mt-1">
                                    of Gurbani for generations.
                                </span>
                            </h1>
                            <p className="max-w-xl text-sm md:text-base text-amber-100/75 leading-relaxed">
                                Garh Anand is a Sikh spiritual initiative dedicated to Gurbani
                                writing, preserving Puratan Beerh Sahibs, and nurturing a community
                                of Likharis who touch the Shabad with their own hands.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="#donate"
                                    className="inline-flex items-center rounded-full bg-[#f29b38] px-8 py-3.5 text-sm font-bold text-[#1b1411] shadow-[0_18px_45px_rgba(0,0,0,0.5)] hover:bg-[#e27c12] hover:shadow-[0_22px_55px_rgba(0,0,0,0.65)] transition duration-300"
                                >
                                    Donate to the Mission
                                </a>
                                <a
                                    href="#mission"
                                    className="inline-flex items-center rounded-full border border-amber-200/35 bg-transparent px-7 py-3.5 text-sm font-semibold text-amber-50/90 hover:bg-amber-50/8 hover:border-amber-200/60 transition"
                                >
                                    Explore Our Seva
                                </a>
                            </div>
                            <div className="flex flex-wrap gap-8 pt-2 border-t border-white/10">
                                {[
                                    ["450+", "Likharis guided"],
                                    ["7+", "Years of seva"],
                                    ["4–6/yr", "Immersive camps"],
                                ].map(([n, l]) => (
                                    <div key={l}>
                                        <p className="text-lg font-bold text-[#f29b38]">{n}</p>
                                        <p className="text-[0.7rem] text-amber-100/55 uppercase tracking-[0.2em] font-medium">
                                            {l}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* image card */}
                        <div className="relative hidden lg:block">
                            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-[#f29b38]/25 via-transparent to-[#1a3a2a]/35 blur-3xl opacity-75" />
                            <div className="relative rounded-[2.3rem] border border-amber-50/12 bg-amber-50/5 p-3 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.75)]">
                                <div className="relative h-[370px] overflow-hidden rounded-[1.9rem]">
                                    <Image
                                        src="/assets/gw3.jpeg"
                                        alt="Gurbani being written with traditional qalam"
                                        fill
                                        className="object-cover scale-105"
                                        sizes="40vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1b1411]/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                                        <div>
                                            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-amber-100/70 mb-1">
                                                Gurbani Writing Sabha
                                            </p>
                                            <p className="text-[0.85rem] font-medium text-amber-50">
                                                "ਧੰਨੁ ਸੁ ਕਾਗਦੁ ਕਲਮ ਧੰਨੁ"
                                            </p>
                                        </div>
                                        <div className="rounded-full bg-black/35 px-3 py-1.5 text-[0.65rem] font-bold text-amber-50/90 backdrop-blur-md whitespace-nowrap">
                                            Since 2018
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[0.62rem] uppercase tracking-[0.4em] text-amber-200/55 scroll-bounce">
                        <span>Scroll</span>
                        <span className="h-8 w-px bg-gradient-to-b from-amber-200/45 to-transparent" />
                    </div>
                </section>

                {/* ── MISSION ──────────────────────────────────────────────── */}
                <section
                    id="mission"
                    className="py-20 md:py-28 border-b border-[#e8d5b4]/50 bg-[#fdf7ee]"
                >
                    <div className="container mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] items-start">
                            <div className="relative">
                                <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-tr from-[#f29b38]/18 via-transparent to-[#21483a]/12 blur-3xl opacity-55" />
                                <div className="relative overflow-hidden rounded-[2rem] border border-[#e8d5b4] shadow-[0_18px_55px_rgba(54,36,24,0.18)]">
                                    <div className="relative h-80 md:h-[400px]">
                                        <Image
                                            src="/assets/pt0.jpeg"
                                            alt="Heritage manuscript"
                                            fill
                                            className="object-cover"
                                            sizes="50vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1f130f]/65 via-transparent to-transparent" />
                                    </div>
                                    <div className="px-7 pb-7 pt-5 flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a06a29]">
                                                Heritage in Motion
                                            </p>
                                            <p className="mt-1 text-sm text-[#4a3427]/80">
                                                From paper and qalam to living, breathing Sikhi
                                                jeevan.
                                            </p>
                                        </div>
                                        <div className="rounded-full bg-[#1f130f] px-4 py-2 text-[0.68rem] font-semibold text-amber-50 whitespace-nowrap">
                                            Non-profit · Seva-led
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-7">
                                <div>
                                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#a06a29] mb-3">
                                        Our Mission
                                    </p>
                                    <h2 className="font-display text-3xl md:text-[2.3rem] leading-snug text-[#1f130f]">
                                        Writing Bani, preserving Rehat, and nurturing hearts rooted
                                        in Guru&apos;s way.
                                    </h2>
                                </div>
                                <p className="text-sm md:text-[0.95rem] leading-relaxed text-[#4a3427]/85">
                                    Garh Anand exists to bring Sikhs back to the intimate discipline
                                    of Gurbani writing and living. Through Larivaar Santhia,
                                    preservation of Puratan Beerh Sahibs, Raag Vidya, and
                                    purpose-driven camps, we create spaces where Shabad is not just
                                    read—but lovingly written, sung, and lived.
                                </p>
                                <p className="text-sm md:text-[0.95rem] leading-relaxed text-[#4a3427]/75">
                                    Every sheet of hand-written Bani, every student in a camp, and
                                    every family that reconnects to Gurmat traditions becomes part
                                    of a quiet but powerful movement to honour the Guru&apos;s
                                    legacy in its original form.
                                </p>
                                <div className="grid grid-cols-3 gap-4 pt-2">
                                    {[
                                        ["7+", "Years of seva"],
                                        ["450+", "Students guided"],
                                        ["4–6/yr", "Camps & sabhas"],
                                    ].map(([n, l]) => (
                                        <div
                                            key={l}
                                            className="rounded-2xl border border-[#e8d5b4] bg-white/80 px-4 py-4 shadow-sm text-center"
                                        >
                                            <p className="text-2xl font-bold text-[#1f130f] font-display">
                                                {n}
                                            </p>
                                            <p className="mt-1 text-[0.68rem] text-[#4a3427]/75 uppercase tracking-[0.18em] font-semibold">
                                                {l}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── WISDOM ────────────────────────────────────────────────── */}
                <section
                    id="wisdom"
                    className="py-20 md:py-28 relative overflow-hidden border-b border-[#e8d5b4]/50"
                >
                    <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#f29b38]/7 rounded-full blur-3xl -z-10" />
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center mb-12">
                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#a06a29] mb-3">
                                Voices of the Khalsa
                            </p>
                            <h2 className="font-display text-3xl md:text-4xl text-[#1f130f] mb-4">
                                Wisdom from the Panth
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#f29b38] to-transparent mx-auto mb-5 rounded-full" />
                            <p className="text-sm md:text-base text-[#4a3427]/75 max-w-2xl mx-auto">
                                Inspiration drawn from scholars who dedicated their lives to the
                                preservation of Gurmat and Gurbani.
                            </p>
                        </div>
                        <div className="max-w-6xl mx-auto">
                            <div
                                className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory custom-scrollbar"
                                style={{ scrollbarWidth: "none" }}
                            >
                                {[
                                    {
                                        key: "1",
                                        img: "https://www.sikhtranslations.com/content/images/2023/04/gurbachan-singh-bhindranwale-2.jpg",
                                        name: "Sant Gyani Gurbachan Singh Ji",
                                        sub: "Khalsa Bhindranwale",
                                        quote: '"ਜਿਹੜੇ ਲੋਕ ਕਹਿੰਦੇ ਆ ਜੀ ਕਿ ਸਾਨੂੰ.....ਗੁਰਮੁਖੀ ਪੜਨੀ ਨਾ ਪਵੇ ਤੇ ਆਪੋ ਹੀ ਪੜ ਲਈਏ ਤੇ ਪਦ ਛੇਦ ਹੀ ਚਾਹੀਦੀਆਂ ਨੇ..."',
                                    },
                                    {
                                        key: "2",
                                        img: "/assets/Sant_Giani_Kartar_Singh_Ji_Khalsa_Bhindranwale.jpg",
                                        name: "Sant Gyani Kartar Singh Ji",
                                        sub: "Khalsa Bhindranwale",
                                        quote: '"ਏਸ ਵਾਸਤੇ ਪਦ ਛੇਦ ਕਰਨਾ ਏਹ ਅਤਿਅੰਤਿ ਮਨ੍ਹਾ ਹੈ।ਗੁਰੂ ਕੇ ਪਦਾਂ ਨੂੰ ਛੇਦ ਕੱਟਣਾ ਜਾਂ ਪਦ ਛੇਦ ਕਰਨਾ..."',
                                    },
                                    {
                                        key: "3",
                                        img: "https://live.staticflickr.com/65535/50221817848_ed394301d8_z.jpg",
                                        name: "Bhai Sahib Bhai Randheer Singh Ji",
                                        sub: "Akhand Kirtani Jatha",
                                        quote: 'ਪੰਥ ਦੀ ਸੋਨ ਚਿੜੀ ਭਾਈ ਸਾਹਿਬ ਰਣਧੀਰ ਸਿੰਘ ਜੀ ਨੇ ਆਪਣੀ ਰਚਨਾ "ਜੋਤਿ ਵਿਗਾਸ" ਚ ਕਵਿਤਾਵਾਂ ਵੀ ਅੰਕਿਤ ਕੀਤੀਆ ਹਨ...',
                                    },
                                ].map(({ key, img, name, sub, quote }) => (
                                    <article
                                        key={key}
                                        className="snap-start shrink-0 w-[290px] md:w-[330px] bg-white rounded-[2rem] border border-[#e8d5b4] shadow-[0_10px_35px_rgba(54,36,24,0.09)] flex flex-col overflow-hidden hover:-translate-y-2 hover:shadow-[0_22px_55px_rgba(54,36,24,0.17)] transition-all duration-400 group"
                                    >
                                        <div className="w-full h-72 relative overflow-hidden">
                                            <Image
                                                src={img}
                                                alt={name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition duration-700"
                                                sizes="33vw"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1f130f]/75 to-transparent" />
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.25em] text-[#a06a29] mb-1">
                                                {sub}
                                            </p>
                                            <h3 className="text-[0.98rem] font-bold text-[#1f130f] mb-4">
                                                {name}
                                            </h3>
                                            <p className="text-[#4a3427]/80 text-xs leading-relaxed flex-grow line-clamp-4 italic">
                                                {quote}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    setOpenWisdomModal(key as "1" | "2" | "3")
                                                }
                                                className="mt-5 self-start text-xs font-bold text-[#a06a29] flex items-center gap-1.5 border-b border-[#a06a29]/35 pb-0.5 hover:border-[#a06a29] hover:text-[#1f130f] transition-all"
                                            >
                                                Read full reflection ↗
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── ACTIVITIES ──────────────────────────────────────────── */}
                <section
                    id="activities"
                    className="py-20 md:py-28 bg-[#fdf7ee] border-b border-[#e8d5b4]/50"
                >
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#a06a29] mb-3">
                                What We Do
                            </p>
                            <h2 className="font-display text-3xl md:text-4xl text-[#1f130f] mb-4">
                                Our Core Activities
                            </h2>
                            <p className="max-w-2xl mx-auto text-[#4a3427]/75 text-sm md:text-base">
                                Dedicated to regenerating ancient practices and bridging the gap
                                between Westernization and Sikhi.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    category: "gurbani" as GalleryCategory,
                                    img: "/assets/gw3.jpeg",
                                    title: "Gurbani Writing",
                                    desc: "Encouraging Sikhs to read and write Gurbani in Larivaar — creating a new generation of Likharis.",
                                },
                                {
                                    category: "tradition" as GalleryCategory,
                                    img: "/assets/pt0.jpeg",
                                    title: "Preserving Tradition",
                                    desc: "Conservation of Puratan Beerh Sahibs and Pothis — safeguarding our history for generations.",
                                },
                                {
                                    category: "camps" as GalleryCategory,
                                    img: "/assets/cw0.jpeg",
                                    title: "Camps & Workshops",
                                    desc: "4–6 camps annually including a major residential camp with hands-on, immersive learning.",
                                },
                                {
                                    category: "online" as GalleryCategory,
                                    img: "/assets/ol2.jpeg",
                                    title: "Online Learning",
                                    desc: "One-to-one Akharkaari classes and a book club connecting Sangat across time zones.",
                                },
                            ].map(({ category, img, title, desc }) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setGalleryCategory(category)}
                                    className="group text-left bg-white rounded-3xl border border-[#e8d5b4] shadow-[0_8px_30px_rgba(54,36,24,0.09)] overflow-hidden hover:-translate-y-3 hover:shadow-[0_22px_60px_rgba(54,36,24,0.18)] transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f29b38]/70"
                                >
                                    <div className="h-48 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1f130f]/55 via-transparent to-transparent z-10" />
                                        <Image
                                            src={img}
                                            alt={title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition duration-700"
                                            sizes="25vw"
                                        />
                                        <span className="absolute bottom-3 right-3 z-20 rounded-full bg-black/30 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-amber-100/90 backdrop-blur-sm">
                                            View Gallery ↗
                                        </span>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-[0.98rem] font-bold text-[#1f130f] mb-2 group-hover:text-[#a06a29] transition">
                                            {title}
                                        </h3>
                                        <p className="text-[#4a3427]/75 text-xs leading-relaxed">
                                            {desc}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── JOURNEY TIMELINE ─────────────────────────────────────── */}
                <JourneySection />

                {/* ── JATHEDAR ─────────────────────────────────────────────── */}
                <section id="jathedar" className="py-20 md:py-28 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#120c08] -z-20" />
                    <div
                        className="absolute inset-0 opacity-[0.07] -z-10"
                        style={{
                            backgroundImage:
                                "url('https://www.transparenttextures.com/patterns/cubes.png')",
                        }}
                    />
                    <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-[#f29b38]/9 rounded-full blur-3xl -z-10" />
                    <div className="container mx-auto px-6 lg:px-8 relative z-10">
                        <div className="border border-white/[0.07] rounded-[3rem] p-8 md:p-12 lg:p-16 bg-white/[0.04] backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                            <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
                                <div className="lg:w-1/2 flex flex-col text-center lg:text-left">
                                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.38em] text-[#a06a29] mb-4">
                                        Guiding Light
                                    </p>
                                    <div className="w-10 h-0.5 bg-[#f29b38] mb-6 mx-auto lg:mx-0" />
                                    <h2 className="font-display text-3xl md:text-4xl text-amber-50 mb-6 leading-snug">
                                        &ldquo;Every pen that touches Bani carries a universe of
                                        grace.&rdquo;
                                    </h2>
                                    <div className="space-y-4 text-sm text-white/80 leading-relaxed">
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
                                        className="mt-6 self-center lg:self-start text-sm font-bold text-[#f29b38] border-b border-[#f29b38]/45 pb-0.5 hover:border-[#f29b38] hover:text-amber-200 transition"
                                    >
                                        Read the full message →
                                    </button>
                                    <div className="mt-8 pt-6 border-t border-white/10">
                                        <p className="font-bold text-lg text-white">
                                            ਸਿਮਰਨਜੀਤ ਸਿੰਘ
                                        </p>
                                        <p className="text-[#a06a29] text-xs font-semibold tracking-wide mt-1">
                                            ਗੁਰੂ ਗ੍ਰੰਥ ਜੀ ਗੁਰੂ ਪੰਥ ਜੀ ਅਤੇ ਸਾਧਸੰਗਤਿ ਦਾ ਗੋਲਾ
                                        </p>
                                    </div>
                                </div>
                                <div className="lg:w-1/2 flex justify-center lg:justify-end">
                                    <div className="relative">
                                        <div className="absolute -inset-4 rounded-full bg-[#f29b38]/18 blur-2xl" />
                                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-[3px] border-[#f29b38]/35 relative shadow-[0_0_60px_rgba(242,155,56,0.28)]">
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
                    </div>
                </section>

                {/* ── MISSIONS ──────────────────────────────────────────────── */}
                <section
                    id="missions"
                    className="py-20 md:py-28 bg-[#fdf7ee] border-b border-[#e8d5b4]/50"
                >
                    <div className="container mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#a06a29] mb-3">
                                What&apos;s Next
                            </p>
                            <h2 className="font-display text-3xl md:text-4xl text-[#1f130f] mb-4">
                                Our Upcoming Missions
                            </h2>
                            <p className="max-w-2xl mx-auto text-[#4a3427]/75 text-sm md:text-base">
                                Expanding our sewa to build dedicated spaces for learning and
                                preserving our sacred musical traditions.
                            </p>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {[
                                {
                                    img: "/assets/raagiji.jpeg",
                                    title: "Raag te Saaj",
                                    desc: "Promoting the traditional way of Kirtan by teaching Guru ke Raag and Guru ke Saaj.",
                                    timeline: "Phase 1 · Curriculum & mentors",
                                    progress: 60,
                                },
                                {
                                    img: "/assets/vidya.JPG",
                                    title: "Vidyalay",
                                    desc: "Establishing a centre to train Sikhs in Gatka, Santhia, Raag Vidya, and Akharkaari.",
                                    timeline: "Foundation stage · Infrastructure planning",
                                    progress: 35,
                                },
                            ].map(({ img, title, desc, timeline, progress }) => (
                                <div
                                    key={title}
                                    className="bg-white rounded-[2rem] border border-[#e8d5b4] shadow-[0_10px_40px_rgba(54,36,24,0.09)] overflow-hidden hover:shadow-[0_20px_60px_rgba(54,36,24,0.16)] hover:-translate-y-1 transition-all duration-300 group"
                                >
                                    <div className="h-56 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-black/8 group-hover:bg-transparent transition z-10" />
                                        <Image
                                            src={img}
                                            alt={title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition duration-700"
                                            sizes="50vw"
                                        />
                                    </div>
                                    <div className="p-7 space-y-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#1f130f]">
                                                {title}
                                            </h3>
                                            <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[#a06a29] mt-1">
                                                {timeline}
                                            </p>
                                        </div>
                                        <p className="text-[#4a3427]/80 text-sm leading-relaxed">
                                            {desc}
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[0.7rem] text-[#4a3427]/75">
                                                <span>Progress</span>
                                                <span className="font-bold">{progress}%</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-[#e8d5b4] overflow-hidden">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-[#f29b38] to-[#e27c12]"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </div>
                                        <button className="inline-flex items-center gap-2 rounded-full border border-[#a06a29]/28 bg-[#fdf7ee] px-4 py-2 text-xs font-bold text-[#1f130f] hover:bg-[#f29b38]/12 hover:border-[#a06a29]/55 transition">
                                            Join this mission ↗
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── COMMUNITY GALLERY ────────────────────────────────────── */}
                <section id="community" className="py-20 md:py-28 bg-[#f6f0e4]">
                    <div className="container mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                            <div>
                                <p className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#a06a29] mb-3">
                                    Sangat in Motion
                                </p>
                                <h2 className="font-display text-3xl md:text-4xl text-[#1f130f]">
                                    Community, camps & everyday learners.
                                </h2>
                                <p className="mt-3 max-w-xl text-sm md:text-base text-[#4a3427]/80">
                                    Glimpses from writing sabhas, camps, and homes where Gurbani
                                    writing has become a daily practice.
                                </p>
                            </div>
                        </div>
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                            {[
                                "/assets/cw0.jpeg",
                                "/assets/cw5.jpeg",
                                "/assets/gw3.jpeg",
                                "/assets/ol2.jpeg",
                                "/assets/pt0.jpeg",
                                "/assets/cw10.jpeg",
                            ].map((src) => (
                                <button
                                    key={src}
                                    type="button"
                                    onClick={() => setLightboxSrc(src)}
                                    className="group relative block overflow-hidden rounded-3xl border border-[#e8d5b4] bg-amber-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f29b38]/70 w-full"
                                >
                                    <div className="absolute inset-0 bg-[#1f130f]/0 group-hover:bg-[#1f130f]/22 transition duration-300 z-10 rounded-3xl" />
                                    <Image
                                        src={src}
                                        alt=""
                                        width={600}
                                        height={400}
                                        className="w-full h-auto object-cover group-hover:scale-[1.03] transition duration-500"
                                    />
                                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[0.68rem] text-white font-semibold z-20 opacity-0 group-hover:opacity-100 transition duration-300">
                                        <span>View full size</span>
                                        <span aria-hidden>⤢</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
                <TestimonialsSection />

                {/* ── DONATE ───────────────────────────────────────────────── */}
                <section
                    id="donate"
                    className="py-20 md:py-28 bg-gradient-to-b from-[#fdf7ee] to-[#f6f0e4]"
                >
                    <div className="container mx-auto max-w-6xl px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <p className="text-[0.68rem] font-bold uppercase tracking-[0.32em] text-[#a06a29] mb-3">
                                Dasvandh · ਦਸਵੰਧ
                            </p>
                            <h2 className="font-display text-3xl md:text-4xl text-[#1f130f] mb-4">
                                Support Our Sewa
                            </h2>
                            <p className="max-w-2xl mx-auto text-[#4a3427]/80 italic text-sm md:text-base">
                                "ਸਤਿਗੁਰ ਕੀ ਸੇਵਾ ਸਫਲ ਹੈ ਜੇ ਕੋ ਕਰੇ ਚਿਤੁ ਲਾਇ॥"
                            </p>
                            <p className="mt-2 text-xs md:text-sm text-[#4a3427]/60 max-w-xl mx-auto">
                                Your Dasvandh sustains free paper, qalam, traditional inks, camps,
                                and online learning so no seeker is turned away.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            {[
                                ["🔒", "Transparent Accounts"],
                                ["💚", "Community Funded"],
                                ["🙏", "Seva-led Nonprofit"],
                            ].map(([ico, lbl]) => (
                                <span
                                    key={lbl as string}
                                    className="inline-flex items-center gap-2 rounded-full border border-[#e8d5b4] bg-white px-4 py-2 text-xs font-semibold text-[#4a3427]"
                                >
                                    <span>{ico}</span>
                                    {lbl}
                                </span>
                            ))}
                        </div>
                        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] border border-[#e8d5b4] shadow-[0_20px_65px_rgba(54,36,24,0.12)] p-8 md:p-12">
                            <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
                                <div className="flex-1 w-full bg-[#fdf7ee] rounded-3xl border border-[#e8d5b4] p-8">
                                    <h3 className="font-bold text-[#a06a29] mb-5 uppercase tracking-widest text-sm border-b border-[#e8d5b4] pb-4">
                                        Bank Transfer
                                    </h3>
                                    <div className="space-y-5">
                                        {[
                                            ["Account Name", "Garh Anand Welfare Society", false],
                                            ["Account Number", "50200098923091", true],
                                            ["IFSC Code", "HDFC0001331", true],
                                        ].map(([lbl, val, mono]) => (
                                            <div
                                                key={lbl as string}
                                                className="flex flex-col gap-0.5"
                                            >
                                                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#3E2723]/50">
                                                    {lbl}
                                                </span>
                                                <span
                                                    className={
                                                        mono
                                                            ? "font-mono text-base tracking-tight text-[#1f130f]"
                                                            : "font-bold text-base text-[#1f130f]"
                                                    }
                                                >
                                                    {val as string}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-5 w-full">
                                    <div className="bg-white p-4 rounded-2xl shadow-md border border-[#e8d5b4] hover:scale-105 transition">
                                        <Image
                                            src="/assets/qr.jpeg"
                                            alt="Donate QR"
                                            width={160}
                                            height={160}
                                            className="mix-blend-multiply"
                                        />
                                    </div>
                                    <p className="text-[0.65rem] font-bold text-[#4a3427]/55 uppercase tracking-widest">
                                        Scan · Pay via UPI
                                    </p>
                                    <a
                                        href="https://wa.me/919115551699"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-[#20bd5a] hover:-translate-y-0.5 transition duration-300 text-sm w-full justify-center sm:w-auto"
                                    >
                                        <WAIcon />
                                        Send Receipt on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* ── FOOTER ───────────────────────────────────────────────────── */}
            <footer id="contact" className="bg-[#100b07] text-amber-50 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage:
                            "url('https://www.transparenttextures.com/patterns/cubes.png')",
                    }}
                />
                <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#f29b38]/45 to-transparent" />

                {/* newsletter strip */}
                <div className="border-b border-white/[0.07]">
                    <div className="container mx-auto max-w-6xl px-6 py-10 lg:px-8 flex flex-col md:flex-row items-center gap-6 justify-between">
                        <div>
                            <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-[#a06a29] mb-1">
                                Stay Connected
                            </p>
                            <p className="text-sm text-white/80 font-medium">
                                Get updates on camps, new Likharis, and mission milestones.
                            </p>
                        </div>
                        {nlSent ? (
                            <div className="rounded-full bg-[#f29b38]/15 border border-[#f29b38]/30 px-6 py-3 text-sm text-[#f29b38] font-semibold">
                                ✓ You&apos;re subscribed — Waheguru Kirpa!
                            </div>
                        ) : (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (nlEmail) setNlSent(true);
                                }}
                                className="flex gap-2 w-full md:w-auto"
                            >
                                <input
                                    type="email"
                                    required
                                    value={nlEmail}
                                    onChange={(e) => setNlEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="flex-1 md:w-64 rounded-full bg-white/8 border border-white/14 px-5 py-2.5 text-sm text-white placeholder-white/38 focus:outline-none focus:border-[#f29b38]/60 focus:bg-white/12 transition"
                                />
                                <button
                                    type="submit"
                                    className="rounded-full bg-[#f29b38] text-[#1b1411] font-bold px-6 py-2.5 text-sm hover:bg-[#e27c12] transition whitespace-nowrap"
                                >
                                    Subscribe
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* grid */}
                <div className="container mx-auto max-w-6xl px-6 py-14 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                        <div>
                            <div className="flex items-center gap-2.5 mb-5">
                                <Image
                                    src="/assets/logo.png"
                                    alt="Garh Anand"
                                    width={34}
                                    height={34}
                                    className="h-8 w-auto"
                                />
                                <span className="font-display text-lg text-white tracking-wide">
                                    Garh Anand
                                </span>
                            </div>
                            <p className="text-white/55 text-sm leading-relaxed mb-5">
                                Reviving the forgotten traditions of the Khalsa Panth — one qalam,
                                one Beerh, one heart at a time.
                            </p>
                            <div className="flex gap-3">
                                <a
                                    href="https://www.instagram.com/garhhanand"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white hover:bg-[#f29b38] hover:border-[#f29b38] transition"
                                >
                                    <InstaIcon />
                                </a>
                                <a
                                    href="https://youtube.com/@qalmdwaatacademy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white hover:bg-[#f29b38] hover:border-[#f29b38] transition"
                                >
                                    <YTIcon />
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.32em] text-[#a06a29] mb-5">
                                Programs
                            </h3>
                            <ul className="space-y-2.5 text-white/60 text-sm">
                                {[
                                    "Gurbani Writing Sabha",
                                    "Preservation of Beerh Sahibs",
                                    "Annual Camp Likharian",
                                    "Online Akharkaari Classes",
                                    "Raag te Saaj",
                                    "Vidyalay Project",
                                ].map((p) => (
                                    <li
                                        key={p}
                                        className="hover:text-white/85 transition cursor-default"
                                    >
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.32em] text-[#a06a29] mb-5">
                                Quick Links
                            </h3>
                            <ul className="space-y-2.5 text-sm">
                                {[
                                    ["#mission", "Our Mission"],
                                    ["#wisdom", "Wisdom from the Panth"],
                                    ["#activities", "Core Activities"],
                                    ["#journey", "Our Journey"],
                                    ["#donate", "Support Sewa"],
                                    ["#testimonials", "Community Voices"],
                                ].map(([h, l]) => (
                                    <li key={h}>
                                        <a
                                            href={h}
                                            className="text-white/60 hover:text-[#f29b38] transition"
                                        >
                                            {l}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.32em] text-[#a06a29] mb-5">
                                Get in Touch
                            </h3>
                            <ul className="space-y-3.5 text-white/65 text-sm mb-6">
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
                            <a
                                href="#donate"
                                className="inline-flex items-center justify-center rounded-full bg-[#f29b38] px-5 py-2.5 text-xs font-bold text-[#1b1411] hover:bg-[#e27c12] transition shadow-md"
                            >
                                Donate Now →
                            </a>
                        </div>
                    </div>
                    <div className="border-t border-white/[0.07] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/28 text-[0.7rem]">
                        <p>© 2025 Garh Anand Welfare Society. All Rights Reserved.</p>
                        <p className="italic">ਧੰਨੁ ਲੇਖਾਰੀ ਨਾਨਕਾ ਜਿਨਿ ਨਾਮੁ ਲਿਖਾਇਆ ਸਚੁ॥</p>
                    </div>
                </div>
            </footer>

            {/* ── WISDOM MODALS ─────────────────────────────────────────── */}
            <WisdomModal
                id="m1"
                isOpen={openWisdomModal === "1"}
                onClose={() => setOpenWisdomModal(null)}
                imageSrc="https://www.sikhtranslations.com/content/images/2023/04/gurbachan-singh-bhindranwale-2.jpg"
                imageAlt="Sant Gyani Gurbachan Singh Ji"
                name="Sant Gyani Gurbachan Singh Ji"
                subtitle="Khalsa Bhindranwale"
            >
                <p>
                    "ਜਿਹੜੇ ਲੋਕ ਕਹਿੰਦੇ ਆ ਜੀ ਕਿ ਸਾਨੂੰ.....ਗੁਰਮੁਖੀ ਪੜਨੀ ਨਾ ਪਵੇ ਤੇ ਆਪੋ ਹੀ ਪੜ ਲਈਏ ਤੇ ਪਦ
                    ਛੇਦ ਹੀ ਚਾਹੀਦੀਆਂ ਨੇ ਬੀੜਾਂ ਉਹ ਏਸ ਗੱਲ ਨੂੰ ਨਈ ਸਮਝਦੇ ਸਾਧ ਸੰਗਤਿ ਜੀ ਕਿ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ..
                    ਤੇ ਹਿੰਦੀ ਵਿੱਚ ..ਤੇ ਹੋਰ ਫਾਰਸੀ ਵਿੱਚ ਕਿੰਨਾ ਕਿੰਨਾ ਚਿਰ ਲਾ ਕੇ ਪੜਦੇ ਰਹੇ ਓ, ਸ੍ਰੀ ਗੁਰੂ
                    ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ ਦਾ ਪਾਠ ਕਰਨ ਵਾਸਤੇ ਏਨੀ ਮਿਹਨਤ ਨਈ ਕਰਨੀ ਚਾਹੁੰਦੇ ਏਡੇ ਦਲਿਦਰੀ ਹੋ।"
                </p>
                <div className="h-px bg-[#e8d5b4] my-3" />
                <p>
                    They emphasized that a Singh must be Tyar Bar Tyar not just in dress, but in
                    intellect and spirit — traveling tirelessly to teach pure Santhia and the
                    discipline of Gurbani writing.
                </p>
            </WisdomModal>

            <WisdomModal
                id="m2"
                isOpen={openWisdomModal === "2"}
                onClose={() => setOpenWisdomModal(null)}
                imageSrc="/assets/Sant_Giani_Kartar_Singh_Ji_Khalsa_Bhindranwale.jpg"
                imageAlt="Sant Gyani Kartar Singh Ji"
                name="Sant Gyani Kartar Singh Ji"
                subtitle="Khalsa Bhindranwale"
            >
                <p>
                    "ਸੰਤ ਗਿਆਨੀ ਕਰਤਾਰ ਸਿੰਘ ਜੀ ਭਿੰਡਰਾਂਵਾਲਿਆਂ ਦੇ ਪਦਛੇਦ ਦੇ ਵਿਰੋਧ ਵਿੱਚ ਕਥਾ ਦੀ ਰਿਕਾਰਡਿੰਗ
                    ਚੋ ਮਿਲੇ ਬਚਨਃ- ਏਸ ਵਾਸਤੇ ਪਦ ਛੇਦ ਕਰਨਾ ਏਹ ਅਤਿਅੰਤਿ ਮਨ੍ਹਾ ਹੈ।ਗੁਰੂ ਕੇ ਪਦਾਂ ਨੂੰ ਛੇਦ
                    ਕੱਟਣਾ ਜਾਂ ਪਦ ਛੇਦ ਕਰਨਾ ਜਾਂ ਹੁਣ ਕਹਿੰਦੇ ਨੇ ਕਿ ਅੱਗੋ ਕੱਟਣਾ ਅੱਖਰ ਹਟਾ ਦਿਓ ਤੇ ਪਦ ਵੰਡ ਕਹਿ
                    ਦੋ।"
                </p>
                <div className="h-px bg-[#e8d5b4] my-3" />
                <p>
                    "We must guard the traditions of the Guru like a fortress. If we let go of our
                    distinct Rehat and Vidya, we lose the essence of what it means to be Khalsa."
                </p>
            </WisdomModal>

            <WisdomModal
                id="m3"
                isOpen={openWisdomModal === "3"}
                onClose={() => setOpenWisdomModal(null)}
                imageSrc="https://live.staticflickr.com/65535/50221817848_ed394301d8_z.jpg"
                imageAlt="Bhai Randheer Singh Ji"
                name="Bhai Sahib Bhai Randheer Singh Ji"
                subtitle="Akhand Kirtani Jatha"
            >
                <p
                    style={{ whiteSpace: "pre-line" }}
                >{`ਪੰਥ ਦੀ ਸੋਨ ਚਿੜੀ ਭਾਈ ਸਾਹਿਬ ਰਣਧੀਰ ਸਿੰਘ ਜੀ ਨੇ ਆਪਣੀ ਰਚਨਾ "ਜੋਤਿ ਵਿਗਾਸ" 'ਚ ਕਵਿਤਾਵਾਂ ਵੀ ਅੰਕਿਤ ਕੀਤੀਆ ਹਨ
"ਸਾਵਧਾਨ ਹੋਇ ਪੁਛਿਆ ਗੁਰਮੁਖੇ ਤੋਂ, ਕਾਰਨ ਮੂਲ ਇਸ ਪਦ ਪ੍ਰਾਪਤੋਲਿਆਂ ਦਾ।
ਤਿਨਾਂ ਦਸਿਆ ਨਿਮਰੀਭੂਤ ਹੋ ਕੇ, ਸਭ ਪਰਤਾਪੁ ਗੁਰ ਵਰ ਲਿੱਖਣੋਲਿਆਂ ਦਾ।"

"ਰਚਨਾ ਛਡਿ ਦਿਤੀ ਲਿਖਤ ਬਾਣੀਆਂ ਦੀ, ਨਵਾਂ ਰਾਹੁ ਫੜਿਆ ਫੈਸ਼ਨੋਲਿਆਂ ਦਾ।
ਛਾਪੇ-ਖ਼ਾਨਿਆਂ ਦੀ ਭੈੜੀ ਰੀਤ ਚੱਲੀ, ਭੈੜਾ ਚਾਲੜਾ ਦੰਮ ਖਟੋਲਿਆਂ ਦਾ।"

"ਹਾਇ ਲਿਖਤ ਮਹੱਤਤਾ ਰੋੜ੍ਹ ਦਿਤੀ, ਸਿਦਕ ਤੋੜ ਕੇ ਤੱਤ ਵਣਜੋਲਿਆਂ ਦਾ।
ਤੱਤ ਸੱਤ ਸਉਦਾ ਕੋਈ ਵਣਜਦਾ ਨਾ, ਹੋਇਆ ਵਣਜੁ ਪਰਧਾਨੁ ਦਮੜੋਲਿਆਂ ਦਾ।"`}</p>
            </WisdomModal>

            {/* Jathedar full modal */}
            <div
                className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 ${openWisdomModal === "jathedar" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                style={{ display: openWisdomModal === "jathedar" ? "flex" : "none" }}
            >
                <div
                    className="absolute inset-0 bg-[#1b1008]/85 backdrop-blur-sm"
                    onClick={() => setOpenWisdomModal(null)}
                />
                <div className="relative bg-[#fdf7ee]/97 border border-[#e8d5b4] shadow-2xl rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
                    <button
                        onClick={() => setOpenWisdomModal(null)}
                        className="absolute top-4 right-4 z-20 p-2 bg-white/60 rounded-full hover:bg-[#f29b38] hover:text-white text-[#3E2723] transition"
                    >
                        <CloseIcon />
                    </button>
                    <div className="md:w-2/5 h-64 md:h-auto relative flex-shrink-0">
                        <Image
                            src="/assets/jathedar.jpeg"
                            alt="Jathedar Ji"
                            fill
                            className="object-cover object-top"
                            sizes="40vw"
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

            <GalleryModal
                isOpen={galleryCategory !== null}
                category={galleryCategory}
                onClose={() => setGalleryCategory(null)}
                onImageClick={setLightboxSrc}
            />
            <ImageModal src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
        </>
    );
}
