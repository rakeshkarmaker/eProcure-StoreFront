import { formatBdt, formatTenderDate } from '@/lib/tenders/transform'
import type { TenderApiRecord } from '@/lib/tenders/types'

export function TenderMetrics({ tender }: { tender: TenderApiRecord }) {
    const metrics = [
        ['Tender security', formatBdt(tender.lots?.[0]?.securityAmount), tender.lots?.length ? `First of ${tender.lots.length} lot${tender.lots.length === 1 ? '' : 's'}` : 'No lot security published'],
        ['Document price', formatBdt(tender.docPriceInBDT), tender.modeOfPayment || 'Payment method not specified'],
        ['Submission deadline', formatTenderDate(tender.closingDate), tender.lastSecuritySubmissionDate ? `Security by ${formatTenderDate(tender.lastSecuritySubmissionDate)}` : 'Closing date'],
        ['Tender type', tender.procurementType || tender.procurementNature || 'Not specified', tender.typeMethod || tender.eventType || 'Procurement classification'],
        ['Procurement method', tender.procurementMethod || 'Not specified', tender.evaluationType || 'Evaluation type not specified'],
        ['Source of funds', tender.sourceOfFunds || 'Not specified', tender.budgetType || 'Budget type not specified'],
        ['Bid opening date', formatTenderDate(tender.openingDate), tender.openingDate || 'Opening schedule not published'],
    ]
    return (
        <section className="border-b bg-secondary/25">
            <div className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
                {metrics.map(([label, value, detail]) => <div key={label} className="border-b border-r px-4 py-4 last:border-r-0 xl:border-b-0"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-1.5 font-mono text-base font-extrabold text-primary sm:text-lg">{value}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p></div>)}
            </div>
        </section>
    )
}
