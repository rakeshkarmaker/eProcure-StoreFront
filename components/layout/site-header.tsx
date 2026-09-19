import Link from 'next/link'
import { Suspense } from 'react'
import { BrandMark } from '@/components/common/brand-mark'
import { MobileNav } from '@/components/layout/mobile-nav'
import { PrimaryNav } from '@/components/layout/primary-nav'
import { UserMenu } from '@/components/layout/user-menu'

export function SiteHeader() {
    return (
        <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
            <nav aria-label="Primary navigation" className="pointer-events-auto isolate mx-auto flex h-12 max-w-[58rem] items-center gap-2 rounded-full bg-card/95 px-2.5 text-card-foreground shadow-nav ring-1 ring-foreground/10 backdrop-blur-xl sm:gap-4 sm:px-3">
                <Suspense fallback={<span className="size-10 shrink-0 md:hidden" aria-hidden="true" />}><MobileNav /></Suspense>
                <Link href="/" aria-label="TenderIQ home" className="flex h-11 shrink-0 items-center rounded-full px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><BrandMark /></Link>
                <div className="flex flex-1 justify-center"><Suspense fallback={<span className="hidden h-9 w-72 md:block" aria-hidden="true" />}><PrimaryNav /></Suspense></div>
                <UserMenu />
            </nav>
        </header>
    )
}
