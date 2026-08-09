import Link from 'next/link'
import { BrandMark } from '@/components/common/brand-mark'
import { MobileNav } from '@/components/layout/mobile-nav'
import { PrimaryNav } from '@/components/layout/primary-nav'
import { UserMenu } from '@/components/layout/user-menu'

export function SiteHeader() {
    return (
        <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
            <div className="mx-auto flex h-12 max-w-4xl items-center gap-4 rounded-full border border-white/60 bg-white/90 px-3 shadow-[0_4px_24px_rgba(0,0,0,0.09)] backdrop-blur-xl">
                <MobileNav />
                <Link href="/" aria-label="TenderIQ home"><BrandMark /></Link>
                <div className="flex flex-1 justify-center"><PrimaryNav /></div>
                <UserMenu />
            </div>
        </header>
    )
}
