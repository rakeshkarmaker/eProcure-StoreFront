import { Hexagon } from 'lucide-react'

export function BrandMark() {
    return (
        <span className="flex items-center gap-2 font-bold tracking-tight">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Hexagon className="size-3.5" fill="currentColor" aria-hidden="true" />
            </span>
            TenderIQ
        </span>
    )
}
