'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { navItems } from '@/lib/navigation'

export function PrimaryNav() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const vendorView = searchParams.get('view') === 'vendors'

    return (
        <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-0.5">
                {navItems.map((item) => {
                    const active = item.label === 'Vendors'
                        ? pathname === '/browse' && vendorView
                        : item.label === 'Browse'
                            ? pathname === '/browse' && !vendorView
                        : item.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(item.href.split('?')[0])
                    return (
                        <NavigationMenuItem key={item.label}>
                            <Link href={item.href} aria-current={active ? 'page' : undefined} className={cn('flex h-9 items-center rounded-full px-3 text-[13px] font-medium text-muted-foreground transition-colors motion-reduce:transition-none hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', active && 'bg-primary/10 font-semibold text-primary')}>
                                {item.label}
                            </Link>
                        </NavigationMenuItem>
                    )
                })}
            </NavigationMenuList>
        </NavigationMenu>
    )
}
