'use client'

import { useState } from 'react'
import { Bookmark, BookmarkCheck, ExternalLink, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function TenderHeader({ id }: { id: string }) {
    const [saved, setSaved] = useState(false)

    return (
        <section className="relative border-b bg-card px-6 py-6 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-success before:via-primary before:to-chart-4">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 sm:flex-row">
                <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2"><Badge variant="secondary">Infrastructure</Badge><Badge variant="outline" className="font-mono">{id}</Badge><Badge>e-Procurement</Badge><Badge variant="secondary">Open for bidding</Badge></div>
                    <h1 className="max-w-3xl text-2xl font-bold leading-snug tracking-tight">Construction of 4-Lane Highway Bypass — Pune Eastern Corridor Phase II</h1>
                    <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4" />NH-65, Maharashtra State · Public Works Dept. · Published Aug 15, 2024</p>
                </div>
                <div className="flex gap-2">
                    <Button variant={saved ? 'secondary' : 'outline'} aria-pressed={saved} onClick={() => setSaved((value) => !value)}>
                        {saved ? <BookmarkCheck data-icon="inline-start" /> : <Bookmark data-icon="inline-start" />}
                        {saved ? 'Saved' : 'Save'}
                    </Button>
                    <Button asChild><a href="https://eprocure.gov.bd" target="_blank" rel="noreferrer"><ExternalLink data-icon="inline-start" />Apply on Portal</a></Button>
                </div>
            </div>
        </section>
    )
}
