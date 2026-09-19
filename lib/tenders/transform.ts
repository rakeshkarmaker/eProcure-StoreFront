import type { Tender } from '@/lib/tender-data'
import type { TenderApiRecord, TenderStatsResponse } from '@/lib/tenders/types'

const monthIndexes: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
}

export function parseTenderDate(value: string | null | undefined) {
    if (!value) return null
    const match = value.match(/^(\d{1,2})[-\s]([A-Za-z]{3})[-\s](\d{4})(?:\s+(\d{1,2}):(\d{2}))?/)
    if (match) {
        const month = monthIndexes[match[2].toLowerCase()]
        if (month !== undefined) return new Date(Number(match[3]), month, Number(match[1]), Number(match[4] ?? 0), Number(match[5] ?? 0))
    }
    const parsed = new Date(value)
    return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function formatTenderDate(value: string | null | undefined, fallback = 'Not specified') {
    const date = parseTenderDate(value)
    return date ? new Intl.DateTimeFormat('en-BD', { day: '2-digit', month: 'short', year: 'numeric' }).format(date) : (value || fallback)
}

export function formatBdt(value: string | null | undefined, fallback = 'Not disclosed') {
    if (!value) return fallback
    const numeric = value.replace(/[^0-9.]/g, '')
    if (!numeric) return value
    const amount = Number(numeric)
    if (!Number.isFinite(amount)) return value
    if (amount >= 10_000_000) return `৳${(amount / 10_000_000).toFixed(2)}Cr`
    if (amount >= 100_000) return `৳${(amount / 100_000).toFixed(1)}L`
    return `৳${new Intl.NumberFormat('en-BD').format(amount)}`
}

export function tenderCategory(tender: TenderApiRecord) {
    if (tender.procurementNature === 'Works') return 'Infrastructure'
    if (tender.procurementNature === 'Goods') return 'Goods'
    if (tender.procurementNature?.toLowerCase().includes('service')) return 'Services'
    return tender.procurementNature || tender.procurementType || 'Procurement'
}

export function tenderScore(tender: TenderApiRecord) {
    const fields = [tender.briefDescription, tender.eligibility, tender.category, tender.lots?.length, tender.officialName, tender.closingDate, tender.procurementMethod, tender.sourceOfFunds]
    const completeness = fields.filter(Boolean).length / fields.length
    return Math.round(55 + completeness * 40)
}

export function toUiTender(tender: TenderApiRecord): Tender {
    const closingDate = parseTenderDate(tender.closingDate)
    const difference = closingDate ? Math.ceil((closingDate.getTime() - Date.now()) / 86_400_000) : null
    return {
        id: tender.tenderId || String(tender.id),
        title: tender.title.replace(/\s+/g, ' ').trim(),
        category: tenderCategory(tender),
        authority: tender.organization || tender.procuringEntity || tender.ministry || 'Government procuring entity',
        location: tender.procuringEntityDistrict || tender.division || 'Bangladesh',
        budget: formatBdt(tender.lots?.[0]?.securityAmount),
        budgetLabel: tender.lots?.[0]?.securityAmount ? 'Tender security' : 'Financial value',
        days: difference === null ? 9999 : Math.max(0, difference),
        deadlineLabel: tender.closingDate ? formatTenderDate(tender.closingDate) : 'No closing date',
        score: tenderScore(tender),
        featured: tenderScore(tender) >= 90,
    }
}

export function tenderImages(tenders: TenderApiRecord[]) {
    const images = ['/tenderiq/expressway.png', '/tenderiq/metro-rail.png', '/tenderiq/hospital.png', '/tenderiq/grid.png']
    return tenders.map(toUiTender).sort((a, b) => b.score - a.score).slice(0, 4).map((tender, index) => ({ ...tender, image: images[index % images.length] }))
}

export function buildActivityData(tenders: TenderApiRecord[]) {
    const months = new Map<string, { month: string; tenders: number; value: number; sort: number }>()
    for (const tender of tenders) {
        const date = parseTenderDate(tender.publishedDate) ?? parseTenderDate(tender.scrapedAt)
        if (!date) continue
        const key = `${date.getFullYear()}-${date.getMonth()}`
        const current = months.get(key) ?? { month: date.toLocaleString('en', { month: 'short' }), tenders: 0, value: 0, sort: date.getFullYear() * 12 + date.getMonth() }
        current.tenders += 1
        current.value += tender.lots?.length ?? 0
        months.set(key, current)
    }
    return [...months.values()].sort((a, b) => a.sort - b.sort).slice(-12).map(({ month, tenders: count, value }) => ({ month, tenders: count, value }))
}

export function buildSectorData(tenders: TenderApiRecord[]) {
    const counts = new Map<string, number>()
    for (const tender of tenders) {
        const category = tenderCategory(tender)
        counts.set(category, (counts.get(category) ?? 0) + 1)
    }
    const fills = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)']
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value], index) => ({ name, value, fill: fills[index] }))
}

export function formatLatestScrape(stats: TenderStatsResponse) {
    if (!stats.latestScrape) return 'No sync yet'
    return new Intl.DateTimeFormat('en-BD', { day: '2-digit', month: 'short' }).format(new Date(stats.latestScrape))
}
