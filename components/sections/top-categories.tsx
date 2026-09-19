import Link from 'next/link'
import { categories } from '@/lib/tender-data'
import { SectionHeading } from '@/components/common/section-heading'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { TenderApiRecord } from '@/lib/tenders/types'

export function TopCategories({ tenders }: { tenders: TenderApiRecord[] }) {
    return (
        <section className="bg-category/[0.035] px-4 py-12 sm:px-6 sm:py-14">
            <div className="mx-auto max-w-6xl">
                <SectionHeading title="Top Categories" actionHref="/browse" actionLabel="View all" accent="category" />
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {categories.map(({ name, keywords, icon: Icon }) => {
                        const count = tenders.filter((tender) => {
                            const searchable = [tender.title, tender.category, tender.procurementNature, tender.briefDescription].filter(Boolean).join(' ').toLowerCase()
                            return keywords.some((keyword) => searchable.includes(keyword))
                        }).length
                        return (
                        <Link key={name} href={`/browse?q=${encodeURIComponent(keywords.find((keyword) => keyword !== 'works') ?? keywords[0])}`} className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                            <Card size="sm" className="h-full min-h-40 rounded-2xl text-center ring-2 ring-foreground/10 transition-[transform,box-shadow,background-color,color] duration-200 group-hover:-translate-y-1 group-hover:bg-category group-hover:text-category-foreground group-hover:shadow-[0_10px_28px_rgba(249,115,22,0.24)] group-hover:ring-category">
                                <CardHeader className="flex flex-1 flex-col items-center gap-3 p-4 pb-1">
                                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-category/10 text-category transition-colors group-hover:bg-white/20 group-hover:text-white"><Icon className="size-6" aria-hidden="true" /></span>
                                    <CardTitle className="line-clamp-2 min-h-10 text-sm font-bold group-hover:text-white">{name}</CardTitle>
                                </CardHeader>
                                <CardContent className="pb-4"><CardDescription className="text-xs group-hover:text-white/80">{count.toLocaleString('en-BD')} tenders</CardDescription></CardContent>
                            </Card>
                        </Link>
                    )})}
                </div>
            </div>
        </section>
    )
}
