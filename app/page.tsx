import { HomePageSections } from '@/components/sections/home-page-sections'
import { loadTenders, loadTenderStats } from '@/lib/api/tenders'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
    const [tenderState, statsState] = await Promise.all([loadTenders({ limit: 500 }), loadTenderStats()])
    return <HomePageSections tenders={tenderState.data.data} stats={statsState.data} apiError={tenderState.error ?? statsState.error} />
}
