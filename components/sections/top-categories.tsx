import Link from 'next/link'
import { categories } from '@/lib/tender-data'
import { SectionHeading } from '@/components/common/section-heading'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function TopCategories() {
    return (
        <section className="bg-warning/5 px-6 py-14">
            <div className="mx-auto max-w-6xl">
                <SectionHeading title="Top Categories" actionHref="/browse" actionLabel="View all" />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {categories.map(({ name, count, icon: Icon }) => (
                        <Link key={name} href={`/browse?q=${encodeURIComponent(name)}`}>
                            <Card size="sm" className="h-full text-center transition duration-200 hover:-translate-y-1 hover:ring-primary/40">
                                <CardHeader className="items-center">
                                    <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary"><Icon className="size-5" aria-hidden="true" /></span>
                                    <CardTitle className="line-clamp-2 text-sm">{name}</CardTitle>
                                </CardHeader>
                                <CardContent><CardDescription className="text-xs">{count} tenders</CardDescription></CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
