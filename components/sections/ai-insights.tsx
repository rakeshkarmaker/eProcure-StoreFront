import { ChartNoAxesCombined, CircleAlert, Lightbulb, Sparkles, Target } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { Tender } from '@/lib/tender-data'
import type { SectorDatum } from '@/components/sections/intelligence-page-sections'

export function AiInsights({ sectors, tenders }: { sectors: SectorDatum[]; tenders: Tender[] }) {
    const topSector = sectors[0]
    const urgent = tenders.filter((tender) => tender.days <= 7)
    const complete = tenders.filter((tender) => tender.score >= 85).length
    const insights = [
        { type: 'Market signal', title: topSector ? `${topSector.name} leads the current index` : 'Sector data is still being collected', body: topSector ? `${topSector.value.toLocaleString('en-BD')} indexed tenders are classified in this procurement segment.` : 'Run or complete a scrape to populate sector analysis.', time: 'Live', icon: Target },
        { type: 'Deadline', title: `${urgent.length} top matches close within 7 days`, body: urgent[0] ? `${urgent[0].id} is the nearest high-scoring opportunity and needs immediate review.` : 'No urgent deadlines appear among the current top matches.', time: 'Live', icon: CircleAlert },
        { type: 'Data quality', title: `${complete} top matches have strong record completeness`, body: 'Scores reflect populated eligibility, contact, method, funding, and deadline fields—not a prediction of bid success.', time: 'Current index', icon: ChartNoAxesCombined },
        { type: 'Coverage', title: `${sectors.length} procurement segments represented`, body: 'Use the category and region filters to narrow the current e-GP index to relevant opportunities.', time: 'Current index', icon: Lightbulb },
    ]
    return (
        <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between"><h2 className="flex items-center gap-2 font-semibold"><Sparkles className="size-4 text-primary" />AI Insights</h2><Badge variant="secondary">Live analysis</Badge></div>
            {insights.map(({ type, title, body, time, icon: Icon }) => <Card key={title} size="sm" className="transition hover:ring-primary/30"><CardHeader className="grid-cols-[auto_1fr]"><span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary"><Icon className="size-5" /></span><div><div className="flex flex-wrap gap-2"><Badge variant="outline">{type}</Badge><span className="text-xs text-muted-foreground">{time}</span></div><CardTitle className="mt-2 text-sm">{title}</CardTitle></div></CardHeader><CardContent><CardDescription>{body}</CardDescription></CardContent></Card>)}
            <Card><CardHeader><CardTitle>Sector Coverage</CardTitle><CardDescription>Share of classified tender records</CardDescription></CardHeader><CardContent className="flex flex-col gap-3">{sectors.map((sector) => { const total = sectors.reduce((sum, item) => sum + item.value, 0); const rate = total ? Math.round((sector.value / total) * 100) : 0; return <div key={sector.name}><div className="mb-1 flex justify-between text-xs"><span className="text-muted-foreground">{sector.name}</span><strong>{rate}%</strong></div><Progress value={rate} /></div> })}</CardContent></Card>
        </section>
    )
}
