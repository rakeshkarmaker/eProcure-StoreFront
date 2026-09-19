'use client'

import { Download, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { ActivityDatum } from '@/components/sections/intelligence-page-sections'

export type IntelligenceRange = '30d' | '90d' | '12m' | 'all'

function rowsForRange(range: IntelligenceRange, activityData: ActivityDatum[]) {
    if (range === '30d') return activityData.slice(-1)
    if (range === '90d') return activityData.slice(-3)
    if (range === '12m') return activityData.slice(-12)
    return activityData
}

export function IntelligenceHeader({ range, onRangeChange, activityData }: { range: IntelligenceRange; onRangeChange: (range: IntelligenceRange) => void; activityData: ActivityDatum[] }) {
    const exportCsv = () => {
        const rows = rowsForRange(range, activityData)
        const csv = ['Month,Tenders,Lots', ...rows.map((row) => `${row.month},${row.tenders},${row.value}`)].join('\n')
        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
        const link = document.createElement('a')
        link.href = url
        link.download = `tenderiq-market-intelligence-${range}.csv`
        link.click()
        URL.revokeObjectURL(url)
    }

    return (
        <section className="border-b bg-card px-4 py-8 sm:px-6">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                <div><Badge variant="secondary" className="mb-2"><Sparkles data-icon="inline-start" />Live data</Badge><h1 className="text-3xl font-bold tracking-tight">Market Intelligence</h1><p className="mt-1 text-sm text-muted-foreground">Procurement analytics derived from the current e-GP tender index</p></div>
                <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto"><ToggleGroup type="single" value={range} onValueChange={(value) => value && onRangeChange(value as IntelligenceRange)} aria-label="Date range" className="min-h-11"><ToggleGroupItem value="30d" className="min-h-11 px-3">30D</ToggleGroupItem><ToggleGroupItem value="90d" className="min-h-11 px-3">90D</ToggleGroupItem><ToggleGroupItem value="12m" className="min-h-11 px-3">12M</ToggleGroupItem><ToggleGroupItem value="all" className="min-h-11 px-3">All</ToggleGroupItem></ToggleGroup><Button variant="outline" className="min-h-11" onClick={exportCsv} disabled={!activityData.length}><Download data-icon="inline-start" />Export CSV</Button></div>
            </div>
        </section>
    )
}
