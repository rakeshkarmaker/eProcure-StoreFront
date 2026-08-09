'use client'

import { usePathname } from 'next/navigation'
import { SiteFooter } from '@/components/layout/site-footer'

export function RouteFooter() {
    const pathname = usePathname()
    const showFooter = pathname === '/' || pathname === '/browse'

    return showFooter ? <SiteFooter /> : null
}
