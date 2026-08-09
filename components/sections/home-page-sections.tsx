import { HomeHero } from '@/components/sections/home-hero'
import { HomeStats } from '@/components/sections/home-stats'
import { RegionExplorer } from '@/components/sections/region-explorer'
import { TopCategories } from '@/components/sections/top-categories'
import { TrendingTenders } from '@/components/sections/trending-tenders'
import { TrustedNetwork } from '@/components/sections/trusted-network'

export function HomePageSections() {
    return <><HomeHero /><HomeStats /><TopCategories /><RegionExplorer /><TrendingTenders /><TrustedNetwork /></>
}
