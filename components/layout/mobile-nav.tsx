import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { navItems } from '@/lib/navigation'

export function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full md:hidden" aria-label="Open navigation"><Menu aria-hidden="true" /></Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>TenderIQ</SheetTitle>
                    <SheetDescription>Procurement intelligence navigation</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-2 px-4">
                    {navItems.map((item) => <SheetClose key={item.label} asChild><Button variant="ghost" className="justify-start" asChild><Link href={item.href}>{item.label}</Link></Button></SheetClose>)}
                </nav>
            </SheetContent>
        </Sheet>
    )
}
