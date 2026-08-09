import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

type SectionHeadingProps = {
    eyebrow?: string
    title: string
    description?: string
    actionHref?: string
    actionLabel?: string
}

export function SectionHeading({ eyebrow, title, description, actionHref, actionLabel = 'View all' }: SectionHeadingProps) {
    return (
        <div className="mb-8 flex items-end justify-between gap-6">
            <div>
                {eyebrow ? <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p> : null}
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
                {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
            </div>
            {actionHref ? (
                <Button variant="ghost" size="sm" asChild>
                    <Link href={actionHref}>{actionLabel}<ArrowRight data-icon="inline-end" /></Link>
                </Button>
            ) : null}
        </div>
    )
}
