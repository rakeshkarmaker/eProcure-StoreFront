import { SimilarOpportunities } from '@/components/sections/similar-opportunities'
import { TenderDetails } from '@/components/sections/tender-details'
import { TenderHeader } from '@/components/sections/tender-header'
import { TenderIntelligenceSidebar } from '@/components/sections/tender-intelligence-sidebar'
import { TenderMetrics } from '@/components/sections/tender-metrics'
import type { TenderApiRecord } from '@/lib/tenders/types'

export function TenderPageSections({ tender, similar }: { tender: TenderApiRecord; similar: TenderApiRecord[] }) {
    return (
        <>
            <TenderHeader tender={tender} />
            <TenderMetrics tender={tender} />
            <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_316px]">
                <div className="min-w-0"><TenderDetails tender={tender} /><SimilarOpportunities tenders={similar} /></div>
                <TenderIntelligenceSidebar tender={tender} />
            </div>
        </>
    )
}
