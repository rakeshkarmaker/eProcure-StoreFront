import Link from 'next/link'
import { ServerCrash } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

export function ApiAlert({ message, retryHref }: { message: string; retryHref: string }) {
    return (
        <Alert variant="destructive">
            <ServerCrash />
            <AlertTitle>Live tender data is unavailable</AlertTitle>
            <AlertDescription className="flex flex-col items-start gap-3">
                {message}
                <Button variant="outline" size="sm" asChild><Link href={retryHref}>Try again</Link></Button>
            </AlertDescription>
        </Alert>
    )
}
