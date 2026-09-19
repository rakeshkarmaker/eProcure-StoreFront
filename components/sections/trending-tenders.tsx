import { tenderImages } from "@/lib/tenders/transform";
import type { TenderApiRecord } from "@/lib/tenders/types";
import { SectionHeading } from "@/components/common/section-heading";
import { TrendingTenderCard } from "@/components/common/trending-tender-card";

export function TrendingTenders({ tenders }: { tenders: TenderApiRecord[] }) {
  const trendingTenders = tenderImages(tenders).sort(
    (a, b) => b.score - a.score,
  );
  return (
    <section className="border-y bg-card px-4 py-12 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="AI-matched for you"
          title="Trending Tenders"
          description="Highest-matching opportunities based on your profile"
          actionHref="/browse"
        />
        {trendingTenders.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trendingTenders.map((tender) => (
              <TrendingTenderCard key={tender.id} tender={tender} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
