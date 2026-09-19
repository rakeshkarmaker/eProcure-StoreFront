import { ApiAlert } from "@/components/common/api-alert";
import { HomeHero } from "@/components/sections/home-hero";
import { HomeStats } from "@/components/sections/home-stats";
import { RegionExplorer } from "@/components/sections/region-explorer";
import { TopCategories } from "@/components/sections/top-categories";
import { TrendingTenders } from "@/components/sections/trending-tenders";
import { TrustedNetwork } from "@/components/sections/trusted-network";
import type { TenderApiRecord, TenderStatsResponse } from "@/lib/tenders/types";

export function HomePageSections({
  tenders,
  stats,
  apiError,
}: {
  tenders: TenderApiRecord[];
  stats: TenderStatsResponse;
  apiError: string | null;
}) {
  return (
    <>
      <HomeHero />
      {apiError ? (
        <div className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6">
          <ApiAlert message={apiError} retryHref="/" />
        </div>
      ) : null}
      <HomeStats stats={stats} />
      <TopCategories tenders={tenders} />
      <RegionExplorer tenders={tenders} />
      <TrendingTenders tenders={tenders} />
      <TrustedNetwork />
    </>
  );
}
