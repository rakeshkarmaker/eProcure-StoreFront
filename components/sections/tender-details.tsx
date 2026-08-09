'use client'

import { Check, Download, Sparkles } from 'lucide-react'
import { DocumentItem } from '@/components/common/document-item'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const deliverables = ['Construction of 24.6 km four-lane divided carriageway bypass highway', '2 major bridges over the Khadakwasla Dam canal system', '3 railway over bridges at existing level crossings', 'Complete storm and roadside drainage network', 'Traffic signage and safety installations per IRC standards', 'Solar-powered street lighting along full bypass length', '2-year post-completion maintenance warranty']
const eligibility = ['Annual turnover ≥ ₹25 Cr', '5+ similar highway projects', 'Positive net worth', 'PF / ESI compliance', 'Valid GST registration', 'ISO 9001:2015 certification', 'Bid capacity ≥ ₹1.2 Cr', 'Bank solvency certificate', 'NHAI / State empanelment', 'Valid digital signature']
const documents = [
    ['Tender Notice (NIT).pdf', 'pdf', 'Version 1.2 · Jan 15, 2025', '2.4 MB'], ['Bill of Quantities (BOQ).xlsx', 'xlsx', 'Version 2.0 · Feb 01, 2025', '1.8 MB'],
    ['Technical Specifications.pdf', 'pdf', 'Version 1.0 · Jan 15, 2025', '8.6 MB'], ['Contract Agreement Draft.docx', 'docx', 'Version 1.0 · Jan 15, 2025', '890 KB'],
] as const

export function TenderDetails() {
    return (
        <div className="min-w-0">
            <Alert className="mb-5"><Sparkles /><AlertTitle>AI Recommendation</AlertTitle><AlertDescription>Strong opportunity with an estimated 12–18% profit margin. Your eligibility score is 8/10 criteria met.</AlertDescription></Alert>
            <Tabs defaultValue="overview">
                <TabsList className="mb-5 h-auto w-full justify-start overflow-x-auto"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="eligibility">Eligibility</TabsTrigger><TabsTrigger value="timeline">Timeline</TabsTrigger><TabsTrigger value="documents">Documents</TabsTrigger><TabsTrigger value="technical">Technical Specs</TabsTrigger><TabsTrigger value="financial">Financial</TabsTrigger><TabsTrigger value="evaluation">Evaluation</TabsTrigger><TabsTrigger value="faqs">FAQs</TabsTrigger></TabsList>
                <TabsContent value="overview" className="flex flex-col gap-4">
                    <Card><CardHeader><CardTitle>Scope of Work</CardTitle><CardDescription>Project summary and contractor responsibilities</CardDescription></CardHeader><CardContent className="flex flex-col gap-3 leading-relaxed text-muted-foreground"><p>Construction of 24.6 km four-lane divided carriageway bypass on NH-65 around the Pune Eastern Corridor, designed to relieve congestion through the Hadapsar and Manjari urban areas.</p><p>Contractor is responsible for detailed design, material procurement, construction, testing, as-built documentation, and handover within 36 months.</p></CardContent></Card>
                    <Card><CardHeader><CardTitle>Key Deliverables</CardTitle></CardHeader><CardContent><ul className="flex flex-col gap-3">{deliverables.map((item) => <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground"><span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-primary"><Check className="size-3" /></span>{item}</li>)}</ul></CardContent></Card>
                </TabsContent>
                <TabsContent value="eligibility"><Card><CardHeader><CardTitle>Eligibility Requirements</CardTitle><CardDescription>Interactive checklist to track bid readiness</CardDescription></CardHeader><CardContent><div className="mb-5"><div className="mb-2 flex justify-between text-sm"><span className="text-muted-foreground">Your progress</span><strong>8 / 10 criteria met</strong></div><Progress value={80} /></div><FieldGroup>{eligibility.map((item, index) => <Field key={item} orientation="horizontal"><Checkbox id={`criterion-${index}`} defaultChecked={index !== 8 && index !== 6} /><FieldLabel htmlFor={`criterion-${index}`} className="font-normal">{item}</FieldLabel></Field>)}</FieldGroup></CardContent></Card></TabsContent>
                <TabsContent value="timeline"><Card><CardHeader><CardTitle>Procurement Timeline</CardTitle></CardHeader><CardContent className="flex flex-col gap-0">{[['Aug 15, 2024', 'Tender published'], ['Sep 01, 2024', 'Pre-bid meeting'], ['Sep 10, 2024', 'Clarifications issued'], ['Mar 28, 2025', 'Bid submission deadline'], ['Apr 02, 2025', 'Bid opening'], ['May 15, 2025', 'Contract award (estimated)']].map(([date, label], index) => <div key={label} className="flex gap-4"><div className="flex flex-col items-center"><span className="size-3 rounded-full bg-primary" />{index < 5 ? <span className="h-12 w-px bg-border" /> : null}</div><div><p className="font-semibold">{label}</p><p className="font-mono text-xs text-muted-foreground">{date}</p></div></div>)}</CardContent></Card></TabsContent>
                <TabsContent value="documents"><Card><CardHeader><CardTitle>Tender Documents</CardTitle><CardDescription>6 files · Total 37.9 MB</CardDescription><Button size="sm"><Download data-icon="inline-start" />Download all</Button></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2">{documents.map(([name, type, meta, size]) => <DocumentItem key={name} name={name} type={type} meta={meta} size={size} />)}</CardContent></Card></TabsContent>
                <TabsContent value="technical"><Card><CardHeader><CardTitle>Technical Specifications</CardTitle></CardHeader><CardContent className="leading-relaxed text-muted-foreground">Requirements include MoRTH 2013 road standards, IRC bridge specifications, CPWD structural guidelines, and BIS material standards. Concrete must meet M40 grade for bridges and M30 for road works.</CardContent></Card></TabsContent>
                <TabsContent value="financial"><div className="grid gap-4 sm:grid-cols-2">{[['Contract value', '₹84.5 Cr'], ['EMD required', '₹1.69 Cr'], ['Security deposit', '5%'], ['Min. annual turnover', '₹25 Cr']].map(([label, value]) => <Card key={label}><CardHeader><CardDescription>{label}</CardDescription><CardTitle className="font-mono text-3xl text-primary">{value}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Applicable tender financial requirement</CardContent></Card>)}</div></TabsContent>
                <TabsContent value="evaluation"><Card><CardHeader><CardTitle>Evaluation Criteria</CardTitle></CardHeader><CardContent className="leading-relaxed text-muted-foreground">L1 lowest-bidder methodology. Technical pre-qualification occurs first; financial bids open only for qualified bidders. Bid validity is 180 days.</CardContent></Card></TabsContent>
                <TabsContent value="faqs"><Card><CardHeader><CardTitle>Frequently Asked Questions</CardTitle></CardHeader><CardContent><Accordion type="single" collapsible><AccordionItem value="jv"><AccordionTrigger>Can a Joint Venture apply?</AccordionTrigger><AccordionContent>Yes. Lead partner must meet 60% of eligibility criteria; all partners combined must meet 100%.</AccordionContent></AccordionItem><AccordionItem value="emd"><AccordionTrigger>What is the EMD exemption policy?</AccordionTrigger><AccordionContent>Eligible MSMEs and DPIIT-recognised startups are exempt.</AccordionContent></AccordionItem><AccordionItem value="visit"><AccordionTrigger>Is a site visit mandatory?</AccordionTrigger><AccordionContent>Recommended, but not mandatory. Virtual walkthrough is available.</AccordionContent></AccordionItem></Accordion></CardContent></Card></TabsContent>
            </Tabs>
        </div>
    )
}
