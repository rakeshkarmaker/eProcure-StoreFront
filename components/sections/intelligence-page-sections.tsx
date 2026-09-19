'use client'

import { useState } from 'react'
import { AiInsights } from '@/components/sections/ai-insights'
import { IntelligenceHeader } from '@/components/sections/intelligence-header'
import { IntelligenceKpis } from '@/components/sections/intelligence-kpis'
import { IntelligenceWatchlist } from '@/components/sections/intelligence-watchlist'
import { ProcurementCharts } from '@/components/sections/procurement-charts'
import type { IntelligenceRange } from '@/components/sections/intelligence-header'
import type { Tender } from '@/lib/tender-data'
import type { TenderStatsResponse } from '@/lib/tenders/types'
import { ApiAlert } from '@/components/common/api-alert'

export type ActivityDatum = { month: string; tenders: number; value: number }
export type SectorDatum = { name: string; value: number; fill: string }

export function IntelligencePageSections({ activityData, sectorData, watchlist, stats, apiError }: { activityData: ActivityDatum[]; sectorData: SectorDatum[]; watchlist: Tender[]; stats: TenderStatsResponse; apiError: string | null }) {
    const [range, setRange] = useState<IntelligenceRange>('12m')

    return (
        <>
            <IntelligenceHeader range={range} onRangeChange={setRange} activityData={activityData} />
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6">
                {apiError ? <ApiAlert message={apiError} retryHref="/intelligence" /> : null}
                <IntelligenceKpis stats={stats} tenders={watchlist} />
                <ProcurementCharts range={range} activityData={activityData} sectorData={sectorData} total={stats.totalStored} />
                <div className="grid gap-4 lg:grid-cols-3"><div className="lg:col-span-2"><AiInsights sectors={sectorData} tenders={watchlist} /></div><IntelligenceWatchlist tenders={watchlist} /></div>
            </div>
        </>
    )
}
