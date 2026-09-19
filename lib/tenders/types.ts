export type TenderLot = {
    lotNo: string
    identification: string
    location: string
    securityAmount: string
    tentativeStartDate: string
    tentativeCompletionDate: string
}

export type TenderAmendment = {
    no: string
    text: string
}

export type TenderApiRecord = {
    id: number
    slNo: string | null
    tenderId: string
    refNo: string | null
    status: string
    procurementNature: string | null
    title: string
    procuringEntity: string | null
    typeMethod: string | null
    publishedDate: string | null
    closingDate: string | null
    ministry: string | null
    division: string | null
    organization: string | null
    procuringEntityDistrict: string | null
    procuringEntityCode: string | null
    procurementType: string | null
    eventType: string | null
    invitationFor: string | null
    invitationRefNo: string | null
    appId: string | null
    procurementMethod: string | null
    budgetType: string | null
    sourceOfFunds: string | null
    projectCode: string | null
    projectName: string | null
    packageNoDesc: string | null
    category: string | null
    docLastSellingDate: string | null
    preMeetingStartDate: string | null
    preMeetingEndDate: string | null
    openingDate: string | null
    lastSecuritySubmissionDate: string | null
    eligibility: string | null
    briefDescription: string | null
    evaluationType: string | null
    docAvailable: string | null
    docFees: string | null
    docPriceInBDT: string | null
    modeOfPayment: string | null
    securityValidUpTo: string | null
    tenderValidUpTo: string | null
    lots: TenderLot[] | null
    officialName: string | null
    officialDesignation: string | null
    officialAddress: string | null
    officialContact: string | null
    amendments: TenderAmendment[] | null
    rawData: unknown
    scrapedAt: string
}

export type TenderListResponse = {
    count: number
    total: number
    data: TenderApiRecord[]
}

export type TenderStatsResponse = {
    totalStored: number
    scrapedToday: number
    latestScrape: string | null
}

export type TenderApiState<T> = {
    data: T
    error: string | null
}
