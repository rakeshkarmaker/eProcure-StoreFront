import Image from 'next/image'
import { Bell, CreditCard, LogOut, Settings, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export function UserMenu() {
    return (
        <div className="flex items-center gap-1">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Open notifications" className="relative size-11 shrink-0 rounded-full motion-reduce:transition-none">
                        <Bell aria-hidden="true" />
                        <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary ring-2 ring-card" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 motion-reduce:data-open:animate-none motion-reduce:data-closed:animate-none">
                    <DropdownMenuLabel className="flex items-center justify-between"><span>Notifications</span><span className="text-xs font-normal text-primary">2 new</span></DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="items-start gap-3 py-3">
                            <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                            <span><span className="block font-medium">New tender matches</span><span className="mt-0.5 block text-xs text-muted-foreground">4 opportunities match your saved sectors.</span></span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="items-start gap-3 py-3">
                            <span className="mt-1 size-2 shrink-0 rounded-full bg-primary" />
                            <span><span className="block font-medium">Deadline reminder</span><span className="mt-0.5 block text-xs text-muted-foreground">A watched tender closes within 48 hours.</span></span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-11 shrink-0 rounded-full px-1.5 motion-reduce:transition-none" aria-label="Open user menu">
                        <Avatar className="size-7">
                            <AvatarImage asChild><Image src="/tenderiq/rahman-ali.png" width={28} height={28} alt="Rahman Ali" /></AvatarImage>
                            <AvatarFallback>RA</AvatarFallback>
                        </Avatar>
                        <span className="hidden text-left leading-tight sm:block">
                            <span className="block text-xs font-semibold">Rahman Ali</span>
                            <span className="block text-[10px] font-semibold uppercase tracking-wide text-primary">Premium Vendor</span>
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 motion-reduce:data-open:animate-none motion-reduce:data-closed:animate-none">
                    <DropdownMenuLabel>My account</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem><User />Profile</DropdownMenuItem>
                        <DropdownMenuItem><CreditCard />Billing</DropdownMenuItem>
                        <DropdownMenuItem><Settings />Settings</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup><DropdownMenuItem><LogOut />Sign out</DropdownMenuItem></DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
