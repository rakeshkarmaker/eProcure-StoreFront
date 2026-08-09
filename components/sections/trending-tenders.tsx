import { trendingTenders } from '@/lib/tender-data'
import { SectionHeading } from '@/components/common/section-heading'
import { TrendingTenderCard } from '@/components/common/trending-tender-card'

export function TrendingTenders() {
    return (
        <section className="border-y bg-card px-6 py-14">
            <div className="mx-auto max-w-6xl">
                <SectionHeading eyebrow="AI-matched for you" title="Trending Tenders" description="Highest-matching opportunities based on your profile" actionHref="/browse" />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{trendingTenders.map((tender) => <TrendingTenderCard key={tender.id} tender={tender} />)}</div>
            </div>
        </section>
    )
}
