import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/common/section-heading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const opportunities = [
    ['PRG-C1', 'Road Widening Project — NH-48 Karnataka Segment', '₹220 Cr'],
    ['PA-4.5', 'Bridge Rehabilitation & Strengthening — Nashik', '₹45 Cr'],
    ['NMC-01', 'Smart Road Phase I — Nagpur Ring Road Extension', '₹180 Cr'],
]

export function SimilarOpportunities() {
    return (
        <section className="mt-6">
            <SectionHeading title="Similar Opportunities" actionHref="/browse" />
            <div className="grid gap-4 sm:grid-cols-3">
                {opportunities.map(([id, title, budget]) => <Card key={id} size="sm"><CardHeader><Badge variant="secondary">High match</Badge><CardTitle className="text-sm">{title}</CardTitle></CardHeader><CardContent className="flex justify-between gap-3"><span className="font-mono text-xs text-muted-foreground">{id}</span><strong>{budget}</strong></CardContent><CardFooter className="justify-end"><Button variant="ghost" size="sm" asChild><Link href={`/tender/${id}`}>View<ArrowRight data-icon="inline-end" /></Link></Button></CardFooter></Card>)}
            </div>
        </section>
    )
}
