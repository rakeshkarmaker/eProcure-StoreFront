import type { LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function StatTile({ label, value, detail, change, icon: Icon }: { label: string; value: string; detail: string; change?: string; icon?: LucideIcon }) {
    return (
        <Card className="relative overflow-hidden">
            <CardHeader>
                <CardDescription className="flex items-center justify-between gap-3 font-bold uppercase tracking-wider">
                    {label}
                    {Icon ? <Icon className="size-4 text-primary" aria-hidden="true" /> : null}
                </CardDescription>
                <CardTitle className="font-mono text-3xl text-primary">{value}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <span>{detail}</span>
                {change ? <Badge variant="secondary">{change}</Badge> : null}
            </CardContent>
        </Card>
    )
}
