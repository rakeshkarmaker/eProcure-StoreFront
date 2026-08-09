import { BrowsePageSections } from '@/components/sections/browse-page-sections'

export default async function BrowsePage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q = '' } = await searchParams
    return <BrowsePageSections initialQuery={q} />
}
