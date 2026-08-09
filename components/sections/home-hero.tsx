'use client'

import Link from 'next/link'
import { Search, Sparkles } from 'lucide-react'
import { Hyperspeed } from '@/components/motion/hyperspeed'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

export function HomeHero() {
    return (
        <section className="relative min-h-[560px] overflow-hidden bg-black px-6 py-20 text-white">
            <Hyperspeed />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <Badge variant="outline" className="mb-6 border-white/20 bg-white/10 text-white backdrop-blur-sm">
                    <Sparkles data-icon="inline-start" />1,248 new tenders added today
                </Badge>
                <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-[-0.05em] sm:text-6xl">
                    Bangladesh&apos;s Most <span className="text-indigo-300">Intelligent</span> Tender Platform
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">AI-powered tender discovery, matching and analysis for procurement professionals across every sector.</p>
                <form action="/browse" className="mt-8 w-full max-w-2xl">
                    <InputGroup className="h-16 rounded-2xl border-white/20 bg-white shadow-2xl">
                        <InputGroupAddon><Search className="size-5" aria-hidden="true" /></InputGroupAddon>
                        <InputGroupInput name="q" aria-label="Search tenders" placeholder="Search tenders, sectors, or vendors..." className="text-base text-foreground" />
                        <InputGroupAddon align="inline-end"><Button size="lg" type="submit">Search</Button></InputGroupAddon>
                    </InputGroup>
                </form>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-white/70">
                    <span>Popular:</span>
                    {['Bridge', 'ICT', 'Medical', 'Solar Energy', 'Metro Rail'].map((tag) => (
                        <Button key={tag} variant="outline" size="xs" className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20" asChild>
                            <Link href={`/browse?q=${encodeURIComponent(tag)}`}>{tag}</Link>
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    )
}
