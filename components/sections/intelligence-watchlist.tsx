import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import { tenders } from '@/lib/tender-data'
import { MatchScoreRing } from '@/components/common/match-score-ring'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

const watchlist = [tenders[1], tenders[6], tenders[4], tenders[7]]

export function IntelligenceWatchlist() {
    return (
        <aside className="flex flex-col gap-4">
            <div className="flex items-center justify-between"><h2 className="font-semibold">My Watchlist</h2><Button variant="ghost" size="sm" asChild><Link href="/browse">View all<ArrowRight data-icon="inline-end" /></Link></Button></div>
            <Card size="sm">
                {watchlist.map((tender, index) => <div key={tender.id}>{index ? <Separator /> : null}<CardHeader className="grid-cols-[1fr_auto]"><div><Badge variant={tender.days <= 7 ? 'destructive' : 'secondary'}>{tender.days <= 7 ? 'Urgent' : 'Review'}</Badge><CardTitle className="mt-2 text-sm">{tender.title}</CardTitle><CardDescription className="mt-1 font-mono text-xs">{tender.id}</CardDescription></div><MatchScoreRing score={tender.score} size={48} /></CardHeader><CardContent className="flex items-center justify-between text-xs"><span className="flex items-center gap-1 text-muted-foreground"><Clock3 className="size-3" />{tender.days}d left</span><strong className="font-mono">{tender.budget}</strong></CardContent><CardFooter className="justify-end border-0 bg-transparent pt-0"><Button variant="ghost" size="sm" asChild><Link href={`/tender/${tender.id}`}>Open tender<ArrowRight data-icon="inline-end" /></Link></Button></CardFooter></div>)}
            </Card>
            <Card><CardHeader><CardTitle>Profile Strength</CardTitle><CardDescription>Good standing · 80% complete</CardDescription></CardHeader><CardContent className="flex flex-col gap-3">{[['Documents', 100], ['Certifications', 90], ['Empanelment', 50], ['Financials', 100]].map(([label, value]) => <div key={label}><div className="mb-1 flex justify-between text-xs"><span className="text-muted-foreground">{label}</span><strong>{value}%</strong></div><Progress value={Number(value)} /></div>)}</CardContent><CardFooter className="text-xs text-muted-foreground">Complete NHAI empanelment to unlock more tenders.</CardFooter></Card>
        </aside>
    )
}
