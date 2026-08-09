import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Tender } from '@/lib/tender-data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function TrendingTenderCard({ tender }: { tender: Tender & { image: string } }) {
    return (
        <Card className="group h-full pt-0 transition duration-200 hover:-translate-y-1 hover:ring-primary/40">
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={tender.image} alt="" fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <Badge className="absolute right-3 top-3">{tender.score}% IQ Match</Badge>
            </div>
            <CardHeader><CardTitle className="line-clamp-2 text-sm">{tender.title}</CardTitle></CardHeader>
            <CardContent className="font-mono text-xs text-muted-foreground">{tender.id}</CardContent>
            <CardFooter className="justify-end border-0 bg-transparent pt-0">
                <Button size="icon-sm" variant="secondary" asChild><Link href={`/tender/${tender.id}`} aria-label={`View ${tender.title}`}><ArrowRight /></Link></Button>
            </CardFooter>
        </Card>
    )
}
