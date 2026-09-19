'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { BrandMark } from '@/components/common/brand-mark'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { navItems } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export function MobileNav() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const vendorView = searchParams.get('view') === 'vendors'

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="size-11 shrink-0 rounded-full motion-reduce:transition-none md:hidden" aria-label="Open navigation"><Menu aria-hidden="true" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(21rem,88vw)] motion-reduce:transition-none motion-reduce:data-open:animate-none motion-reduce:data-closed:animate-none">
                <SheetHeader className="border-b pb-5">
                    <SheetTitle><BrandMark /></SheetTitle>
                    <SheetDescription>Procurement intelligence navigation</SheetDescription>
                </SheetHeader>
                <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-4">
                    {navItems.map((item) => {
                        const active = item.label === 'Vendors'
                            ? pathname === '/browse' && vendorView
                            : item.label === 'Browse'
                                ? pathname === '/browse' && !vendorView
                                : item.href === '/'
                                    ? pathname === '/'
                                    : pathname.startsWith(item.href.split('?')[0])
                        return (
                            <SheetClose key={item.label} asChild>
                                <Button variant="ghost" className={cn('h-11 justify-start rounded-xl px-4 text-sm motion-reduce:transition-none', active && 'bg-primary/10 font-semibold text-primary hover:bg-primary/15 hover:text-primary')} asChild>
                                    <Link href={item.href} aria-current={active ? 'page' : undefined}>{item.label}</Link>
                                </Button>
                            </SheetClose>
                        )
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    )
}
