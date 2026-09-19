import { ScanSearch } from 'lucide-react'

export function BrandMark() {
    return (
        <span className="flex items-center gap-2 font-bold tracking-tight">
            <span className="relative flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <ScanSearch className="size-4" strokeWidth={2.25} aria-hidden="true" />
                <span className="absolute bottom-1 right-1 size-1.5 rounded-full bg-mint" aria-hidden="true" />
            </span>
            TenderIQ
        </span>
    )
}
