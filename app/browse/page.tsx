import { BrowsePageSections } from "@/components/sections/browse-page-sections";
import { loadTenders } from "@/lib/api/tenders";
import { toUiTender } from "@/lib/tenders/transform";

export const dynamic = "force-dynamic";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const tenderState = await loadTenders({ limit: 500, search: q || undefined });
  return (
    <BrowsePageSections
      initialQuery={q}
      initialTenders={tenderState.data.data.map(toUiTender)}
      total={tenderState.data.total}
      apiError={tenderState.error}
    />
  );
}
