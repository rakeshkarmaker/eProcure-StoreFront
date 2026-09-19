import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

const partners = [['partner-1.png', 'Ministry of Works'], ['partner-2.png', 'Public Works Corp'], ['partner-3.png', 'National Railway'], ['partner-4.png', 'Health Services Division'], ['partner-5.png', 'Power Grid Co.']]

export function TrustedNetwork() {
    return (
        <section className="overflow-hidden bg-gradient-to-b from-secondary/50 to-background px-4 py-14 text-center sm:px-6 sm:py-16">
            <Badge variant="secondary" className="mb-3 uppercase tracking-widest">Trusted network</Badge>
            <h2 className="text-3xl font-bold tracking-tight">Empowering <span className="text-primary">50,000+</span> Vendors</h2>
            <p className="mt-2 text-sm text-muted-foreground">Trusted by government agencies and procurement offices across Bangladesh</p>
            <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-start justify-center gap-6 sm:mt-10 sm:gap-8">
                {partners.map(([file, name]) => (
                    <div key={name} className="flex w-32 flex-col items-center gap-2">
                        <div className="flex h-12 w-full items-center justify-center rounded-xl border bg-card p-3"><Image src={`/tenderiq/${file}`} alt={name} width={108} height={32} className="h-auto max-h-8 w-auto object-contain grayscale opacity-50" /></div>
                        <span className="text-[11px] text-muted-foreground">{name}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}
