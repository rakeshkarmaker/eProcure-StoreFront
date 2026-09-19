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
import type { CSSProperties } from 'react'

export type Tender = {
    id: string
    title: string
    category: string
    authority: string
    location: string
    budget: string
    days: number
    score: number
    budgetLabel?: string
    deadlineLabel?: string
    featured?: boolean
}

export const categories: { name: string; keywords: string[]; icon: LucideIcon }[] = [
    { name: 'Infrastructure & Construction', keywords: ['works', 'construction', 'infrastructure'], icon: Construction },
    { name: 'Power & Renewable Energy', keywords: ['power', 'energy', 'electric'], icon: Zap },
    { name: 'Water Supply & Sewerage', keywords: ['water', 'sewerage', 'sanitation'], icon: Droplets },
    { name: 'Roads & Highways', keywords: ['road', 'highway', 'bridge'], icon: Landmark },
    { name: 'Railways & Metro', keywords: ['railway', 'rail', 'metro'], icon: TrainFront },
    { name: 'IT & Digital Transformation', keywords: ['ict', 'software', 'computer', 'digital'], icon: Cloud },
    { name: 'Healthcare & Medicine', keywords: ['health', 'medical', 'medicine'], icon: HeartPulse },
    { name: 'Green Energy & Sustainability', keywords: ['solar', 'renewable', 'environment'], icon: Leaf },
    { name: 'Education & Research', keywords: ['education', 'school', 'university', 'research'], icon: GraduationCap },
    { name: 'Consultancy & Advisory', keywords: ['consultancy', 'consulting', 'advisory'], icon: Activity },
    { name: 'Aviation & Airports', keywords: ['aviation', 'airport', 'aircraft'], icon: Plane },
    { name: 'Defence & Security', keywords: ['defence', 'defense', 'security'], icon: ShieldCheck },
]

export const regions = [
    { name: 'Dhaka', icon: Building2, accent: 'var(--primary)' },
    { name: 'Chattogram', icon: Landmark, accent: 'var(--category)' },
    { name: 'Rajshahi', icon: Leaf, accent: 'var(--success)' },
    { name: 'Khulna', icon: Droplets, accent: 'var(--info)' },
    { name: 'Sylhet', icon: Cloud, accent: 'var(--chart-5)' },
    { name: 'Rangpur', icon: Zap, accent: 'var(--warning)' },
    { name: 'Barishal', icon: Droplets, accent: 'var(--chart-4)' },
    { name: 'Mymensingh', icon: GraduationCap, accent: 'var(--chart-3)' },
]

export type RegionStyle = CSSProperties & { '--region-accent': string }
