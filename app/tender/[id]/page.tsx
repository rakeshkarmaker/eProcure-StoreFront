import { TenderPageSections } from '@/components/sections/tender-page-sections'

export default async function TenderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return <TenderPageSections id={id} />
}
