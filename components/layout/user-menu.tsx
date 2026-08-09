import Image from 'next/image'
import { Bell, CreditCard, LogOut, Settings, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export function UserMenu() {
    return (
        <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative rounded-full">
                <Bell aria-hidden="true" />
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-10 rounded-full px-1.5" aria-label="Open user menu">
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
                <DropdownMenuContent align="end" className="w-52">
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
