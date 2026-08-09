import {
    Activity,
    Building2,
    Cloud,
    Construction,
    Droplets,
    GraduationCap,
    HeartPulse,
    Landmark,
    Leaf,
    Plane,
    ShieldCheck,
    TrainFront,
    Zap,
    type LucideIcon,
} from 'lucide-react'

export type Tender = {
    id: string
    title: string
    category: string
    authority: string
    location: string
    budget: string
    days: number
    score: number
    featured?: boolean
}

export const categories: { name: string; count: string; icon: LucideIcon }[] = [
    { name: 'Infrastructure & Construction', count: '45,200+', icon: Construction },
    { name: 'Power & Renewable Energy', count: '18,500+', icon: Zap },
    { name: 'Water Supply & Sewerage', count: '9,800+', icon: Droplets },
    { name: 'Roads & Highways', count: '12,300+', icon: Landmark },
    { name: 'Railways & Metro', count: '7,100+', icon: TrainFront },
    { name: 'IT & Digital Transformation', count: '22,400+', icon: Cloud },
    { name: 'Healthcare & Medicine', count: '14,200+', icon: HeartPulse },
    { name: 'Green Energy & Sustainability', count: '8,900+', icon: Leaf },
    { name: 'Education & Research', count: '10,700+', icon: GraduationCap },
    { name: 'Consultancy & Advisory', count: '19,700+', icon: Activity },
    { name: 'Aviation & Airports', count: '3,400+', icon: Plane },
    { name: 'Defence & Security', count: '6,800+', icon: ShieldCheck },
]

export const regions = [
    { name: 'Dhaka', tenders: 425, value: '৳1.84B', sectors: ['Infrastructure', 'ICT'], icon: Building2 },
    { name: 'Chattogram', tenders: 312, value: '৳920M', sectors: ['Defense', 'Energy'], icon: Landmark },
    { name: 'Rajshahi', tenders: 178, value: '৳430M', sectors: ['Agriculture', 'Education'], icon: Leaf },
    { name: 'Khulna', tenders: 165, value: '৳510M', sectors: ['Water Supply', 'Energy'], icon: Droplets },
    { name: 'Sylhet', tenders: 98, value: '৳265M', sectors: ['ICT', 'Healthcare'], icon: Cloud },
    { name: 'Rangpur', tenders: 112, value: '৳310M', sectors: ['Energy', 'Roads'], icon: Zap },
    { name: 'Barishal', tenders: 87, value: '৳195M', sectors: ['Water Supply', 'Roads'], icon: Droplets },
    { name: 'Mymensingh', tenders: 94, value: '৳220M', sectors: ['Education', 'Healthcare'], icon: GraduationCap },
]

export const tenders: Tender[] = [
    { id: 'BGP-2024-INF-891', title: 'Construction of 4-Lane Highway Bypass — Pune Eastern Corridor Phase II', category: 'Infrastructure', authority: 'Roads & Highways Dept', location: 'Dhaka, BD', budget: '৳180.5M', days: 14, score: 94 },
    { id: 'BGP-2024-ICT-0042', title: 'National Cloud Infrastructure Expansion — Data Node BD-01', category: 'ICT / Cloud', authority: 'ICT Ministry', location: 'Gazipur Data Center', budget: '৳12.4M', days: 4, score: 98, featured: true },
    { id: 'BGP-2024-ENG-1102', title: 'Sylhet Grid Network Modernization — Phase II Engineering', category: 'Energy', authority: 'Power Development Board', location: 'Sylhet Region', budget: '৳92.0M', days: 28, score: 62 },
    { id: 'BGP-2024-HEA-0756', title: 'Chittagong Medical Complex — Diagnostic Wing Construction', category: 'Healthcare', authority: 'Ministry of Health', location: 'Chittagong', budget: '৳62.0M', days: 9, score: 41 },
    { id: 'BGP-2024-EDU-0312', title: 'National University Campus ICT Infrastructure Upgrade — Gazipur', category: 'Education', authority: 'UGC Bangladesh', location: 'Gazipur', budget: '৳28.5M', days: 21, score: 76 },
    { id: 'BGP-2024-DEF-0201', title: 'Naval Patrol Vessel Maintenance & Dry-Dock Services — Chittagong', category: 'Defense', authority: 'Bangladesh Navy', location: 'Chittagong Port', budget: '৳445.0M', days: 33, score: 35 },
    { id: 'BGP-2024-INF-904', title: 'Padma Bridge Rail Link — Station Platform Civil Works Package 3', category: 'Infrastructure', authority: 'Bangladesh Railway', location: 'Faridpur District', budget: '৳320.0M', days: 45, score: 88 },
    { id: 'BGP-2024-ENG-1215', title: 'Solar Micro-Grid Deployment — 50 Off-Grid Communities, Rangpur Div', category: 'Energy', authority: 'Rural Electrification Bd', location: 'Rangpur Division', budget: '৳55.0M', days: 17, score: 71 },
]

export const trendingTenders = [
    { ...tenders[0], image: '/tenderiq/expressway.png' },
    { ...tenders[6], image: '/tenderiq/metro-rail.png' },
    { ...tenders[3], image: '/tenderiq/hospital.png' },
    { ...tenders[2], image: '/tenderiq/grid.png' },
]

export const volumeData = [
    { month: 'Jan', tenders: 820, value: 2.1 }, { month: 'Feb', tenders: 940, value: 2.8 },
    { month: 'Mar', tenders: 1080, value: 3.4 }, { month: 'Apr', tenders: 970, value: 2.9 },
    { month: 'May', tenders: 1150, value: 3.8 }, { month: 'Jun', tenders: 1320, value: 4.5 },
    { month: 'Jul', tenders: 1240, value: 4.1 }, { month: 'Aug', tenders: 1410, value: 5.2 },
    { month: 'Sep', tenders: 1180, value: 3.9 }, { month: 'Oct', tenders: 1530, value: 5.8 },
    { month: 'Nov', tenders: 1390, value: 4.7 }, { month: 'Dec', tenders: 1248, value: 4.2 },
]

export const sectorData = [
    { name: 'Infrastructure', value: 34, fill: 'var(--chart-1)' },
    { name: 'ICT & Digital', value: 22, fill: 'var(--chart-2)' },
    { name: 'Healthcare', value: 14, fill: 'var(--chart-3)' },
    { name: 'Energy', value: 13, fill: 'var(--chart-4)' },
    { name: 'Defense', value: 9, fill: 'var(--chart-5)' },
    { name: 'Education', value: 8, fill: 'var(--primary)' },
]
