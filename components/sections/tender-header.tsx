'use client'

import { useState } from 'react'
import { Bookmark, BookmarkCheck, ExternalLink, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatTenderDate, tenderCategory } from '@/lib/tenders/transform'
import type { TenderApiRecord } from '@/lib/tenders/types'

export function TenderHeader({ tender }: { tender: TenderApiRecord }) {
    const [saved, setSaved] = useState(false)

    return (
        <section className="relative border-b bg-card px-4 py-8 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-success before:via-primary before:to-chart-4 sm:px-6">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row">
                <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2"><Badge variant="secondary">{tenderCategory(tender)}</Badge><Badge variant="outline" className="font-mono">{tender.tenderId}</Badge><Badge>{tender.eventType || 'e-Procurement'}</Badge><Badge variant="secondary">{tender.status}</Badge></div>
                    <h1 className="max-w-3xl text-2xl font-bold leading-snug tracking-tight sm:text-3xl">{tender.title}</h1>
                    <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4" />{tender.procuringEntityDistrict || tender.division || 'Bangladesh'} · {tender.organization || tender.procuringEntity || 'Government entity'} · Published {formatTenderDate(tender.publishedDate)}</p>
                </div>
                <div className="flex w-full gap-2 sm:w-auto">
                    <Button className="min-h-11 flex-1 sm:flex-none" variant={saved ? 'secondary' : 'outline'} aria-pressed={saved} onClick={() => setSaved((value) => !value)}>
                        {saved ? <BookmarkCheck data-icon="inline-start" /> : <Bookmark data-icon="inline-start" />}
                        {saved ? 'Saved' : 'Save'}
                    </Button>
                    <Button className="min-h-11 flex-1 sm:flex-none" asChild><a href="https://eprocure.gov.bd" target="_blank" rel="noreferrer"><ExternalLink data-icon="inline-start" />Apply on Portal</a></Button>
                </div>
            </div>
        </section>
    )
}
