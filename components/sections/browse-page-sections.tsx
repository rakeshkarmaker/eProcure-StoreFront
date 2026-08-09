'use client'

import { useMemo, useState } from 'react'
import { tenders } from '@/lib/tender-data'
import { BrowseFilters } from '@/components/sections/browse-filters'
import { BrowseResults } from '@/components/sections/browse-results'
import { Button } from '@/components/ui/button'

export type BrowseSort = 'relevance' | 'deadline' | 'budget' | 'recent'

function budgetMillions(value: string) {
    const amount = Number.parseFloat(value.replace(/[^0-9.]/g, ''))
    return value.includes('B') ? amount * 1000 : amount
}

function matchesBudget(value: string, bands: string[]) {
    if (!bands.length) return true
    const amount = budgetMillions(value)
    return bands.some((band) => {
        if (band === 'under-1') return amount < 1
        if (band === '1-50') return amount >= 1 && amount < 50
        if (band === '50-500') return amount >= 50 && amount < 500
        return amount >= 500
    })
}

export function BrowsePageSections({ initialQuery = '' }: { initialQuery?: string }) {
    const [sector, setSector] = useState('All Sectors')
    const [query, setQuery] = useState(initialQuery)
    const [budgets, setBudgets] = useState<string[]>([])
    const [deadline, setDeadline] = useState('any')
    const [authorities, setAuthorities] = useState<string[]>([])
    const [sort, setSort] = useState<BrowseSort>('relevance')

    const results = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()
        const filtered = tenders.filter((tender) => {
            const matchesQuery = !normalizedQuery || [tender.title, tender.id, tender.category, tender.authority, tender.location].some((value) => value.toLowerCase().includes(normalizedQuery))
            const matchesSector = sector === 'All Sectors' || tender.category.toLowerCase().includes(sector.toLowerCase())
            const matchesDeadline = deadline === 'any' || tender.days <= Number(deadline)
            const matchesAuthority = !authorities.length || authorities.includes(tender.authority)
            return matchesQuery && matchesSector && matchesDeadline && matchesAuthority && matchesBudget(tender.budget, budgets)
        })

        return [...filtered].sort((a, b) => {
            if (sort === 'deadline') return a.days - b.days
            if (sort === 'budget') return budgetMillions(b.budget) - budgetMillions(a.budget)
            if (sort === 'recent') return b.id.localeCompare(a.id)
            return b.score - a.score
        })
    }, [authorities, budgets, deadline, query, sector, sort])

    const toggleValue = (value: string, values: string[], setValues: (next: string[]) => void) => {
        setValues(values.includes(value) ? values.filter((item) => item !== value) : [...values, value])
    }

    const resetFilters = () => {
        setSector('All Sectors')
        setQuery('')
        setBudgets([])
        setDeadline('any')
        setAuthorities([])
        setSort('relevance')
    }

    const filterProps = {
        sector,
        onSectorChange: setSector,
        query,
        onQueryChange: setQuery,
        budgets,
        onBudgetToggle: (value: string) => toggleValue(value, budgets, setBudgets),
        deadline,
        onDeadlineChange: setDeadline,
        authorities,
        onAuthorityToggle: (value: string) => toggleValue(value, authorities, setAuthorities),
    }

    return (
        <div className="mx-auto flex w-full max-w-[1440px] flex-1 items-stretch">
            <aside className="hidden w-64 shrink-0 border-r bg-card p-5 lg:block"><BrowseFilters {...filterProps} /><Button variant="secondary" className="mt-6 w-full" onClick={resetFilters}>Reset all filters</Button></aside>
            <BrowseResults results={results} filters={filterProps} sort={sort} onSortChange={setSort} onReset={resetFilters} />
        </div>
    )
}
