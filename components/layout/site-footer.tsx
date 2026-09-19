import Link from 'next/link'
import { BrandMark } from '@/components/common/brand-mark'
import { Separator } from '@/components/ui/separator'

const groups = [
    { title: 'Platform', links: ['Browse Tenders', 'Sector Explorer', 'AI Matching', 'Vendors'] },
    { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press'] },
    { title: 'Support', links: ['Documentation', 'Help Center', 'Contact', 'Status'] },
]

export function SiteFooter() {
    return (
        <footer className="mt-auto border-t bg-card">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
                <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
                    <BrandMark />
                    <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">Intelligence for global procurement. Helping vendors discover and win government contracts.</p>
                </div>
                {groups.map((group) => (
                    <div key={group.title}>
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{group.title}</h3>
                        <nav className="flex flex-col gap-2">
                            {group.links.map((label) => <Link key={label} href="/browse" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{label}</Link>)}
                        </nav>
                    </div>
                ))}
            </div>
            <Separator />
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <span>© 2024 TenderIQ. Intelligence for Global Procurement.</span>
                <div className="flex gap-4"><Link href="#">Privacy</Link><Link href="#">Terms</Link><Link href="#">Support</Link></div>
            </div>
        </footer>
    )
}
