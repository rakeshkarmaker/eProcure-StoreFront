import { Check, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatTenderDate, tenderScore } from '@/lib/tenders/transform'
import type { TenderApiRecord } from '@/lib/tenders/types'

export function TenderIntelligenceSidebar({ tender }: { tender: TenderApiRecord }) {
    const score = tenderScore(tender)
    const quickFacts = [
        ['Tender status', tender.status],
        ['Procurement nature', tender.procurementNature],
        ['Budget type', tender.budgetType],
        ['Last scraped', formatTenderDate(tender.scrapedAt)],
        ['Published lots', String(tender.lots?.length ?? 0)],
    ]

    return (
        <aside className="flex flex-col gap-4">
            <Card className="ring-primary/30">
                <CardHeader className="bg-primary text-primary-foreground"><CardTitle className="flex items-center gap-2"><Sparkles className="size-4" />Tender Intelligence</CardTitle><CardDescription className="text-primary-foreground/70">Derived from published fields</CardDescription></CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                    {[['Completeness', `${score}%`, score >= 85 ? 'Strong' : 'Review'], ['Lots', String(tender.lots?.length ?? 0), 'Published'], ['Amendments', String(tender.amendments?.length ?? 0), 'Recorded'], ['Eligibility', tender.eligibility ? 'Yes' : 'No', 'Available']].map(([label, value, sub]) => <div key={label} className="rounded-lg bg-secondary p-3"><p className="text-[10px] font-bold uppercase text-muted-foreground">{label}</p><p className="font-mono text-xl font-extrabold text-primary">{value}</p><p className="text-[10px] text-muted-foreground">{sub}</p></div>)}
                </CardContent>
                <CardContent><div className="rounded-xl bg-warning/10 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-warning-foreground">Next action</p><strong className="mt-1 block text-xl">REVIEW NOTICE</strong><p className="mt-2 text-xs text-muted-foreground">Confirm eligibility, amendments, securities, and dates on the official portal before bidding.</p></div></CardContent>
            </Card>
            <Card><CardHeader><CardTitle>Quick Facts</CardTitle></CardHeader><CardContent className="flex flex-col gap-2">{quickFacts.map(([label, value], index) => <div key={label}>{index ? <Separator className="mb-2" /> : null}<div className="flex justify-between gap-3 text-xs"><span className="text-muted-foreground">{label}</span><strong className="text-right">{value || 'Not specified'}</strong></div></div>)}</CardContent></Card>
            <Card><CardHeader><CardTitle>Procurement Contact</CardTitle><CardDescription>{tender.officialDesignation || 'Official contact'}</CardDescription></CardHeader><CardContent><div className="flex items-start gap-3"><span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary font-semibold text-primary">{(tender.officialName || 'PO').split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()}</span><div className="min-w-0"><strong className="text-sm">{tender.officialName || 'Not specified'}</strong><p className="mt-1 break-words text-xs text-muted-foreground">{tender.officialAddress || tender.officialContact || 'Contact information is not available.'}</p>{tender.officialName ? <Badge variant="secondary" className="mt-2"><Check data-icon="inline-start" />Published contact</Badge> : null}</div></div></CardContent></Card>
        </aside>
    )
}
