import Link from 'next/link'
import { ArrowRight, Building2, Clock3, MapPin, Sparkles } from 'lucide-react'
import type { Tender } from '@/lib/tender-data'
import { MatchScoreRing } from '@/components/common/match-score-ring'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function TenderResultCard({ tender }: { tender: Tender }) {
    return (
        <Card className="transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:ring-primary/40 hover:shadow-lg">
            <CardHeader>
                <div className="flex min-w-0 items-center gap-4">
                    <MatchScoreRing score={tender.score} />
                    <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                            <Badge variant="secondary">{tender.category}</Badge>
                            <span className="font-mono text-xs text-muted-foreground">{tender.id}</span>
                            {tender.featured ? <Badge><Sparkles data-icon="inline-start" />Perfect match</Badge> : null}
                        </div>
                        <CardTitle className="line-clamp-2 text-base">{tender.title}</CardTitle>
                    </div>
                </div>
                <CardAction><Button size="icon" className="size-11" asChild><Link href={`/tender/${tender.id}`} aria-label={`View ${tender.title}`}><ArrowRight /></Link></Button></CardAction>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
                <span className="flex items-center gap-1.5"><Building2 className="size-3.5" />{tender.authority}</span>
                <span className="flex items-center gap-1.5"><MapPin className="size-3.5" />{tender.location}</span>
                <span className="font-mono font-bold text-foreground">{tender.budget}</span>
                <span className="flex items-center gap-1.5 font-semibold text-foreground"><Clock3 className="size-3.5" />{tender.days === 9999 ? tender.deadlineLabel : `${tender.days} days left`}</span>
            </CardContent>
            <CardFooter className="justify-between text-xs text-muted-foreground"><span>{tender.budgetLabel ?? 'Financial value'}</span><span>{tender.deadlineLabel ?? `Ends in ${tender.days} days`}</span></CardFooter>
        </Card>
    )
}
