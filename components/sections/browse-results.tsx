import { Clock3, ListFilter, SearchX, Sparkles } from 'lucide-react'
import type { Tender } from '@/lib/tender-data'
import type { BrowseSort } from '@/components/sections/browse-page-sections'
import type { BrowseFilterProps } from '@/components/sections/browse-filters'
import { TenderResultCard } from '@/components/common/tender-result-card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { BrowseFilters } from '@/components/sections/browse-filters'

export function BrowseResults({ results, filters, sort, onSortChange, onReset }: { results: Tender[]; filters: Omit<BrowseFilterProps, 'idPrefix'>; sort: BrowseSort; onSortChange: (value: BrowseSort) => void; onReset: () => void }) {
    return (
        <section className="min-w-0 flex-1 px-4 py-6 sm:px-6">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Active Tenders <span className="font-normal text-muted-foreground">{results.length} shown</span></h1>
                    <div className="mt-2 flex flex-wrap items-center gap-2"><span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock3 className="size-3.5" />Updated 2m ago</span><Badge variant="secondary"><Sparkles data-icon="inline-start" />AI Matching Active</Badge></div>
                </div>
                <div className="flex items-center gap-2">
                    <Sheet>
                        <SheetTrigger asChild><Button variant="outline" className="lg:hidden"><ListFilter data-icon="inline-start" />Filters</Button></SheetTrigger>
                        <SheetContent side="left"><SheetHeader><SheetTitle>Search filters</SheetTitle><SheetDescription>Refine tender results</SheetDescription></SheetHeader><div className="px-4"><BrowseFilters {...filters} idPrefix="mobile" /><Button variant="secondary" className="mt-6 w-full" onClick={onReset}>Reset all filters</Button></div></SheetContent>
                    </Sheet>
                    <Select value={sort} onValueChange={(value) => onSortChange(value as BrowseSort)}><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="relevance">Relevance</SelectItem><SelectItem value="deadline">Deadline</SelectItem><SelectItem value="budget">Budget</SelectItem><SelectItem value="recent">Recently added</SelectItem></SelectGroup></SelectContent></Select>
                </div>
            </div>
            {results.length ? <div className="flex flex-col gap-3">{results.map((tender) => <TenderResultCard key={tender.id} tender={tender} />)}</div> : <Alert><SearchX /><AlertTitle>No matching tenders</AlertTitle><AlertDescription className="flex flex-col items-start gap-3">Try a broader search or clear filters.<Button variant="outline" size="sm" onClick={onReset}>Clear filters</Button></AlertDescription></Alert>}
            <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-sm text-muted-foreground">Showing <strong className="text-foreground">{results.length ? `1—${results.length}` : '0'}</strong> of 1,248 indexed tenders</p>
                <Pagination className="mx-0 w-auto"><PaginationContent><PaginationItem><PaginationPrevious href="#" /></PaginationItem><PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem><PaginationItem><PaginationEllipsis /></PaginationItem><PaginationItem><PaginationNext href="#" /></PaginationItem></PaginationContent></Pagination>
            </div>
        </section>
    )
}
