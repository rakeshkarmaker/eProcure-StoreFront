import { Activity, CircleGauge, ClockAlert, TrendingUp } from 'lucide-react'
import { StatTile } from '@/components/common/stat-tile'

export function IntelligenceKpis() {
    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="Total Active Value" value="৳4.2B+" detail="Across 1,248 tenders" change="+12.4%" icon={TrendingUp} />
            <StatTile label="New This Month" value="248" detail="vs 210 last month" change="+18.2%" icon={Activity} />
            <StatTile label="Your Avg Match" value="71.4" detail="Profile strength improving" change="+5.1pt" icon={CircleGauge} />
            <StatTile label="Expiring in 7 Days" value="3" detail="High-match tenders" change="Urgent" icon={ClockAlert} />
        </section>
    )
}
