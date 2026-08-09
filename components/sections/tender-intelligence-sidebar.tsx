import Image from 'next/image'
import { Check, Download, FileText, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function TenderIntelligenceSidebar() {
    return (
        <aside className="flex flex-col gap-4">
            <Card className="ring-primary/30">
                <CardHeader className="bg-primary text-primary-foreground"><CardTitle className="flex items-center gap-2"><Sparkles className="size-4" />AI Intelligence Panel</CardTitle><CardDescription className="text-primary-foreground/70">TenderIQ AI</CardDescription></CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                    {[['Opportunity', '78', 'High'], ['Risk', '32', 'Low'], ['Competition', '12–18', 'Moderate'], ['Eligibility', '8/10', 'Eligible']].map(([label, value, sub]) => <div key={label} className="rounded-lg bg-secondary p-3"><p className="text-[10px] font-bold uppercase text-muted-foreground">{label}</p><p className="font-mono text-xl font-extrabold text-primary">{value}</p><p className="text-[10px] text-muted-foreground">{sub}</p></div>)}
                </CardContent>
                <CardContent><div className="rounded-xl bg-success/10 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-success">Bid recommendation</p><div className="mt-1 flex items-end justify-between"><strong className="text-3xl text-success">BID</strong><span className="font-mono text-xl font-bold text-success">14–18%</span></div><p className="mt-2 text-xs text-muted-foreground">Strong eligibility and favorable market conditions.</p></div></CardContent>
            </Card>
            <Card><CardHeader><CardTitle>Quick Facts</CardTitle></CardHeader><CardContent className="flex flex-col gap-2">{[['Tender status', 'Open for Bidding'], ['Procurement type', 'Public Works'], ['Contract duration', '36 months'], ['Last modified', 'Mar 01, 2025'], ['BOQ items', '847']].map(([label, value], index) => <div key={label}>{index ? <Separator className="mb-2" /> : null}<div className="flex justify-between gap-3 text-xs"><span className="text-muted-foreground">{label}</span><strong className="text-right">{value}</strong></div></div>)}</CardContent></Card>
            <Card><CardHeader><CardTitle>Documents</CardTitle></CardHeader><CardContent className="flex flex-col gap-1">{['Main Tender Document.pdf', 'Technical Specification.pdf', 'BOQ Schedule.xlsx'].map((document) => <Button key={document} variant="ghost" className="justify-start" title={document}><FileText data-icon="inline-start" /><span className="truncate">{document}</span><Download data-icon="inline-end" /></Button>)}</CardContent></Card>
            <Card><CardHeader><CardTitle>Procurement Officer</CardTitle></CardHeader><CardContent className="flex items-center gap-3"><Image src="/tenderiq/anita-patel.png" width={44} height={44} alt="Anita K. Patel" className="size-11 rounded-full object-cover" /><div><strong className="text-sm">Anita K. Patel</strong><p className="text-xs text-muted-foreground">Senior Procurement Officer</p><Badge variant="secondary" className="mt-1"><Check data-icon="inline-start" />Verified</Badge></div></CardContent></Card>
        </aside>
    )
}
