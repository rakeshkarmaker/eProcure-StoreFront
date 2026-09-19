import { Activity, CircleGauge, ClockAlert, TrendingUp } from 'lucide-react'
import { StatTile } from '@/components/common/stat-tile'
import type { Tender } from '@/lib/tender-data'
import type { TenderStatsResponse } from '@/lib/tenders/types'

export function IntelligenceKpis({ stats, tenders }: { stats: TenderStatsResponse; tenders: Tender[] }) {
    const averageScore = tenders.length ? Math.round(tenders.reduce((sum, tender) => sum + tender.score, 0) / tenders.length) : 0
    const urgent = tenders.filter((tender) => tender.days <= 7).length
    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="Indexed Tenders" value={stats.totalStored.toLocaleString('en-BD')} detail="Current database total" change="Live" icon={TrendingUp} />
            <StatTile label="Added Today" value={stats.scrapedToday.toLocaleString('en-BD')} detail="Newly scraped records" change="Today" icon={Activity} />
            <StatTile label="Average Data Score" value={String(averageScore)} detail="Top indexed opportunities" change="Completeness" icon={CircleGauge} />
            <StatTile label="Expiring in 7 Days" value={String(urgent)} detail="Among top matches" change={urgent ? 'Urgent' : 'Clear'} icon={ClockAlert} />
        </section>
    )
}
