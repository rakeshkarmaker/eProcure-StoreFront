'use client'

import { useState } from 'react'
import { AiInsights } from '@/components/sections/ai-insights'
import { IntelligenceHeader } from '@/components/sections/intelligence-header'
import { IntelligenceKpis } from '@/components/sections/intelligence-kpis'
import { IntelligenceWatchlist } from '@/components/sections/intelligence-watchlist'
import { ProcurementCharts } from '@/components/sections/procurement-charts'
import type { IntelligenceRange } from '@/components/sections/intelligence-header'

export function IntelligencePageSections() {
    const [range, setRange] = useState<IntelligenceRange>('12m')

    return (
        <>
            <IntelligenceHeader range={range} onRangeChange={setRange} />
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6">
                <IntelligenceKpis />
                <ProcurementCharts range={range} />
                <div className="grid gap-4 lg:grid-cols-3"><div className="lg:col-span-2"><AiInsights /></div><IntelligenceWatchlist /></div>
            </div>
        </>
    )
}
