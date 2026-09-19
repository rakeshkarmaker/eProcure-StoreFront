import { Skeleton } from '@/components/ui/skeleton'

export function PageSkeleton() {
    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6" aria-label="Loading tender data">
            <div className="space-y-3"><Skeleton className="h-8 w-64" /><Skeleton className="h-4 w-full max-w-xl" /></div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <Skeleton key={index} className="h-32 rounded-xl" />)}</div>
            <Skeleton className="h-72 rounded-xl" />
        </div>
    )
}
