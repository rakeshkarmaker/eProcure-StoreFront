'use client'

import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Progress } from '@/components/ui/progress'
import type { IntelligenceRange } from '@/components/sections/intelligence-header'
import type { ActivityDatum, SectorDatum } from '@/components/sections/intelligence-page-sections'

const activityConfig = {
    tenders: { label: 'Tender volume', color: 'var(--chart-1)' },
    value: { label: 'Lots', color: 'var(--chart-2)' },
} satisfies ChartConfig

export function ProcurementCharts({ range, activityData: allActivityData, sectorData, total }: { range: IntelligenceRange; activityData: ActivityDatum[]; sectorData: SectorDatum[]; total: number }) {
    const activityData = range === '30d' ? allActivityData.slice(-1) : range === '90d' ? allActivityData.slice(-3) : range === '12m' ? allActivityData.slice(-12) : allActivityData
    const sectorTotal = sectorData.reduce((sum, sector) => sum + sector.value, 0)
    const largestSector = Math.max(...sectorData.map((sector) => sector.value), 1)

    return (
        <section className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2"><CardHeader><CardTitle>Tender Activity</CardTitle><CardDescription>Monthly tender volume and lot count</CardDescription></CardHeader><CardContent><ChartContainer config={activityConfig} className="h-[240px] w-full"><AreaChart data={activityData} margin={{ left: -20, right: 8 }} accessibilityLayer><defs><linearGradient id="tender-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-tenders)" stopOpacity={0.25} /><stop offset="95%" stopColor="var(--color-tenders)" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} /><XAxis dataKey="month" tickLine={false} axisLine={false} /><YAxis tickLine={false} axisLine={false} /><ChartTooltip content={<ChartTooltipContent />} /><Area dataKey="tenders" type="monotone" stroke="var(--color-tenders)" strokeWidth={2} fill="url(#tender-fill)" dot={{ r: 4, fill: 'var(--color-tenders)' }} isAnimationActive={false} /><Area dataKey="value" type="monotone" stroke="var(--color-value)" strokeWidth={2} fill="transparent" dot={{ r: 3, fill: 'var(--color-value)' }} isAnimationActive={false} /></AreaChart></ChartContainer></CardContent></Card>
            <Card><CardHeader><CardTitle>Sector Distribution</CardTitle><CardDescription>By tender count</CardDescription></CardHeader><CardContent><div className="relative mx-auto size-40"><ChartContainer config={{ value: { label: 'Tenders' } }} className="size-40" style={{ aspectRatio: '1 / 1' }} initialDimension={{ width: 160, height: 160 }}><PieChart><Pie data={sectorData} dataKey="value" cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={2.5} strokeWidth={0} isAnimationActive={false}>{sectorData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}</Pie></PieChart></ChartContainer><div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><strong className="font-mono text-xl">{total.toLocaleString('en-BD')}</strong><span className="text-[10px] uppercase text-muted-foreground">tenders</span></div></div><div className="mt-4 flex flex-col gap-2">{sectorData.map((sector) => <div key={sector.name} className="grid grid-cols-[1fr_64px_40px] items-center gap-2 text-xs"><span className="truncate text-muted-foreground">{sector.name}</span><Progress value={(sector.value / largestSector) * 100} /><strong className="text-right">{sectorTotal ? Math.round((sector.value / sectorTotal) * 100) : 0}%</strong></div>)}</div></CardContent></Card>
        </section>
    )
}
