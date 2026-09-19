import Link from 'next/link'
import { regions, type RegionStyle } from '@/lib/tender-data'
import { SectionHeading } from '@/components/common/section-heading'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { TenderApiRecord } from '@/lib/tenders/types'

export function RegionExplorer({ tenders }: { tenders: TenderApiRecord[] }) {
    const regionalData = regions.map((region) => {
        const matches = tenders.filter((tender) => [tender.procuringEntityDistrict, tender.division, tender.officialAddress].filter(Boolean).join(' ').toLowerCase().includes(region.name.toLowerCase()))
        const sectorCounts = new Map<string, number>()
        for (const tender of matches) {
            const sector = tender.procurementNature || tender.procurementType || 'Procurement'
            sectorCounts.set(sector, (sectorCounts.get(sector) ?? 0) + 1)
        }
        const sectors = [...sectorCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([sector]) => sector)
        return { ...region, count: matches.length, sectors: sectors.length ? sectors : ['No sector data'] }
    })
    const maxCount = Math.max(...regionalData.map((region) => region.count), 1)

    return (
        <section className="border-y bg-card px-4 py-12 sm:px-6 sm:py-14">
            <div className="mx-auto max-w-6xl">
                <SectionHeading eyebrow="All 8 divisions" title="Browse by Region" description="Active procurement across every division of Bangladesh" actionHref="/browse" actionLabel="View all regions" />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {regionalData.map(({ name, count, sectors, icon: Icon, accent }) => (
                        <Link key={name} href={`/browse?q=${encodeURIComponent(name)}`} className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50" style={{ '--region-accent': accent } as RegionStyle}>
                            <Card size="sm" className="relative h-full min-h-48 rounded-2xl bg-muted/20 ring-2 ring-foreground/[0.07] transition-[transform,box-shadow,background-color,color] duration-200 group-hover:-translate-y-1 group-hover:bg-[var(--region-accent)] group-hover:text-white group-hover:shadow-lg group-hover:ring-[var(--region-accent)]">
                                <CardHeader className="gap-3 p-4 pb-1">
                                    <div className="flex items-center justify-between gap-2"><span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-[var(--region-accent)] transition-colors group-hover:bg-white/20 group-hover:text-white"><Icon className="size-5" aria-hidden="true" /></span><Badge variant="secondary" className="text-[var(--region-accent)] group-hover:bg-white/20 group-hover:text-white">{count} active</Badge></div>
                                    <CardTitle className="text-base font-bold group-hover:text-white">{name}</CardTitle>
                                    <CardDescription className="font-mono text-xs group-hover:text-white/75">Live e-GP records</CardDescription>
                                </CardHeader>
                                <CardContent className="flex min-h-7 flex-wrap gap-1 px-4">{sectors.map((sector) => <Badge key={sector} variant="outline" className="group-hover:border-white/25 group-hover:bg-white/15 group-hover:text-white">{sector}</Badge>)}</CardContent>
                                <CardFooter className="mt-auto flex-col items-stretch gap-1.5 border-0 bg-transparent p-4 pt-2"><span className="flex justify-between text-xs text-muted-foreground group-hover:text-white/70"><span>Activity</span><strong className="text-[var(--region-accent)] group-hover:text-white">{Math.round((count / maxCount) * 100)}%</strong></span><Progress value={(count / maxCount) * 100} className="group-hover:bg-white/20 [&_[data-slot=progress-indicator]]:bg-[var(--region-accent)] group-hover:[&_[data-slot=progress-indicator]]:bg-white" /></CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
