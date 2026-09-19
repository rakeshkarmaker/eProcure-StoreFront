import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
    eyebrow?: string
    title: string
    description?: string
    actionHref?: string
    actionLabel?: string
    accent?: 'primary' | 'category'
}

export function SectionHeading({ eyebrow, title, description, actionHref, actionLabel = 'View all', accent = 'primary' }: SectionHeadingProps) {
    return (
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8 sm:gap-6">
            <div className={cn(accent === 'category' && 'flex items-center gap-3')}>
                {accent === 'category' ? <span className="h-7 w-1 shrink-0 rounded-full bg-category" aria-hidden="true" /> : null}
                <div>
                {eyebrow ? <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p> : null}
                <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{title}</h2>
                {description ? <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
                </div>
            </div>
            {actionHref ? (
                <Button variant="ghost" size="sm" className={cn('min-h-11 shrink-0 px-3', accent === 'category' && 'text-category hover:bg-category/10 hover:text-category')} asChild>
                    <Link href={actionHref}>{actionLabel}<ArrowRight data-icon="inline-end" /></Link>
                </Button>
            ) : null}
        </div>
    )
}
