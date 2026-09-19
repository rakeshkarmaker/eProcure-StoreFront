import 'server-only'

import type { TenderApiRecord, TenderApiState, TenderListResponse, TenderStatsResponse } from '@/lib/tenders/types'

type ApiEnvelope<T> = {
    success: boolean
    statusCode: number
    data: T
    message?: string
}

export class TenderApiError extends Error {
    constructor(message: string, public readonly status: number) {
        super(message)
        this.name = 'TenderApiError'
    }
}

function apiBaseUrl() {
    return (process.env.TENDER_API_URL ?? 'http://127.0.0.1:3001/api/v1').replace(/\/$/, '')
}

async function apiRequest<T>(path: string): Promise<T> {
    const response = await fetch(`${apiBaseUrl()}${path}`, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
    })

    let payload: ApiEnvelope<T>
    try {
        payload = await response.json() as ApiEnvelope<T>
    } catch {
        throw new TenderApiError(`Tender API returned an invalid response (${response.status}).`, response.status)
    }
    if (!response.ok || !payload.success) {
        throw new TenderApiError(payload.message ?? `Tender API request failed with ${response.status}.`, response.status)
    }

    return payload.data
}

export async function getTenders(params: { limit?: number; offset?: number; search?: string; nature?: string; status?: string; district?: string } = {}) {
    const query = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== '') query.set(key, String(value))
    }
    return apiRequest<TenderListResponse>(`/tenders?${query.toString()}`)
}

export async function getTender(identifier: string) {
    return apiRequest<TenderApiRecord>(`/tenders/${encodeURIComponent(identifier)}`)
}

export async function getTenderStats() {
    return apiRequest<TenderStatsResponse>('/tenders/stats')
}

export async function loadTenders(params: Parameters<typeof getTenders>[0] = {}): Promise<TenderApiState<TenderListResponse>> {
    try {
        return { data: await getTenders(params), error: null }
    } catch (error) {
        return {
            data: { count: 0, total: 0, data: [] },
            error: error instanceof Error ? error.message : 'Tender service is unavailable.',
        }
    }
}

export async function loadTenderStats(): Promise<TenderApiState<TenderStatsResponse>> {
    try {
        return { data: await getTenderStats(), error: null }
    } catch (error) {
        return {
            data: { totalStored: 0, scrapedToday: 0, latestScrape: null },
            error: error instanceof Error ? error.message : 'Tender statistics are unavailable.',
        }
    }
}
