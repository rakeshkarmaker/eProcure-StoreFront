import { Separator } from '@/components/ui/separator'
import { Database, Radar, ShieldCheck } from 'lucide-react'
import { formatLatestScrape } from '@/lib/tenders/transform'
import type { TenderStatsResponse } from '@/lib/tenders/types'

export function HomeStats({ stats: liveStats }: { stats: TenderStatsResponse }) {
    const stats = [
        { value: liveStats.totalStored.toLocaleString('en-BD'), label: 'Stored tenders' },
        { value: liveStats.scrapedToday.toLocaleString('en-BD'), label: 'Added today' },
        { value: formatLatestScrape(liveStats), label: 'Latest sync' },
    ]
    return (
        <section className="border-y bg-card">
            <div className="mx-auto grid max-w-4xl grid-cols-3 px-4 py-10">
                {stats.map((stat, index) => (
                    <div key={stat.label} className="relative px-2 text-center sm:px-8">
                        <p className="font-mono text-2xl font-bold tracking-tight sm:text-4xl">{stat.value}</p>
                        <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:text-xs">{stat.label}</p>
                        {index < stats.length - 1 ? <Separator orientation="vertical" className="absolute right-0 top-0" /> : null}
                    </div>
                ))}
            </div>
            <div className="border-t bg-muted/30 px-4 py-3 sm:px-6">
                <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground sm:text-sm">
                    <span className="flex items-center gap-2"><Database className="size-4 text-primary" aria-hidden="true" />{liveStats.totalStored.toLocaleString('en-BD')} indexed tenders</span>
                    <span className="flex items-center gap-2"><Radar className="size-4 text-primary" aria-hidden="true" />Live e-GP intelligence</span>
                    <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" aria-hidden="true" />Verified procurement fields</span>
                </div>
            </div>
        </section>
    )
}
