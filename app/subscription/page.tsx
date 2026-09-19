'use client'

import Link from 'next/link'
import { ArrowRight, Check, CircleHelp, ScanSearch, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type BillingCycle = 'monthly' | 'annual'

type Plan = {
    name: string
    description: string
    monthly: string
    annual: string
    note: string
    cta: string
    featured?: boolean
    icon: typeof ScanSearch
    features: string[]
}

const plans: Plan[] = [
    {
        name: 'Observer',
        description: 'A clear starting point for exploring live procurement signals.',
        monthly: '৳0',
        annual: '৳0',
        note: 'Always free',
        cta: 'Start exploring',
        icon: ScanSearch,
        features: ['Browse live tender notices', 'Save up to 10 opportunities', 'Weekly market digest', 'Essential tender details'],
    },
    {
        name: 'Analyst',
        description: 'The practical workspace for teams who bid every month.',
        monthly: '৳4,900',
        annual: '৳3,920',
        note: 'per month, billed annually',
        cta: 'Choose Analyst',
        featured: true,
        icon: Sparkles,
        features: ['Unlimited saved opportunities', 'Daily tender alerts', 'Match scores and watchlists', 'Tender intelligence summaries', 'Export-ready opportunity lists'],
    },
    {
        name: 'Command',
        description: 'A shared intelligence layer for serious procurement teams.',
        monthly: '৳14,900',
        annual: '৳11,920',
        note: 'per month, billed annually',
        cta: 'Talk to our team',
        icon: ShieldCheck,
        features: ['Everything in Analyst', 'Up to 10 team members', 'Shared workflows and notes', 'Priority data refresh', 'Dedicated onboarding'],
    },
]

const comparisonRows = [
    ['Live tender discovery', 'Included', 'Included', 'Included'],
    ['Saved opportunities', '10', 'Unlimited', 'Unlimited'],
    ['Intelligence summaries', '—', 'Included', 'Included'],
    ['Team collaboration', '—', '—', 'Up to 10 seats'],
]

export default function SubscriptionPage() {
    const [billing, setBilling] = useState<BillingCycle>('annual')

    return (
        <div className="flex flex-1 flex-col">
            <section className="relative overflow-hidden border-b bg-secondary/45 px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32">
                <div className="pointer-events-none absolute -right-24 top-20 size-72 rounded-full bg-mint/20 blur-3xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -left-32 bottom-0 size-80 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
                <div className="relative mx-auto max-w-content text-center">
                    <Badge variant="secondary" className="mb-4 gap-1.5 border-mint/30 bg-mint/15 text-mint-foreground">
                        <Zap className="size-3.5" aria-hidden="true" />
                        Procurement intelligence, on your terms
                    </Badge>
                    <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                        Turn tender noise into a <span className="text-primary">decisive shortlist.</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                        Choose the workspace that matches how your team discovers, evaluates, and follows Bangladesh procurement opportunities.
                    </p>
                    <div className="mt-7 flex justify-center">
                        <Tabs value={billing} onValueChange={(value) => setBilling(value as BillingCycle)}>
                            <TabsList aria-label="Billing cycle" className="h-11 rounded-full bg-card p-1 shadow-sm ring-1 ring-foreground/10">
                                <TabsTrigger value="monthly" className="h-9 rounded-full px-4">Monthly</TabsTrigger>
                                <TabsTrigger value="annual" className="h-9 rounded-full px-4 data-active:bg-primary data-active:text-primary-foreground">
                                    Annual <span className="ml-1 text-[11px] text-mint-foreground">Save 20%</span>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
            </section>

            <section className="px-4 py-10 sm:px-6 sm:py-14">
                <div className="mx-auto max-w-content">
                    <div className="grid gap-4 lg:grid-cols-3">
                        {plans.map((plan) => {
                            const Icon = plan.icon
                            const price = billing === 'annual' ? plan.annual : plan.monthly
                            return (
                                <Card key={plan.name} className={plan.featured ? 'relative overflow-visible border-primary bg-primary/[0.03] shadow-card-hover ring-2 ring-primary/30' : 'relative'}>
                                    {plan.featured ? (
                                        <Badge className="absolute -top-3 left-5 gap-1 bg-mint text-mint-foreground">
                                            <Sparkles className="size-3" aria-hidden="true" /> Most popular
                                        </Badge>
                                    ) : null}
                                    <CardHeader className="gap-4">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className={plan.featured ? 'flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground' : 'flex size-11 items-center justify-center rounded-xl bg-secondary text-primary'}>
                                                <Icon className="size-5" aria-hidden="true" />
                                            </span>
                                            {plan.name === 'Command' ? <Badge variant="outline">Teams</Badge> : null}
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">{plan.name}</CardTitle>
                                            <CardDescription className="mt-2 min-h-12 leading-6">{plan.description}</CardDescription>
                                        </div>
                                        <div>
                                            <div className="flex items-end gap-2">
                                                <span className="text-3xl font-bold tracking-tight">{price}</span>
                                                {plan.name !== 'Observer' ? <span className="pb-1 text-sm text-muted-foreground">/ month</span> : null}
                                            </div>
                                            <p className="mt-1 text-xs text-muted-foreground">{billing === 'annual' && plan.name !== 'Observer' ? plan.note : plan.name === 'Observer' ? plan.note : 'billed monthly'}</p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Separator className="mb-5" />
                                        <ul className="space-y-3 text-sm">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex items-start gap-2.5">
                                                    <Check className="mt-0.5 size-4 shrink-0 text-mint-foreground" aria-hidden="true" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="h-11 w-full" variant={plan.featured ? 'default' : 'outline'} asChild>
                                            <Link href={plan.name === 'Command' ? '/browse' : '/browse'}>
                                                {plan.cta}
                                                <ArrowRight data-icon="inline-end" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="border-y bg-card px-4 py-10 sm:px-6 sm:py-14">
                <div className="mx-auto max-w-content">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Compare access</p>
                            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">A plan for every procurement rhythm.</h2>
                        </div>
                        <p className="max-w-md text-sm leading-6 text-muted-foreground">Start free, then upgrade when your watchlist needs more signal, more speed, or more people.</p>
                    </div>
                    <div className="mt-8 overflow-x-auto rounded-xl ring-1 ring-foreground/10">
                        <table className="w-full min-w-[42rem] text-left text-sm">
                            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-semibold">Capability</th>
                                    <th className="px-4 py-3 font-semibold">Observer</th>
                                    <th className="px-4 py-3 font-semibold text-primary">Analyst</th>
                                    <th className="px-4 py-3 font-semibold">Command</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonRows.map(([label, observer, analyst, command]) => (
                                    <tr key={label} className="border-t">
                                        <th className="px-4 py-4 font-medium">{label}</th>
                                        <td className="px-4 py-4 text-muted-foreground">{observer}</td>
                                        <td className="px-4 py-4 font-medium text-primary">{analyst}</td>
                                        <td className="px-4 py-4 text-muted-foreground">{command}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section className="px-4 py-10 sm:px-6 sm:py-14">
                <div className="mx-auto grid max-w-content gap-4 md:grid-cols-2">
                    <Card className="bg-primary text-primary-foreground ring-0">
                        <CardContent className="flex h-full flex-col justify-between gap-8 p-6 sm:p-8">
                            <div>
                                <Badge className="border-white/20 bg-white/15 text-white">Built for focus</Badge>
                                <h2 className="mt-4 max-w-md text-2xl font-bold tracking-tight">Spend less time searching. Spend more time deciding.</h2>
                            </div>
                            <Link href="/browse" className="inline-flex items-center gap-2 text-sm font-semibold text-mint transition-colors hover:text-white">
                                Explore the live index <ArrowRight className="size-4" />
                            </Link>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex h-full flex-col justify-between gap-8 p-6 sm:p-8">
                            <div>
                                <CircleHelp className="size-6 text-primary" aria-hidden="true" />
                                <h2 className="mt-4 text-2xl font-bold tracking-tight">Need a tailored rollout?</h2>
                                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">Talk through seats, data refreshes, and a workspace that fits your team’s bid calendar.</p>
                            </div>
                            <Button variant="outline" className="w-fit" asChild><Link href="/browse">Contact the team <ArrowRight data-icon="inline-end" /></Link></Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}
