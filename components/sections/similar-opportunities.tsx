import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/common/section-heading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatBdt, tenderScore } from '@/lib/tenders/transform'
import type { TenderApiRecord } from '@/lib/tenders/types'

export function SimilarOpportunities({ tenders }: { tenders: TenderApiRecord[] }) {
    if (!tenders.length) return null
    return (
        <section className="mt-6">
            <SectionHeading title="Similar Opportunities" actionHref="/browse" />
            <div className="grid gap-4 sm:grid-cols-3">
                {tenders.map((tender) => <Card key={tender.id} size="sm"><CardHeader><Badge variant="secondary">{tenderScore(tender)}% data match</Badge><CardTitle className="text-sm">{tender.title}</CardTitle></CardHeader><CardContent className="flex justify-between gap-3"><span className="font-mono text-xs text-muted-foreground">{tender.tenderId}</span><strong>{formatBdt(tender.lots?.[0]?.securityAmount)}</strong></CardContent><CardFooter className="justify-end"><Button variant="ghost" size="sm" asChild><Link href={`/tender/${tender.tenderId}`}>View<ArrowRight data-icon="inline-end" /></Link></Button></CardFooter></Card>)}
            </div>
        </section>
    )
}
