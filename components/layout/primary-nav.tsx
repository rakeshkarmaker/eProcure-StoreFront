'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { navItems } from '@/lib/navigation'

export function PrimaryNav() {
    const pathname = usePathname()
    return (
        <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                {navItems.map((item) => {
                    const active = item.label === 'Vendors'
                        ? false
                        : item.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(item.href.split('?')[0])
                    return (
                        <NavigationMenuItem key={item.label}>
                            <Link href={item.href} className={cn('rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', active && 'bg-primary/10 font-semibold text-primary')}>
                                {item.label}
                            </Link>
                        </NavigationMenuItem>
                    )
                })}
            </NavigationMenuList>
        </NavigationMenu>
    )
}
