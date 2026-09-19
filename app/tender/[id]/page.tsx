import { TenderPageSections } from '@/components/sections/tender-page-sections'
import { TenderUnavailable } from '@/components/sections/tender-unavailable'
import { getTender, loadTenders, TenderApiError } from '@/lib/api/tenders'
import { notFound } from 'next/navigation'
import type { TenderApiRecord } from '@/lib/tenders/types'

export const dynamic = 'force-dynamic'

export default async function TenderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    let tender: TenderApiRecord | null = null
    let errorMessage: string | null = null

    try {
        tender = await getTender(id)
    } catch (error) {
        if (error instanceof TenderApiError && error.status === 404) notFound()
        errorMessage = error instanceof Error ? error.message : 'Tender service is unavailable.'
    }

    if (!tender) return <TenderUnavailable message={errorMessage ?? 'Tender service is unavailable.'} />

    const similarState = await loadTenders({ limit: 6, nature: tender.procurementNature ?? undefined })
    const similar = similarState.data.data.filter((item) => item.id !== tender.id).slice(0, 3)
    return <TenderPageSections tender={tender} similar={similar} />
}
