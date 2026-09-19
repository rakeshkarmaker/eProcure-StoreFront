import { Check, FileText, Sparkles } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatBdt, formatTenderDate, tenderScore } from '@/lib/tenders/transform'
import type { TenderApiRecord } from '@/lib/tenders/types'

function DetailRows({ rows }: { rows: Array<[string, string | null | undefined]> }) {
    return <dl className="grid gap-4 sm:grid-cols-2">{rows.map(([label, value]) => <div key={label} className="rounded-lg border bg-muted/20 p-4"><dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt><dd className="mt-1.5 text-sm font-medium">{value || 'Not specified'}</dd></div>)}</dl>
}

export function TenderDetails({ tender }: { tender: TenderApiRecord }) {
    const timeline = [
        ['Published', tender.publishedDate],
        ['Pre-tender meeting starts', tender.preMeetingStartDate],
        ['Pre-tender meeting ends', tender.preMeetingEndDate],
        ['Document sales close', tender.docLastSellingDate],
        ['Tender closes', tender.closingDate],
        ['Tender opens', tender.openingDate],
    ].filter((entry): entry is [string, string] => Boolean(entry[1]))

    return (
        <div className="min-w-0">
            <Alert className="mb-5"><Sparkles /><AlertTitle>{tenderScore(tender)}% record completeness</AlertTitle><AlertDescription>This score reflects how much eligibility, funding, contact, lot, method, and deadline data is available. It is not a prediction of award success.</AlertDescription></Alert>
            <Tabs defaultValue="overview">
                <TabsList className="mb-6 h-auto w-full justify-start overflow-x-auto"><TabsTrigger value="overview" className="min-h-11">Overview</TabsTrigger><TabsTrigger value="eligibility" className="min-h-11">Eligibility</TabsTrigger><TabsTrigger value="timeline" className="min-h-11">Timeline</TabsTrigger><TabsTrigger value="documents" className="min-h-11">Documents</TabsTrigger><TabsTrigger value="lots" className="min-h-11">Lots</TabsTrigger><TabsTrigger value="financial" className="min-h-11">Financial</TabsTrigger><TabsTrigger value="evaluation" className="min-h-11">Evaluation</TabsTrigger><TabsTrigger value="amendments" className="min-h-11">Amendments</TabsTrigger></TabsList>
                <TabsContent value="overview" className="flex flex-col gap-4">
                    <Card><CardHeader><CardTitle>Scope of Procurement</CardTitle><CardDescription>{tender.packageNoDesc || tender.invitationFor || 'Tender summary'}</CardDescription></CardHeader><CardContent className="leading-relaxed text-muted-foreground">{tender.briefDescription || tender.title}</CardContent></Card>
                    <Card><CardHeader><CardTitle>Procuring Entity</CardTitle></CardHeader><CardContent><DetailRows rows={[["Ministry", tender.ministry], ["Division", tender.division], ["Organization", tender.organization], ["Entity", tender.procuringEntity], ["District", tender.procuringEntityDistrict], ["Entity code", tender.procuringEntityCode]]} /></CardContent></Card>
                </TabsContent>
                <TabsContent value="eligibility"><Card><CardHeader><CardTitle>Eligibility Requirements</CardTitle><CardDescription>Published bidder qualification criteria</CardDescription></CardHeader><CardContent className="whitespace-pre-line leading-relaxed text-muted-foreground">{tender.eligibility || 'No eligibility text was included in the scraped tender record. Consult the official e-GP notice before preparing a bid.'}</CardContent></Card></TabsContent>
                <TabsContent value="timeline"><Card><CardHeader><CardTitle>Procurement Timeline</CardTitle></CardHeader><CardContent className="flex flex-col gap-0">{timeline.length ? timeline.map(([label, date], index) => <div key={label} className="flex gap-4"><div className="flex flex-col items-center"><span className="size-3 rounded-full bg-primary" />{index < timeline.length - 1 ? <span className="h-12 w-px bg-border" /> : null}</div><div><p className="font-semibold">{label}</p><p className="font-mono text-xs text-muted-foreground">{formatTenderDate(date)}</p></div></div>) : <p className="text-sm text-muted-foreground">No timeline dates were published.</p>}</CardContent></Card></TabsContent>
                <TabsContent value="documents"><Card><CardHeader><CardTitle>Document Access</CardTitle><CardDescription>Document metadata from the official notice</CardDescription></CardHeader><CardContent><DetailRows rows={[["Available from", tender.docAvailable], ["Document fees", tender.docFees], ["Price", formatBdt(tender.docPriceInBDT)], ["Payment mode", tender.modeOfPayment]]} /><Alert className="mt-4"><FileText /><AlertTitle>Official documents</AlertTitle><AlertDescription>Download tender documents and verify revisions directly on the Bangladesh e-GP portal.</AlertDescription></Alert></CardContent></Card></TabsContent>
                <TabsContent value="lots"><Card><CardHeader><CardTitle>Lot Information</CardTitle><CardDescription>{tender.lots?.length ? `${tender.lots.length} published lot${tender.lots.length === 1 ? '' : 's'}` : 'No structured lots published'}</CardDescription></CardHeader><CardContent className="flex flex-col gap-3">{tender.lots?.length ? tender.lots.map((lot) => <div key={`${lot.lotNo}-${lot.identification}`} className="rounded-lg border p-4"><div className="flex items-start gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-primary"><Check className="size-3.5" /></span><div><p className="font-semibold">Lot {lot.lotNo}: {lot.identification}</p><p className="mt-1 text-sm text-muted-foreground">{lot.location || 'Location not specified'}</p></div></div><DetailRows rows={[["Security", formatBdt(lot.securityAmount)], ["Tentative start", formatTenderDate(lot.tentativeStartDate)], ["Tentative completion", formatTenderDate(lot.tentativeCompletionDate)]]} /></div>) : <p className="text-sm text-muted-foreground">No lot-level information is available for this tender.</p>}</CardContent></Card></TabsContent>
                <TabsContent value="financial"><Card><CardHeader><CardTitle>Financial Information</CardTitle></CardHeader><CardContent><DetailRows rows={[["Budget type", tender.budgetType], ["Source of funds", tender.sourceOfFunds], ["Document price", formatBdt(tender.docPriceInBDT)], ["Security valid through", formatTenderDate(tender.securityValidUpTo)], ["Tender valid through", formatTenderDate(tender.tenderValidUpTo)], ["Project code", tender.projectCode]]} /></CardContent></Card></TabsContent>
                <TabsContent value="evaluation"><Card><CardHeader><CardTitle>Evaluation and Method</CardTitle></CardHeader><CardContent><DetailRows rows={[["Procurement method", tender.procurementMethod], ["Evaluation type", tender.evaluationType], ["Procurement type", tender.procurementType], ["Type / method", tender.typeMethod], ["Event type", tender.eventType], ["Procurement nature", tender.procurementNature]]} /></CardContent></Card></TabsContent>
                <TabsContent value="amendments"><Card><CardHeader><CardTitle>Amendments</CardTitle><CardDescription>Changes included with the tender record</CardDescription></CardHeader><CardContent>{tender.amendments?.length ? <Accordion type="single" collapsible>{tender.amendments.map((amendment, index) => <AccordionItem key={`${amendment.no}-${index}`} value={`amendment-${index}`}><AccordionTrigger>Amendment {amendment.no || index + 1}</AccordionTrigger><AccordionContent className="whitespace-pre-line">{amendment.text}</AccordionContent></AccordionItem>)}</Accordion> : <p className="text-sm text-muted-foreground">No amendments are attached to this record.</p>}</CardContent></Card></TabsContent>
            </Tabs>
        </div>
    )
}
