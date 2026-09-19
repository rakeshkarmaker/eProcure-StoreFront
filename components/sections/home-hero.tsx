'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'
import Hyperspeed from '@/components/motion/hyperspeed'
import { MaskedHeading } from '@/components/motion/masked-heading'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

export function HomeHero() {
    return (
        <section className="relative flex min-h-140 items-center overflow-hidden bg-black px-4 py-20 text-white sm:px-6">
            <div className="absolute inset-0 bg-black" aria-hidden="true"><Hyperspeed /></div>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/5 via-transparent to-black/25" />
            <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <MaskedHeading text="Bangladesh's Most Intelligent Tender Platform" tag="h1" src="/tenderiq/hospital.png" fillScale={1.35} parallax={18} drift={7} brightness={1.2} saturation={1.2} reveal="rise" trigger="mount" duration={0.85} stagger={0.045} textScale={0.09} tracking={-0.045} lineHeight={1.04} className="text-[2.5rem] drop-shadow-[0_3px_18px_rgba(0,0,0,0.65)] [-webkit-text-stroke:1px_rgba(255,255,255,0.12)] sm:text-[4rem]" />
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-[1.0625rem]">AI-powered tender discovery, matching and analysis for procurement professionals across every sector.</p>
                <form action="/browse" className="mt-8 w-full max-w-2xl">
                    <InputGroup className="min-h-16 rounded-2xl border-white/20 bg-white p-2 pl-1 shadow-[0_12px_48px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
                        <InputGroupAddon className="pl-3"><Search className="size-5 text-muted-foreground" aria-hidden="true" /></InputGroupAddon>
                        <InputGroupInput name="q" aria-label="Search tenders" placeholder="Search tenders..." className="min-w-0 text-base text-foreground" />
                        <InputGroupAddon align="inline-end"><Button size="lg" type="submit" className="h-12 rounded-xl px-5 shadow-[0_4px_16px_rgba(79,110,247,0.45)] sm:px-7">Search</Button></InputGroupAddon>
                    </InputGroup>
                </form>
                <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs text-white/70">
                    <span>Popular:</span>
                    {['Bridge', 'ICT', 'Medical', 'Solar Energy', 'Metro Rail'].map((tag) => (
                        <Button key={tag} variant="outline" size="sm" className="h-8 rounded-full border-white/20 bg-white/10 px-3 text-xs text-white backdrop-blur-sm hover:border-white/35 hover:bg-white/20" asChild>
                            <Link href={`/browse?q=${encodeURIComponent(tag)}`}>{tag}</Link>
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    )
}
