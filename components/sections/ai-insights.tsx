import { ChartNoAxesCombined, CircleAlert, Lightbulb, Sparkles, Target } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const insights = [
    { type: 'Opportunity', title: 'ICT sector demand surging — 40% YoY increase', body: 'Government digitisation budget expanded by ৳2.8B. High probability of 60+ new cloud and e-governance tenders in Q1.', time: '2 hours ago', icon: Target },
    { type: 'Alert', title: '3 high-match deadlines within 7 days', body: 'BGP-2024-ICT-0042 closes in 4 days. Immediate action recommended.', time: 'Live', icon: CircleAlert },
    { type: 'Market Signal', title: 'Infrastructure bid prices down 8% in Q4', body: 'Average bidders per lot fell from 9.2 to 5.7, improving win probability.', time: 'Yesterday', icon: ChartNoAxesCombined },
    { type: 'Insight', title: 'NHAI Empanelment unlocks 22% more opportunities', body: 'Completing empanelment would qualify you for 274 more tenders worth ৳48B annually.', time: '3 days ago', icon: Lightbulb },
]

export function AiInsights() {
    return (
        <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between"><h2 className="flex items-center gap-2 font-semibold"><Sparkles className="size-4 text-primary" />AI Insights</h2><Badge variant="secondary">Live analysis</Badge></div>
            {insights.map(({ type, title, body, time, icon: Icon }) => <Card key={title} size="sm" className="transition hover:ring-primary/30"><CardHeader className="grid-cols-[auto_1fr]"><span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary"><Icon className="size-5" /></span><div><div className="flex flex-wrap gap-2"><Badge variant="outline">{type}</Badge><span className="text-xs text-muted-foreground">{time}</span></div><CardTitle className="mt-2 text-sm">{title}</CardTitle></div></CardHeader><CardContent><CardDescription>{body}</CardDescription></CardContent></Card>)}
            <Card><CardHeader><CardTitle>Sector Win Rate Benchmark</CardTitle><CardDescription>Industry average: 51%</CardDescription></CardHeader><CardContent className="flex flex-col gap-3">{[['ICT', 68], ['Infrastructure', 52], ['Energy', 61], ['Healthcare', 44], ['Defense', 38], ['Education', 55]].map(([sector, rate]) => <div key={sector}><div className="mb-1 flex justify-between text-xs"><span className="text-muted-foreground">{sector}</span><strong>{rate}%</strong></div><Progress value={Number(rate)} /></div>)}</CardContent></Card>
        </section>
    )
}
