'use client'

import { Download, Sparkles } from 'lucide-react'
import { volumeData } from '@/lib/tender-data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export type IntelligenceRange = '30d' | '90d' | '12m' | 'all'

function rowsForRange(range: IntelligenceRange) {
    if (range === '30d') return volumeData.slice(-1)
    if (range === '90d') return volumeData.slice(-3)
    return volumeData
}

export function IntelligenceHeader({ range, onRangeChange }: { range: IntelligenceRange; onRangeChange: (range: IntelligenceRange) => void }) {
    const exportCsv = () => {
        const rows = rowsForRange(range)
        const csv = ['Month,Tenders,Estimated Value (BDT Billions)', ...rows.map((row) => `${row.month},${row.tenders},${row.value}`)].join('\n')
        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
        const link = document.createElement('a')
        link.href = url
        link.download = `tenderiq-market-intelligence-${range}.csv`
        link.click()
        URL.revokeObjectURL(url)
    }

    return (
        <section className="border-b bg-card px-6 py-6">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                <div><Badge variant="secondary" className="mb-2"><Sparkles data-icon="inline-start" />AI-Powered</Badge><h1 className="text-3xl font-bold tracking-tight">Market Intelligence</h1><p className="mt-1 text-sm text-muted-foreground">Real-time procurement analytics and AI-driven insights for your profile</p></div>
                <div className="flex items-center gap-3"><ToggleGroup type="single" value={range} onValueChange={(value) => value && onRangeChange(value as IntelligenceRange)} aria-label="Date range"><ToggleGroupItem value="30d">30D</ToggleGroupItem><ToggleGroupItem value="90d">90D</ToggleGroupItem><ToggleGroupItem value="12m">12M</ToggleGroupItem><ToggleGroupItem value="all">All</ToggleGroupItem></ToggleGroup><Button variant="outline" onClick={exportCsv}><Download data-icon="inline-start" />Export CSV</Button></div>
            </div>
        </section>
    )
}
