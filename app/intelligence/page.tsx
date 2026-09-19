import { IntelligencePageSections } from '@/components/sections/intelligence-page-sections'
import { loadTenders, loadTenderStats } from '@/lib/api/tenders'
import { buildActivityData, buildSectorData, toUiTender } from '@/lib/tenders/transform'

export const dynamic = 'force-dynamic'

export default async function IntelligencePage() {
    const [tenderState, statsState] = await Promise.all([loadTenders({ limit: 500 }), loadTenderStats()])
    const records = tenderState.data.data
    const watchlist = records.map(toUiTender).sort((a, b) => b.score - a.score).slice(0, 4)
    return <IntelligencePageSections activityData={buildActivityData(records)} sectorData={buildSectorData(records)} watchlist={watchlist} stats={statsState.data} apiError={tenderState.error ?? statsState.error} />
}
