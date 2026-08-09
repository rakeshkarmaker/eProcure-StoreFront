import { SimilarOpportunities } from '@/components/sections/similar-opportunities'
import { TenderDetails } from '@/components/sections/tender-details'
import { TenderHeader } from '@/components/sections/tender-header'
import { TenderIntelligenceSidebar } from '@/components/sections/tender-intelligence-sidebar'
import { TenderMetrics } from '@/components/sections/tender-metrics'

export function TenderPageSections({ id }: { id: string }) {
    return (
        <>
            <TenderHeader id={id} />
            <TenderMetrics />
            <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_316px]">
                <div className="min-w-0"><TenderDetails /><SimilarOpportunities /></div>
                <TenderIntelligenceSidebar />
            </div>
        </>
    )
}
