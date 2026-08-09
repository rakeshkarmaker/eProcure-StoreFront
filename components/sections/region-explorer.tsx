import Link from 'next/link'
import { regions } from '@/lib/tender-data'
import { SectionHeading } from '@/components/common/section-heading'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export function RegionExplorer() {
    return (
        <section className="border-y bg-card px-6 py-14">
            <div className="mx-auto max-w-6xl">
                <SectionHeading eyebrow="All 8 divisions" title="Browse by Region" description="Active procurement across every division of Bangladesh" actionHref="/browse" actionLabel="View all regions" />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {regions.map(({ name, tenders: count, value, sectors, icon: Icon }) => (
                        <Link key={name} href={`/browse?q=${name}`}>
                            <Card size="sm" className="h-full transition duration-200 hover:-translate-y-1 hover:ring-primary/40">
                                <CardHeader>
                                    <div className="flex items-center justify-between gap-2"><span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary"><Icon className="size-5" /></span><Badge variant="secondary">{count} active</Badge></div>
                                    <CardTitle className="text-base">{name}</CardTitle>
                                    <CardDescription className="font-mono">{value} total value</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-wrap gap-1">{sectors.map((sector) => <Badge key={sector} variant="outline">{sector}</Badge>)}</CardContent>
                                <CardFooter className="flex-col items-stretch gap-1 border-0 bg-transparent pt-0"><span className="text-xs text-muted-foreground">Activity</span><Progress value={(count / 425) * 100} /></CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
