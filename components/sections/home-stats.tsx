import { Separator } from '@/components/ui/separator'

const stats = [
    { value: '৳4.2B+', label: 'Active Procurement' },
    { value: '1,248', label: 'New Tenders' },
    { value: '98.2%', label: 'Accuracy Rate' },
]

export function HomeStats() {
    return (
        <section className="border-y bg-card">
            <div className="mx-auto grid max-w-4xl grid-cols-3 px-4 py-10">
                {stats.map((stat, index) => (
                    <div key={stat.label} className="relative px-2 text-center sm:px-8">
                        <p className="font-mono text-3xl font-bold tracking-tight sm:text-5xl">{stat.value}</p>
                        <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:text-xs">{stat.label}</p>
                        {index < stats.length - 1 ? <Separator orientation="vertical" className="absolute right-0 top-0" /> : null}
                    </div>
                ))}
            </div>
            <div className="overflow-hidden border-t bg-muted/30 py-2">
                <p className="animate-marquee whitespace-nowrap text-xs font-medium text-muted-foreground">TenderIQ · Bangladesh Procurement Intelligence · 1,248 Active Tenders · 50,000+ Vendors · AI-Powered Matching · TenderIQ · Bangladesh Procurement Intelligence · 1,248 Active Tenders · 50,000+ Vendors · AI-Powered Matching</p>
            </div>
        </section>
    )
}
