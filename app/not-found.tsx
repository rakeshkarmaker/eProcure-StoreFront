import Link from 'next/link'
import { SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center px-6 py-16">
            <Card className="w-full max-w-md text-center"><CardHeader className="items-center"><span className="flex size-12 items-center justify-center rounded-xl bg-secondary text-primary"><SearchX className="size-6" /></span><CardTitle>Page not found</CardTitle><CardDescription>Requested procurement page does not exist.</CardDescription></CardHeader><CardContent className="text-sm text-muted-foreground">Browse active opportunities or return to dashboard.</CardContent><CardFooter className="justify-center gap-2"><Button variant="outline" asChild><Link href="/">Home</Link></Button><Button asChild><Link href="/browse">Browse tenders</Link></Button></CardFooter></Card>
        </div>
    )
}
